---
title: Hybrid Mobile Apps Suck A Lot Less
author: xeodou
tags:
  - mobile
  - Cordova
  - Ionic
  - Gulp.js
  - hybrid
  - iOS
redirect_from:
  - /posts/2014/08/27/hybrid-mobile-apps-suck-a-lot-less.html
preview: /images/posts/ionic.png
---

<p align='center'><img alt='Xcode vs Ionic' src='http://wiredcraft.com/images/posts/ionic.png'/></p>

We recently worked on a ride sharing mobile app with an interesting twist (more on that when it is released). Deadlines were tight and, while we know our way around Objective-C, we weren't sure we could deliver a first working iOS  prototype in time.

<!--more-->

A few years back, our team built an internal mobile application for the UN using Backbone.js and Phonegap, and the experience had been less than ideal: debugging was a pain, optimization was excruciatingly hard and the overall UX was way worse than native.

Nonetheless, we decided to re-evaluate hybrid apps; we have a fair amount of JS developers on the team and using this approach, we could whip out a simple app fairly quickly.

## The tools

We wanted to use [AngularJS](http://angularjs.org) as it is, [with React](https://wiredcraft.com/blog/why-we-may-ditch-angularjs-for-react/), our JS framework of choice for front-end apps. Here's what we effectively used:

- [Ionic](http://ionicframework.com/); a front-end framework combined with AngularJS and Cordova. I highly recommend you check out. It offers way more than eye candy.
- [Ng-cordova](http://ngcordova.com/): will help you build and deploy your apps, it provides some AngularJS extensions on top of the Cordova API.
- [Crashlytics](http://try.crashlytics.com/): for beta releases (the App Store approval process takes a while) and bug reporting solution.
- [Gulp.js](http://gulpjs.com/) and the [Ionic CLI](https://github.com/driftyco/ionic-cli) to automate most of our builds.
- The [Chrome Dev Tool](https://developer.chrome.com/devtools) is awesome enough to cover most of needs for debugging and optimization.
- We wrote in Coffeescript and used Jade and SASS for generating the HTML and CSS.

## Our experience

- **The bad**:
    - You still need to do a lot testing on actual devices, don't expect things to always work out-of-the-box,
    - You still need some knowledge of Objective-C and Xcode, particularly when dealing with dependencies and performance issues.
    - Some things are still pretty buggy; dealing with keyboards for example is pretty wacky.
    - Some UI components like maps may require a good deal of performance tuning.
- **The good**:
    - You can use anything you would developing a Web app, including testing in the browser. The tool-belt required
    - Using native plugins is as easy a querying a Web API.
    - Ionic has a great community.
    - You can move extremely fast, the time to prototype was radically shorter

## When to go hybrid

Given more resources and time, we would likely still go for native; there's a limit to the level of polish you can reach with a hybrid app. With that being said, if you check on enough of the following points, I'd consider give the Cordova + AngularJS + Ionic setup a go:

- You want to get a prototype out fast,
- Your app relies a lot on connectivity (use of online APIs),
- You have no heavy duty processing to do in-app,
- You don't have overly dynamic views,
- Access call hardware api,
- You're not that familiar with Objective-C/Xcode or Android/Java.
