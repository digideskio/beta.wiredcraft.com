---
published: false
title: A Few Best Practices For Building Static Clients
author: frank
tags:
  - process
  - best practices
  - UI
redirect_from:
  - /posts/2013/09/25/best-practices-for-building-static-clients.html
---

The teams at Wiredcraft and [devo.ps](http://devo.ps) shifted to building static clients and APIs in the backend a while back. [We wrote about it](http://devo.ps/blog/2013/01/31/farewell-to-regular-web-development-approaches.html) and are excited about the potential we see in this approach; it is nothing novel but became a more common strategy for Web apps with the rise of front-end frameworks such as Backbone.js, Ember.js or AngularJS.

<!--more-->

Things in this space move extremely fast, making it difficult to find up-to-date best practices. It took us a painful amount of time to find out what works and what doesn't, we thought we'd share some of the tools we rely on to get the job done. Most of this is captured in [feathers](https://github.com/Wiredcraft/feathers), a boilerplate for building AngularJS front-end applications that we'll release in a few weeks.

## AngularJS

While we initially settled for Backbone.js + Marrionette.js, we moved over most of our products to AngularJS.

Backbone is built on top of jQuery and underscore.js, provider us with model collection, routers and other basic tools which make build web application much easier.

And Marrionetter.js, its good atview management, it makes code organisation looks more nature and easy to understand.

But when app getting large, it become a nightmare to maintain and develop.

### Why it is better
* easy to get started than backbone
* speed up development process when you get familar with it
* enjoy two way databinding, directives, filters, factory etc..
* a freamework rather than serval components
* way much less code, easy for reading and writing

### How and where we use it

Basically there are two main choices when you want to start build an angularjs application. [Angular-seed](https://github.com/angular/angular-seed) and [ngBoilerplate](https://github.com/ngbp/ng-boilerplate).

Also we recommend [egghead.io](http://egghead.io) and [ng-newsletter](http://ng-newsletter.com) to get yourself familar with the concept of angularjs such as directives, factories, controllers etc, and also improve your understanding of angularjs.



## Compass

We had acutally been LESS users for a while it was simple, and addressed some of the main issues we had with CSS (mainly that you can't use variables).

WHY IT IS BETTER
HOW/WHERE YOU USE IT

While we initiatlly used LESS,

## Grunt

As your front-end app grows in complexity, you'll find yoursefl dealing with an increasing number of tasks to deal with to build your product:

Grunt come to rescue
`Grunt build` and have a cup of coffee

- Code minification & compressions.
- Compilation of templates and scripting languages (Sass, LESS).
- Sprites
- Tests
- Livereload
- ...

### WHY IT IS BETTER
We use to be huge `Makefile` fans but switched pretty quickly to [Grunt](http://gruntjs.com). Most of our apps now rely on a pretty exhaustive `Gruntfile` that takes care of most of things,

* We want to solve problems with one language, and javascript is always the best choice
* Larger amount of task modules from official contrbute, third parties, and also your own customize modules
* Less dependencies, only depends on nodejs


### HOW/WHERE WE USE IT
You can follow the official [get-started-guide](http://gruntjs.com/getting-started) or read below if you are just too lazy like me:

1. Install grunt-cli

   ```
     npm install -g grunt-cli
    ```

2. Search task modules that meet your needs from [plugin site](http://gruntjs.com/plugins) and [npm](http://npmjs.org);
3. add to package.json;
4. npm install and load the task into your `Gruntfile.js`;

  ```
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-jshint');
  ```
5. Run with `grunt` or whatever task with fancy names

One more thing: in our real project, task number begin to grow and we have a 1000 lines of `gruntfile`, w00t? 1000 line of config file? No!!!!!

Ok. Let's seperate it into different moduels:

```
module.exports = function(grunt) {
    var config = require('./build.config.js');

    // Tasks configuration
    grunt.initConfig(grunt.util._.extend(require('./grunt/config')(grunt), config));

    // Load the npm tasks
    grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

    // Load our custom tasks
    grunt.loadTasks('./grunt/tasks');
}

```

And the structure now looks like this:

````

  |-- Gruntfile.js
  |-- README.md
  |-- bower.json
  |-- build.config.js
  |-- compass.config.rb
  |-- grunt
  |   |-- config
  |   |-- tasks
  |-- karma
  |   |-- karma-unit.tpl.js
  |-- node_modules
  |   |-- bower
  |   |-- grunt
  |   |-- grunt-contrib-clean
  |   |-- package.json
  |-- src
  |   |-- README.md
  |   |-- app
  |   |-- assets
  |   |-- common
  |   |-- index.html
  `-- vendor
      |-- angular


````




## Bower and npm

Separation of concerns (Bower + npm + component...) I just want start ot write my code and I do not want to fecth libraries manually. And below is what we think thoes package management tools can bring us:

* time saver
* easy to search [http://npmjs.org/](http://npmjs.org/)  [http://sindresorhus.com/bower-components/](http://sindresorhus.com/bower-components/)
* tons of available libraries and modules
* bower - front end
* npm - back end or whatever,  nodejs community is awesome because of npm
* create and manage modules, open source, share and learn...

There's no much need for us to tell you how to use npm or bower, but a hint may also help: add an additional `.bowerrc` file to specify the location of modules you'd like to place:

```
{
  "directory": "vendor",
  "json": "bower.json"
}
```

## Testing

Every developer here at Wiredcraft know things about back-end, and we usually don't code without write tests, So we know the importance of test.

Fortunately, the angular team is also a super fun of testing. Karma it's the best example compare to other mvc frameworks, and this is also one big reason for us to choose angularjs.

For testing angularjs application, truth be told, we're just get started it, we can not share to much experience with you, but we do recommend this [http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html
], it does a great job by explaining what is unit test, middle way test and end to end test, if you want to write better code, you must read it!!!!

## Conclusion


Here we'd thank
[joshdmiller](https://github.com/joshdmiller) for his awesome [ngBoilerplate](https://github.com/joshdmiller/ng-boilerplate), it inspired us a lot.
