---
published: true
title: "PDF Generation On The Web"
author: xufeng
tags:
  - Myanmar
  - PDF
excerpt: "Our project to build a PDF generator explained step-by-step and based on Golang, the different technologies we used, the challenges to face in details."
preview: https://wiredcraft.com/images/posts/electron-pdf.gif
---

As the Wiredcraft team has been working on the Myanmar voter registration system for several months, we've spoken about our work with the [Township Voter Registration](https://wiredcraft.com/blog/myanmar-township-voter-registration-pilot/) and the ["Check My Name"](https://wiredcraft.com/blog/myanmar-election-open-api/) tools on [our blog](https://wiredcraft.com/blog/). For part of the system, we wanted a native Windows application that could work offline, in the Myanmar language, and generate a PDF from a list of voters.

<!-- more -->

## Challenges for the Project:
- Native application needs to run on Windows
- Client needs to run offline due to limited Internet connection in Myanmar
- Needs to generate a single PDF of 1000 pages with web technology
- PDF text should be in Myanmar language (and there is not much font support for the Myanmar language)

## Our Stack:
- Electron to build and pack the application for Windows
- A Golang CLI to interact with an encrypted SQLite database
- React to build the user interface
- Flux + Immutable.js to deal with front-end data flow

## The workflow
Data + Template => Rendered HTML => PDF

## Prepare the data

    {
      "id": 1,
      "voter_name": "ဒေါ်ကြည်စိန်",
      "gender": "မ",
      "dob": "1989-04-17",
      "father_name": "ဦးအုန်းဇော်",
      "mother_name": "ဒေါ်စန်းရီ",
      "address": "ခုံကြီးကျေးရွာ"
    }

A simple `reader.js` function to read the data. In production this could be a RESTful API or anything similar.

    var fs = require('fs');
    module.exports = function(path, cb) {
      fs.readFile(path, function(err, data) {
        if (err)
          return cb(err)
        else
          try {
            cb(null, JSON.parse(data.toString()))
          } catch (e) {
            cb(e)
          }
      })
    }

## Prepare the template
 `render.js` to take in the template path and formatted data.

    var Handlebars = require('handlebars')var fs = require('fs')
    module.exports = function(tplPath, data, cb) {

      // registe a each helper
      Handlebars.registerHelper('each', function(context, options) {
        var ret = ""
        for(var i=0, j=context.length; i<j; i++) {
          ret = ret + options.fn(context[i])
        }
        return ret
      })

      fs.readFile(tplPath, function(err, tpl) {
        if (err)
          cb(err)
        else
          var template = Handlebars.compile(tpl.toString())
          var rendered = template({pages: data})

          cb(null, rendered)
      })
    }

With the `render.js` we now have a HTML file with the rendered data.

## The code to generate PDF

Now that you have a rendered HTML, the next step is to generate a PDF.

You have a few options for PDF generation:

