---
title: Why We Advise Against Most Starter and Base Themes
author: ronan
tags:
  - Drupal
  - Drupal planet
  - Design
redirect_from:
  - /posts/2011/06/24/why-we-advise-against-most-starter-and-base-themes.html
---

I recently gave [a presentation about performance and scalability](http://www.slideshare.net/hunvreus/performance-and-scalability-with-drupal) at one of our local Drupal meetups here in Shanghai, an got confronted with questions on Drupal theming and more particularly the type of starter theme we use here at Wiredcraft. Well, the answer is quite simple; basically, we don't, at least not the major ones. No [Zen](http://drupal.org/project), [Omega](http://drupal.org/project/omega) or [Fusion](http://drupal.org/project/fusion), no custom base theme either or CSS framework such as [960 Grid](http://960.gs). What we do systematically use though is [Tao](http://drupal.org/project/tao); let me explain...

<!--more-->

## Why don't we use starter themes?

I believe that starter themes can be interesting in a couple cases;

1. It can **help beginners get started** with Drupal theming by setting up a lot of defaults for a somewhat overwhelming number of elements you need to get familiar with.
1. It can **provide administrators with a quick way of adjusting layouts**; combining [Panels](http://drupal.org/project/panels) and the 960 Grid (using the [NineSixty](http://drupal.org/project/ninesixty) theme) can be an interesting approach, allowing for easily adjusting the layout by simply assigning classes to panes. However, while they may prove useful through the designing and prototyping phases, grid frameworks create semantic issues and can be very rigid to deal with. Moreover we never, ever use Panels; we're [Context](http://drupal.org/project/context) guys and have been from the very beginning.

The problem is, we think that for experienced Drupal developers there are quite a few drawbacks to these starter/base themes;

1. They tend to **slow down developments** by adding another layer of complexity; additional APIs, functions, "hooks"... I can't remember the number of times I struggled with a very straightforward preprocess or theme override in a theme because Zen was adding some "helper" functions around things.
1. They often **introduce bugs or incompatibility with some other modules** (Zen with Context for example) as well as **performance concerns**. All that sugar-coating has an overhead that can be **very** costly; we quite regularly do performance audits of Drupal sites and haven often advised for a complete rewrite of the theme.
1. Our opinion is that more often that not **they lead to poor practices** (or at least enable them), the biggest one being the proliferation of template files and CSS spreadsheets, instead of relying on preprocessing and properly thought through layout and styles. How many times have you open a custom theme folder to find an insane amount of `views-view--XXX-block.tpl` files?

## We're suckers for Tao!

We have been using [Tao](http://drupal.org/project/tao) as a base theme since the end of 2009. I am unsure as to why, but many people either don't really acknowledge its existence as a full blown base theme, or don't really understand what it does. Maybe this has to do with it having been hosted on Github in its infancy, or the fact that it was mainly built as a dependency of [Rubik](http://drupal.org/project/rubik) (an admin theme that we've shipped with all our sites since its first release, give it a go...).

What Tao does really, is dealing with the bulk of the issues anybody has with Drupal theming. Let me paraphrase the [project page](http://drupal.org/project/tao) here to list what it does (well);

* Resets browser and Drupal core default styles (die admin.css),
* Unifies the template family into a consistent format (node.tpl.php, block.tpl.php...)
* Various other small fixes and bonuses, such as a proper print stylesheet or theme overrides for fieldset and pagers.

In brief, it gives you a solid, clean foundation both in terms of CSS and HTML to build a theme upon.; if you stick to it and leverage the power of preprocessing functions, you should be able to build leaner and more robust Drupal themes. We strongly advise anybody doing Drupal theming to give it a try; we've already converted quite a few clients and partners to it.

## But...

This approach has been really rewarding for us in the past couple years, the only thing is that it does require you apply the same type of concepts to your design approach; we believe that building lean, simple, information oriented interfaces is the way to go, and if you do so, your graphical concepts should translate properly with a Tao based approach. But that's a whole other discussion.
