---
title: Launching the new ReliefWeb for the United Nations
author: ronan
tags:
  - Performance
  - Maps
  - Data visualization
  - Drupal
  - Drupal planet
redirect_from:
  - /posts/2011/04/27/launching-new-reliefweb-united-nations.html
  - /blog/launching-the-new-reliefweb-for-the-united-nations/
preview: /images/posts/reliefweb_before_after.png
---

Two weeks ago we finalized roughly 3 months of work by launching the [new ReliefWeb website](http://reliefweb.int) built by the [Development Seed](http://developmentseed.com)'s folks. ReliefWeb, spawned by OCHA (the United Nations Office for the Coordination of Humanitarian Affairs), has been providing around the clock information on humanitarian emergencies and disasters since 1996. It delivers reports, maps and job opportunities to the humanitarian community and helps countless organizations coordinating emergency assistance.

<!-- more -->

<p align='center'><img alt='The ReliefWeb overhaul; old and new sites' src='http://wiredcraft.com/images/posts/reliefweb_before_after.png'/></p>

## A spread development team

The site was developed by Development Seed who handed it over to us in January; Alex Barth gives a great [run down of the features and new organization of the site](http://developmentseed.org/blog/2011/apr/12/united-nations-reliefweb-relaunches) in his latest blog post. Having been working with their team in the past, we were excited taking on the launch and maintenance of their latest creation.

The United Nations' team was spread over Geneva and New York, with a mix of technical, editorial and managerial staff in both offices. Working with both teams added over the diversity of the overall team, which included American, French, Chinese, Japanese and British members. We are very much looking forward to keep on working with the ReliefWeb team in leading the next phase of developments.

<p align='center'><img alt='Map of the team members'
 src='http://wiredcraft.com/images/posts/reliefweb_team_map.png'/></p>

This is not an unusual organization for us; we tend to have spread teams, working ourselves out of Shanghai and having clients all across Asia, Europe and the US. Despite the geographical stretch, our agile approach usually works well, working asynchronously with the various members of the team on various timezones. As we've previously stated, [Open Atrium](http://openatrium.com) and an agile approach is crucial to that type of collaboration.

## The technical stack

The site is running on Drupal 7, which was the main motivator for porting the [Features](http://drupal.org/project/features), [Context](http://drupal.org/project/context) and [Strongarm](http://drupal.org/project/strongarm) to the latest version of Drupal. The search is powered by [Sphinx](http://sphinxsearch.com/), which generates faceted search across the various sections of the site.

Most of the data displayed on the site is tied up to a location; maps are omnipresent and provide a great way of visualizing the worldwide activity of disasters and reports. Development Seed worked directly with the UN to design a specific [Mapbox](http://mapbox.com) tiles set that follows the UN's official definition of international borders. Tiles are served through [OpenLayers](http://openlayers.org).

Performance-wise, the site is relying on [Varnish](http://www.varnish-cache.org/) to cache the content for anonymous traffic. The hundreds of thousands of people subscribing to email notifications also led to the use of [SendGrid](http://sendgrid.com/) to handle the sheer number of emails ReliefWeb sends daily. The site is served through Aegir, which allows us to keep a pretty neat release workflow.

## Content migration

The previous version of ReliefWeb was built on Lotus Note and represented more than;

* **350,000 reports**,
* **150,000 registered users**,
* **20,000 maps**,

Migrating this content to Drupal was done using [Feeds](http://drupal.org/project/feeds); old content was regularly sanitized and exported to CSV files, Feeds can then grab this content and create the proper nodes, users and taxonomy terms. This approach works well in conjunction with install profiles, keeping structure in code and letting Feeds handle the data.
