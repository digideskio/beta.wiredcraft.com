---
title: Wiredcraft Building The Southern Sudan Referendum Infrastructure
author: ronan
tags:
  - Sudan
  - infrastructure
  - DevOps
  - maps
redirect_from:
  - /posts/2011/01/15/wiredcraft-building-the-southern-sudan-referendum-infrastructure.html
preview: /images/posts/screenshots/ssrr_2.png
---

The [IFES](http://ifes.org/) (International Foundation for Electoral Systems) was involved in Sudan for the 2011 Southern Sudan Referendum which was to decide of the independence of Southern Sudan. Working on the ground with the SSRB and SSRC (respectively the Southern Sudan Referendum Bureau and Southern Sudan Referendum Commission), IFES helped plan and implement the collection of data from the referendum centers, from registration to results.

<!-- more -->

Working directly with the IFES and the referendum authorities, we designed and deployed 3 platforms; 2 data collection applications for both registration and result entries, and [the official results website](http://southernsudan2011.com/).

<p align='center'><img src='//wiredcraft.com/images/posts/screenshots/ssrr_2.png' alt='Data viz'/></p>

Both data collection platforms were built with security and accuracy in mind; the complex workflows and data integrity checks that constituted the main part of the system were designed in collaboration with the IFES' staff and were rigorously implemented. Leveraging Drupal's install profile capability, as well as a [Features](http://drupal.org/project/features) based approach, we were able to quickly roll out fresh install of the system after each iteration of the software, ensuring a very smooth validation process. On top of these processes, we crafted a series of high level dashboards, aggregating overviews and details of various metrics allowing technicians and managers to follow trends and . Both Ronan Berder (Managing Director) and Makara Wang (Technical Director) were sent out in Juba, Sudan, to supervise the deployment and proper operation of the systems as well as perform ongoing adjustments while the referendum took place.

<p align='center'><img src='//wiredcraft.com/images/posts/screenshots/ssrr_1.png' alt='Data viz'/></p>

[SouthernSudan2011.com](http://southernsudan2011.com/), the official results website, allowed us and the referendum's authorities to periodically update the status of the 2,893 referendum centers by simply uploading a spreadsheet. Beyond the regular metrics that were calculated through the site and helped us represent distributions and trends, we geolocalized all referendum centers and built map-based visualizations of the votes. Working with [Mapbox](http://mapbox.com/), we received personal support from the [Development Seed](http://developmentseed.com/) who enhanced the level of details for Sudan on their [World Light tileset](http://mapbox.com/tileset/world-light).


<img src='//wiredcraft.com/images/posts/screenshots/rims_2.png' alt='RIMS 1' align='right' width='48%'/><img src='//wiredcraft.com/images/posts/screenshots/rims_3.png' alt='RIMS 2' width='48%'/>
