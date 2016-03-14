---
title: Upgrading ReliefWeb with data in mind
author: quentin
tags:
  - news
redirect_from:
  - /posts/2012/02/07/upgrading-reliefWeb-with-data-in-mind.html
---

[ReliefWeb](http://reliefweb.int/) produces and aggregates up-to-the-minute information on humanitarian crises and natural disasters. A wide array of information including news, policy documents, and infographics are published around-the-clock by ReliefWeb's offices in Geneva, Kobe, and New York. Created by the [United Nations Office for the Coordination of Humanitarian Affairs](http://www.unocha.org/) (OCHA) in 1996, ReliefWeb has since helped organizations respond to crises around the world.

<!--more-->

## A new look and feel

Beginning in 2010, Wiredcraft partnered with [Development Seed](http://developmentseed.org/) to build and launch the latest incarnation of ReliefWeb.int. We migrated over 350,000 reports, 150,000 registered users, and 20,000 maps to a faster, more reliable, and more robust platform.

ReliefWeb.int is built on Drupal 7 and offers two main ways to access its high volume of information: faceted search and country/crisis profiles. The faceted search component is powered by [Sphinx](http://sphinxsearch.com/) and provides granular insights into ReliefWeb's wealth of online content. Country/crisis profiles are built on top of a custom MapBox tile set that provides curated content hubs. In fact, much of the information found on ReliefWeb is contextualized via maps. Development Seed collaborated with the United Nations to develop a custom [MapBox](https://www.mapbox.com/) tileset. This custom tileset shows disputed border areas and frames the country profile overviews.

## Enhancing the experience

Given the large amount of data published by ReliefWeb, speed, reliability, and scalability were the project's top goals. ReliefWeb.int was rebuilt from the ground up with performance in mind. We used highly optimized code and tools such as Varnish reverse-proxy to provide a snappy experience for visitors and handle traffic surges experienced during humanitarian crises. We also employed [SendGrid](http://sendgrid.com/) to reach ReliefWeb's hundreds of thousands of subscribers when notifications are sent.
