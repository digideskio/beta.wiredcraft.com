---
id: aqueduct
title: The Aqueduct Global Flood Analyzer Tool
teaser: The Global Flood Analyzer Tool
excerpt: Understanding and visualizing the impact and risks of floods worldwide with the World Resources Institute
tags:
  - data science
  - prevention
  - floods
site: http://floods.wri.org/
client:
  logo: /images/clients/wri.png
  title: The World Resources Institute
redirect_from:
  - /work/the-aqueduct-global-flood-analyzer-tool/
active: true
date: 2015-04-01
---

The [World Resources Institute (WRI)](http://wri.org) is committed to promoting sustainable use of our natural resources. We partnered their Aqueduct team to build a Web tool helping them raise awareness about flood risks and climate change impacts by visualizing more than a million data point related to river flood impacts, and estimating the damage to GPD and urban populations.

![Screenshot](/images/work/aqueduct/overview.png)

## Our clients

The [Aqueduct](http://www.wri.org/our-work/project/aqueduct) project of the [World Resources Institute](http://wri.org/) is dedicated to helping the community, businesses and decision-makers to better understand potential water risks through measuring and mapping data on water scarcity and risks. Currently the threat of river flooding could affect approximately 21 million people on average each year, with the affect of climate change and socio-economic development the affects of flooding could expand to 54 million people in 2030. The Flood Analyzer tool provides open and free access to a visual representation of the potential current and future impact of flooding.

![logo](/images/work/aqueduct/WRI-Aqueduct-logo.png)

## Assessing floods risks worldwide

Organized by user choice of State, River Basin, or Country, the tool provides current and future predictions (up to 2030) for the risk of flooding. Potential data for affected GDP, Population and Urban Damage is calculated for the current and future risk based on the robustness of the flood protection system. Future calculations are presented in three scenarios with varied projected affects of socio-economic development and climate change.

## Challenges

* **Handling fat data**. With over 1 million data points, the flood analyzer tool was needed to be analyzed and visualized.
* **Data science at scale**.  between caching the calculations and on the fly calculations.
* **Compatibility** across browsers.
* **Preventing sluggish user interactions.**
* **Establishing hierarchy** for information to give the user a clear explanation of the impact of investing in flood protection systems.
* **Visually balancing** the graph and the map on a single page.


## Behind the User Experience

### Cohesive Integration

The overall user interface and experience was designed for cohesiveness when integrating the application with the WRI website. A graph representing the impact of flood protection plans and the raw statistical data was jointly added. The original idea was to implement these assets on two separate pages.

![wireframe](/images/work/aqueduct/wireframe.png)

### Design Characteristics

In order to provide the best user experience we would need to consolidate the application into a single page. We implemented non-intrusive design characteristics to create a distinction between the graph and map.

* Subtle gradient between map and graph
* Different type weights
* Foldable menu

![interface](/images/work/aqueduct/interface.png)

### Intuitive Navigation

As seen from our original wireframes we changed certain design formats to improve the user experience. The flood protetion selection bar is now fixed to the top bar, providing clearer access to the data. We also altered the presentation of the predicted data to align horizontally for clearer depiction.

![content](/images/work/aqueduct/content-arrangement.png)

![mockup](/images/work/aqueduct/organization.png)

## Under the Hood

* **Efficiency and ease of use is top priority.** We used [Python](https://www.python.org/) APIs to seamlessly integrate with the WRI's existing Python framework and libraries {[numPY](http://www.numpy.org/) and [pandas](http://pandas.pydata.org/)}. This choice eased the processing of the large data sets.
* **Reduced processing times for large data.** This was achieved by working with WRI directly and utilizing [Redis](http://redis.io/) to store pre-calculated data in caches.
* **Customized maps with MapBox and Leaflet.** [Mapbox](http://www.mapbox.com) is a lightweight application we built on top of [Leaflet](http://leafletjs.com/) allowing us to easily map and control millions of data points and offering better touch support for high performance on mobile devices.
* **Data visualization with JavaScript.** We used [D3.js](http://d3js.org/) for our graphical data visualization, as it is the leading tool for fine grained control of graphical elements.

## Takeaway

This project allowed us to hone data visualization skills by leveraging our experience and expertise to optimize our data calculations, resulting in faster processing times and better user flow. We tested our efficiency by working with our client during the design process to limit the time spent re-doing wireframe and mock ups.
