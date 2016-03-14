---
title: Drush make and install profiles with Drupal 7
author: makara
tags:
  - Drupal
  - Drupal planet
  - Best practice
  - Tools
redirect_from:
  - /posts/2011/06/16/drush-make-and-install-profiles-drupal-7.html
preview: /images/posts/drupal-package.png
---

<p align='center'><img alt='Packaging Drupal' src='http://wiredcraft.com/images/posts/drupal-package.png'/></p>

Install profiles are core to our development process; everything from the data structure down to the smallest module settings are captured in code, using [Features](http://drupal.org/project/features), [Context](http://drupal.org/project/context) and [Strongarm](http://drupal.org/project/strongarm) and packaging everything using our beloved [Drush make](http://drupal.org/project/drush_make) and install profiles. This approach has significantly helped us improve the quality and speed of our developments.

<!--more-->

## Why do we bet on that approach?

Relying on Drush make and install profiles is mainly a matter of best practice, ensuring we keep a clean separation between structure and data; at any point we can rebuild a fully functional site by simply using the installer. We usually build a separate importer (when needed) for data, most of the time using the awesome [Feeds module](http://drupal.org/project/feeds) (more about this in a future post).

Install profile support has been greatly improved in Drupal 7; not everything is as easy when using Drupal 6. However, the awesome [Profiler](http://drupal.org/project/profiler) module make that simpler, and with a bit of work, you should be able to reach a solid result.

## Building our Drush make file

There are a few advantages to using Drush make;

* You can make sure you **keep track of what goes in the build**; every single component of the site is clearly stated with a version number.
* It allows us to **retrieve resources beyond the regular Drupal.org modules**; you can for example specify modules from Github, require external libraries and apply patches. That last one is especially useful when you build large scale or cutting edge websites that may need some patches that haven't made their way into a release yet, and gives the incentive or properly creating and sharing our patches directly in the issue queues on Drupal.org.

And there is much more to it. In practice, a make file simply is a list of resources we need to retrieve and combine together. For example, to retrieve the [Boxes](http://drupal.org/project/boxes) module, version 1.0 Beta 2:

    projects[boxes][subdir] = contrib
    projects[boxes][version] = 1.0-beta2

We can include other make files, avoiding to constantly start off of a blank slate. We systematically build our Drupal 7 distributions out of [Build Kit](http://drupal.org/project/buildkit):

    includes[] = http://drupalcode.org/project/buildkit.git/blob_plain/dd1c740967b139a03002848bc1ec83e20ca929f7:/drupal-org.make

And as I said previously, we can also add patches and handle external resources (as in "not from Drupal.org"). We for example recently applied a patch to [Reliefweb.int](http://reliefweb.int) to address an issue we had with case sensitivity in some of our MySQL queries:

    ; #966210 - DB Case Sensitivity.
    projects[drupal][patch][966210] = https://raw.github.com/gist/858251/1e3d2206821de8b1a4e7743be78d4da17795a034/06_15_966210_db_case_sensitivity.patch

## Building the install profile

Now that we've put together the files (modules, themes, patches, libraries and core), we need to tell Drupal how to install things up; what modules to enable, what values to apply to settings... That's what the install profile is going to do (mainly). Install profiles are fairly similar to modules, with the main difference being the presence of a `.profile` file along with the regular `.info` file.

The `.info` file looks like any other;

    name = "Example"
    description = "Drupal 7 example install profile."
    version = "7.x-1.0"
    core = "7.x"

If you need to enable modules, you just need to add a dependency as you would do for a module:

    dependencies[] = "dblog"

We can also perform a fair amount of simple tasks within the `.install` file, using the `hook_install`, again like any other module;

    <?php

    /**
     * Implements hook_install().
     *
     * Perform actions to set up the site for this profile.
     */
    function profile_example_install() {
      // Disable user register.
      variable_set('user_register', USER_REGISTER_ADMINISTRATORS_ONLY);

      // Enable the admin theme.
      db_update('system')
        ->fields(array('status' => 1))
        ->condition('type', 'theme')
        ->condition('name', 'rubik')
        ->execute();
      variable_set('admin_theme', 'rubik');
      variable_set('node_admin_theme', '1');
    }

    ?>

Now, if you need to perform some more complex tasks, say for example batch importing a set of taxonomy terms, you probably want to do so in the `.profile` file. These will effectively be run as batch operations and will be less likely to run into a PHP timeout.

We have [a light example of what things look like](https://github.com/Wiredcraft/example) when put together (Drush make + Install profile) on github, feel free to have a look and mess with it:

    git clone https://github.com/Wiredcraft/example.git

## What's next?

This is only one piece of the puzzle; there are quite a few other best practices we follow or developed that help us keep things in control. That approach is nonetheless at the core of all our development practices, and we rigorously stick to it whenever possible.

Next time we'll see how we handle the second part of the equation; content. What we've seen today delivers the structure, now the question is how do we get data into it?
