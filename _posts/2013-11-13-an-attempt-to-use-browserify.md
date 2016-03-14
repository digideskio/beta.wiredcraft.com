---
title: An Attempt To Use Browserify
author: xufeng
tags:
  - javascript
  - jquery
hn: 6724641
redirect_from:
  - /posts/2013/11/13/an-attempt-to-use-browserify.html
---

As a front-end developer I began using jQuery early on. I wasn't ready to jump on the JavaScript train but jQuery makes it easy for beginners to get started. After cutting my teeth on a few languages, libraries, and frameworks, and with awesome browser advances in the last few years, I grew to feel that:

<!--more-->

* jQuery can be a bit bloated when compared to other libraries.
* Efficient libraries or API's should do most of the work: capturing webcam streams, creating a cat GIF, allowing users to download and share content, etc. I'm not going to reinvent the wheel.
* The DOM is a much more friendly place than it used to be.

Keeping these thoughts in mind, and coupled with fact that I'm writing more and more Node.js lately, I decided to build a lightweight GIF generator: [Gifme](http://xvfeng.me/gifme/). I used this as an exercise to learn a few new libraries and API endpoints in a fun way. I had also been itching to try out a certain packet manager: [Browserify](http://browserify.org/).

## Browserify is magical.

At Wiredcraft we're always looking for the best libraries for every level of our stack. We've been using [npm](https://npmjs.org/) for our web servers and were interested in experimenting with Browserify after reading Kyle Robinson Young's post: [Using npm on the client side](http://dontkry.com/posts/code/using-npm-on-the-client-side.html).

Long story short, you can use core node-modules on the client-side. This makes it easy to use and re-use modules created by you or the community. Using `require('modules')` in the browser brings npm from the back-end to the front-end - awesomeness at every level! The magic? Where's the magic? A good chunk of the npm modules will work out of the box or with a wrapper within your browser. Allowing the app to run without using a back-end has a few perks such as no back-end configuration or a decrease in your hosting bill.

## Embrace lazy. Leverage APIs.

Browser-side innovation has rapidly increased in the last few years. I was especially interested in using the user's media device through [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia) and files through the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File). By using the Image Upload end point of Imgur we let third-party libraries handle the heavy lifting. Although the browser API isn't perfect, it's there and waiting for you to play with it.

## Living in the front-end? I love it!

I can now grab the user's webcam stream, generate a GIF, and let the user download or share it on an image hosting platform. And all of this is done in the front-end using a lightweight interface!

<p align='center'><img src='http://i.imgur.com/HEIRlTU.gif' alt='Gifme'/></p>

My last task was to use my nonexistent design skills to develop the user interface. After a quick tour on [Github trending](https://github.com/trending) I found once again what I needed from the community: [slidr.js](https://github.com/bchanx/slidr). Voila! A simple app with no back-end of any kind.

Bringing this back to jQuery I found that the native DOM API is good enough for these kinds of applications (check out  Substack's take: [Weaning yourself off jQuery](http://substack.net/weaning_yourself_off_jquery). Furthermore, the full Gifme app is around 110kb. Since Gifme includes libraries to make the GIF (which are fairly large) using jQuery would have created a much bigger app.

If you want to hack on it, just head to the [Github repository](https://github.com/fraserxu/gifme/).