- [PhantomJS](http://phantomjs.org/): a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.
- [jsPDF](http://parall.ax/products/jspdf): An HTML5 client-side solution for generating PDFs. Perfect for event tickets, reports, certificates, you name it!
- [wkhtmltopdf](http://wkhtmltopdf.org/): wkhtmltopdf and wkhtmltoimage are open source (LGPLv3) command line tools to render HTML into PDF and various image formats using the QT Webkit rendering engine.
- [Pandoc](http://pandoc.org/): If you need to convert files from one markup format into another, pandoc is your swiss-army knife.

We didn't have a server running somewhere in our stack, but luckily we had node.js/io.js in Electron. All the tools above have a command interface that we could start a `child_process` to run it, and send back the progress with a callback function.

## PhantomJS

The first thing we tried is `PhantomJS` together with a [rasterize.js](https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js), which rasterizes a web page to an image or a PDF:


    /**
     * generatePDF function
     * @param  {String}   the path of the template
     * @param  {String}   the PDF file destination
     * @param  {Function} A callback function when job is done
     */
    function generatePDF(tplPath dist, cb) {
      var childArgs = [ './rasterize.js', tplPath, dist, 'A4', 1.00];

      childProcess.execFile(phantomBinPath, childArgs, function(err, stdout, stderr) {
        if (err) alert('generate pdf err', err);
        cb(null);
      });
    }


This approach worked fine for us except:

- The `PhantomJS` binary file was about 30MB on Mac or Windows, which was a little heavy for our project.
- It worked fine for English, but not for the Myanmar language. We tried many Myanmar fonts, but none of them worked well on Windows.
- It worked on Mac, but the file generated was 988 MB in total for 1000 pages and the PDF text was not selectable.
- The PDF text generated on Windows was 60 MB for 1000 pages and text was selectable, which was one reason why the file size was smaller than the one generated on Mac (using rasterize.js)

Note that in order to fix the font issue, we tried to convert the font file into a base64 string and SVG, but these didn't work on Windows. :(

## wkhtmltopdf

Since we could not resolve the font issue on Windows, we dropped `PhantomJS`. So next, we tried `wkhtmltopdf`.

`Wkhtmltopdf` provides a simple CLI interface that we could simply call


    $ wkhtmltopdf voters.html voters.pdf


in a `child_process` the same way we did with `PhantomJS`.

But the font was still broken, and did not even work on Mac.

## Pandoc

"If you need to convert files from one markup format into another, pandoc is your swiss-army knife. Pandoc can convert documents in markdown, reStructuredText, textile, HTML, DocBook, LaTeX, MediaWiki markup, TWiki markup, OPML, Emacs Org-Mode, Txt2Tags, Microsoft Word docx, EPUB, or Haddock markup to..." - [http://pandoc.org/](http://pandoc.org/)

This means you can use it to convert files between almost any kind of text-based file, but we didn't get to try it out before we decided we weren't going to use it.

"If you want to create a PDF, you’ll need to have LaTeX installed. (See [MacTeX](http://tug.org/mactex/) on OS X, [MiKTeX](http://miktex.org/) on Windows, or install the texlive package in linux.) Then do..."

    $ pandoc test1.md -s -o test1.pdf

The [MikTex Windows 32-bit](http://miktex.org/download) is already 163.18 MB, not including Pandoc itself.

I believe there are many uses for Pandoc, like professional publications, or a server centric system, but not here for our application. 200 MB is too heavy just to generate PDFs.

## `printToPDF` from Electron

**The browser is the best (not just one of the best) tool to render HTML**

While trying the approaches above, we already knew that Chrome could print and generate PDFs from within its browser.

The `window.print()` method opens the Print Dialog to print the current document.

If you call this function from the browser console, you will see the following dialog:

![image of dialogue](https://wiredcraft.com/images/posts/dialogue-box.png)

This could actually generate a PDF with the right font, but there are also several limitations:
- UX issue: There is no way to generate the PDF directly; the user has to click several buttons to get what they want
- The `window.print()` method can only print the current document, but we are inside an Electron rendered window instance, not a PDF HTML window

The first thing we tried for this approach is the `window.open()` method to open another window and inject a script to print the opened document, once it loaded.

    <script>
      function ready(fn) {
        if (document.readyState != 'loading'){
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }

      ready(function() {
        window.print();
      })
    </script>

This could solve the second problem, but the UX is even worse. We have to open two unnecessary windows just to generate a PDF. The UX is totally unacceptable. Plus, the user may want to generate several PDFs at the same time, which means that it would automatically open many windows.

Is there a way we can skip all of the windows?

Yes! The [printToPDF](https://github.com/atom/electron/blob/master/docs/api/browser-window.md#webcontentsprinttopdfoptions-callback) method comes to the rescue.

"Prints windows' web page as PDF with Chromium's preview printing custom settings." - [http://electron.atom.io/docs/v0.32.0/api/web-contents/](http://electron.atom.io/docs/v0.32.0/api/web-contents/)

Below is the sample code:

    var BrowserWindow = require('browser-window');
    var fs = require('fs');

    var win = new BrowserWindow({width: 800, height: 600});
    win.loadUrl("./voters.html");

    win.webContents.on("did-finish-load", function() {
      // Use default printing options
      win.webContents.printToPDF({}, function(error, data) {
        if (error) throw error;
        fs.writeFile(dist, data, function(error) {
          if (err)
            alert('write pdf file error', error);
        })
      })
    });

The code here just opens a new `BrowserWindow` in the background, then renders the template. Once the content is fully loaded, it prints the content to a PDF, and finally, we can write it to the local file system.

## Introducing [electron-pdf](https://github.com/fraserxu/electron-pdf)

To make the whole workflow effortless, I've written a simple CLI tool with node.js named ```electron-pdf```.

To use it, you just need to run ```npm i -g electron-pdf electron```, and if everything goes well, you can start to use it by calling

    $ electron-pdf ~/Desktop/fraserxu.html ~/Desktop/fraserxu.pdf


Below is a screenshot of how it works:

![Electron PDF](https://wiredcraft.com/images/posts/electron-pdf.gif)

For more information and usage, please check the GitHub repo here [electron-pdf](https://github.com/fraserxu/electron-pdf) and fire any issue you might have; pull request is more than welcome!

Originally posted on [fraserxu.me](https://fraserxu.me/2015/08/20/pdf-generation-on-the-web/)

Follow Fraser on [GitHub](https://github.com/fraserxu/).
