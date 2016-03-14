---
title: Building the Southern Sudan Referendum's voting infrastructure
author: ronan
tags:
  - Drupal
  - Drupal planet
redirect_from:
  - /posts/2011/02/13/building-southern-sudan-referendums-voting-infrastructure.html
preview: /images/posts/sudan_2.jpg
---

Between November 2010 and January of this year, our team worked closely with the [International Foundation for Electoral Systems](http://ifes.org) (IFES) and the Southern Sudan Referendum authorities to build and deploy the tools that would allow for collecting and validating the registration and vote of over 3.8 millions Southern Sudanese. The referendum results will decide of whether or not this region should become an independent country; with over 98% in favor of the secession, the biggest country in Africa seem to be on its way to split in half.

<!-- more -->

<p align='center'><img alt='The datacenter in Juba' sr='http://wiredcraft.com/images/posts/sudan_2.jpg'/></p>

## Registration and result collection softwares

Our part into this started with building a software allowing for a secure data collection of the registration information coming from over 2,600 referendum centers spread over Southern Sudan. While the actual registration process took place in these centers, the actual collection and verification of these information happened in two main datacenters located in Karthoum and Juba. Once shipped at these locations, the local teams relied on our platform to process the registration forms through a pre-defined workflow ensuring the accuracy and validity of the collected data. This workflow relied mainly on a double entry process of the collected data, then processed through various quality checks.

On top of this process, we built various reporting tools that allowed the SSRB and SSRC (respectively the Southern Sudan Referendum Bureau and the Southern Sudan Referendum Committee) as well as other involved parties, including international organizations (UN, European Commission...), to monitor the progress and trends of various metrics; gender and geographic distributions, percentages of processed data against expected volumes, amounts of forms in the various states of the collection workflow...

Following the registration of the voters, we extended the tools we had built to perform similar operations for the actual results of the referendum.

Me and Makara Wang (our Technical Director) had the opportunity to work directly on the ground, in Juba, with the local teams of the IFES, SSRB and SSRC. The high sensitivity of the data, security heavy context and various technical difficulties of working from such a remote location requested for an engineer of our team to be present through both data collections.

<p align='center'><img alt='The datacenter in Juba' src='http://wiredcraft.com/images/posts/screenshots/rims_2.png'/></p>

More screenshots of our work on the [case study of this project](http://wiredcraft.com/posts/2011/01/15/wiredcraft-building-the-southern-sudan-referendum-infrastructure.html).

## Under the hood

Our process has been [Features](http://drupal.org/project/features) centric pretty early on; all our projects are now shipped as fully functional install profiles leveraging [Strongarm](http://drupal.org/project/strongarm), [Context](http://drupal.org/project/context) and one of my favorite as of late; [Profiler](http://drupal.org/project/profiler). All these tools allow us to build robust online applications; it helps us speed up our development process, improve our overall quality and overall allow us to leverage Drupal as a real software development platform more than a CMS.

Dashboards and graphic representations of the metrics we were tracking were built using the highly recommendable [HighCharts](http://www.highcharts.com/) javascript library.

Following the data collection, our team also built the public results site; [SouthenrSudan2011.com](http://southernsudan2011.com); stay tuned...
