---
collection: blog
title: APIs and Data visualization at scale for the World Bank
author: quentin
tags:
  - Case study
redirect_from:
  - /posts/2013/08/22/apis-data-visualization-at-scale-for-the-world-bank.html
---

The [World Bank's](http://www.worldbank.org/) Open Data initiative aggregates 1000+ development indicators collected between 1960 and 2012 for 209 countries. The development indicators are viewable at [Data.worldbank.org](http://data.worldbank.org/).
Data.worldbank.org is one of the World Bank's most heavily visited sites and continues to grow in popularity.

<!--more-->

Increased site traffic, the integration of new data sources, and the growth in use of embedded widgets leveraging data.worldbank.org taxed the World Bank's Open Data platform. Performance, stability, and scalability issues started cropping up. Widget load related errors and server caching issues became common.

## Improving Open Data platform performance

We began by auditing data.worldbank.org with an eye towards data caching and delivery on the backend and data visualization on the front-end. The audit results presented recommendations with an emphasis on improving the existing user experience (new multilingual tools, re-imagined topic and country pages) and improving underlying site performance (API level caching and enhanced data delivery).

In partnership with the World Bank's technical team we were able to:

* Align Topic and Country page data.
* Improve Topic and Country page data visualizations.
* Implement English, French, Spanish, Arabic and Chinese language support.
* Improve API scalability while building a consistent approach to data formats.

## Streamlined and consistant

Our work on data.worldbank.org provides a clearer user experience, a stabilized API, and a scalable backend supporting future growth in demand. With the use of industry standard technologies we made it easier for future upgrades and improvements to take place. The World Bank has a more robust Open Data platform today and an extensible Open Data platform for tomorrow.

On a side note, this is one of our earlier projects where we leveraged GitHub's collaborative environment to enhance communication with our client. GitHub's platform increased transparency between Wiredcraft and the World Bank by making it easier to share information and collaborate.
