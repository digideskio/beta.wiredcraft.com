---
published: true
title: "How We Did Magic Only Using Javascript for Translation"
author: wayne
tags:
  - electron
  - javascript
preview: https://wiredcraft.com/images/posts/magic-javascript-translation.png
---

![Using JavaScript for Translation](https://wiredcraft.com/images/posts/magic-javascript-translation.png)

Translation isn't too common in web development projects. And especially as a front-end developer, I don't have much experience dealing with translation, as it's typically handled by the backend. However, in Wiredcraft's most recent project, building the voter registration system for the Myammar general election, we abandoned Django's translation strategy and did translation in two different and new ways, utilizing the front-end!

<!-- more -->

Before I start to show you the magic, you should know the general meaning of the following technologies:

- **PO file:** The file used to store your translations
- **Makefile:** A traditional tool to control your workflow - we use it to replace Gulp and Grunt
- **msgmerge:** A Linux command to merge PO files (you'll need to install gettext first if you're using a Mac)

## Show Time

### Magic one: All in JS environment

- Situation: Electron + React.js
- Tools: [node-gettext](https://github.com/andris9/node-gettext) + [jsxgettext](https://github.com/zaach/jsxgettext)

Since there wasn't a recommended way to do translation for our project, we had to assemble every useful element to work our magic in the Myanmar language translation. In this project, we needed to build a Windows desktop app for our client, [Myanmar's UEC (Union Election Commission)](https://www.google.com.hk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CBwQFjAAahUKEwjc48Sh1ZbJAhVW9WMKHTmMBP0&url=%68%74%74%70%3a%2f%2f%75%65%63%6d%79%61%6e%6d%61%72%2e%6f%72%67%2f&usg=AFQjCNGscUMi_qUXqVCujPFmL-Ogo8bWMQ). Since we were experienced in web technologies and JavaScript (and built our system with JavaScript), Electron was the best choice for our framework. Electron is based on Node.js and webkit, so we received full support from Node.js when dealing with the translation.

The translation workflow can be generalized in the following steps:

1. Grab every word that you want to translate from JS or HTML, then insert into the PO file.
2. Merge new PO file into the old PO file to generate a completed PO file.
3. Read PO file to get translation result when running the app.

### Let's cover the process step by step.

First, it's easy to compile a list of words by using [jsxgettext](https://github.com/zaach/jsxgettext) to select the words to be translated; the code reads every word inside the `gettext()`.  For example, just put the words you need translated inside the function like this:`React: <p>{GT.gettext('Language')}</p>`. [jsxgettext](https://github.com/zaach/jsxgettext) only detects string 'gettext', so there is no difference between using gettext() or GT.gettext( ). We used GT.gettext( ) here because we defined GT as an instance of node-gettext; GT has the method named gettext which will translate words inside the ( ) according to the translation file.

Next, we needed to compile all of this into our PO file. Here is our **Makefile:**

```
NODE_BIN = node_modules/.bin
genPo:
/* Grabbing the words that needed to be translated into po file */
$(NODE_BIN)/jsxgettext -j ./stc/js/index.js > ./locale/cn.new.po

/* Integrate new generated po file with the old one */
msgmerge ./locale/cn.po ./locale/cn.new.po -o ./locale/cn.po
```

Finally, we needed a way to read our PO file so that the translation could be implemented in the application. Thanks to node-gettext, we could read the PO file and give the according translation based on our settings, so in our root **JS file** was:

```
var Gettext = require('node-gettext')
GT = new Gettext()
GT.addTextdomain('cn', fs.readFileSync(path.join(static_dir, 'locale/cn.po')))
/* Initially set the language to cn */
GT.textdomain('cn')
If you want to change the language, you just need to set:
GT.textdomain('en')
```

That's it.

### Magic two: Back-end gives front-end limited help

- Situation: Loopback + React + Redux
- Tools: [jed](https://github.com/SlexAxton/Jed) + [po2json](https://github.com/mikeedwards/po2json) + [jsxgettext](https://github.com/zaach/jsxgettext)

In another small project for the Myanmar general election, we needed to build a web app for our client; this time we decided to start using Loopback, which is based on Express but with an emphasized focus on models.

By using the web app, you can no longer get help from node-gettext because you'd need to do translation in a browser environment. The work flow is the same as the previously stated; the only difference is how you read the PO file and transmit the translated content to the front-end. That's why we used [jed](https://github.com/SlexAxton/Jed), a modern way to replace Gettext, and [po2json](https://github.com/mikeedwards/po2json), which translates the PO file into json, here.

First, we need to convert the PO file into a json file and give an API to front-end to read; we did all this in the back-end with **router.js:**

```
var path = require('path')
var po2json = require('po2json')
router.get('/translation', function (req, res) {
    po2json.parseFile(path.resolve(__dirname, './locale/cn.po'), { format: 'jed1.x' }, function (err, jedData) {
      if (err) throw err
      res.json({jedData: jedData})
    })
})
```

Then the front-end loads the translation when mounting up the application with **index.js:**

```
require request from 'superagent'
require('superagent-as-promised')(request)
componentDidMount () {
  request
    .get('/translation')
    .then(res => {
    /* Jed have method gettext() for translation */
    var i18n_my = new Jed(res.body.jedData)
    /**
     * Build method gettext()
     * so that you can still use <p>{gettext('Language')}</p>.
     * Here I stored 'locale' value in sessionStorage.
     */
    window.gettext = (word) => {
      if (sessionStorage.get('locale') && sessionStorage.get('locale') === 'cn') {
        return i18n_my.gettext(word)
      } else {
        return word
      }
    }
  })
    .catch(err => errorHandle(err))
}
```

The Makefile is the same as the 'Electron + React.js' situation, so don't forget to execute `make genPo` before you push your code, so that you can always have the latest PO file.

## Take a bow

What I took away from my experimentation is that dealing with translation is not as difficult as I had expected. My biggest takeaway from working on the translation is that no matter what tools you use or in which environment (e.g. browser & Node.js), you should always keep the translation's work flow in mind. If you do this, you will prevent many problems. Keep it simple and you'll be able to quickly handle almost any situation that arises.
