---
id: libya
title: Voters registration for the Libyan elections
teaser: The Libyan elections
excerpt: Registering and managing the out-of-country voters for the 2014 Libyan elections
tags:
  - Libya
  - elections
site: http://voteabroad.ly
client:
  logo: /images/clients/un.png
  title: The United Nations
active: false
date: 2014-06-01
---

In preparation of the 2014 Libyan elections, [IOM](http://www.iom.int) came to Wiredcraft on behalf of the [HNEC](http://hnec.ly/?lang=en), seeking our expertise in electoral systems to build an online platform facilitating the registration and management of out-of-country voters spread across **22 countries** for an election involving **600k voters**.

![Screenshot](/images/work/libya/screenshot.png)

## Our clients

- The **[High National Elections Commission (HNEC)](http://hnec.ly/?lang=en)** which handles and manages the Libyan electoral process.
- The **[International Organization for Migration (IOM)](https://www.iom.int/)**, an intergovernmental organization which helps ensuring the orderly and humane management of migration, promotes international cooperation on migration issues, assists in the search for practical solutions to migration problems and provides humanitarian assistance to migrants in need.
- The **[UN Development Program (UNDP)](http://www.undp.org/)** which helps achieve the eradication of poverty, and the reduction of inequalities and exclusion in more than 170 countries.

<p align='center'><img src='/images/work/libya/Logos.png' alt='Logos'/></p>

## A challenging project

- **A tight timeline** with only 2 weeks to deliver a first prototype ready for testing.
- **Responsive design** to cater to a large mobile audience.
- **Multi-lingual and right-to-left language support** for English and Arabic.
- **High performance and scalability** allowing us to breathe through the peak in traffic leading to the elections. Up to 10,000 registrants in over 20 locations across a dozen countries.
- **Analytics, Data visualization & Reporting** allowing for the various actors involved to monitor and analyze the registration process.
- **Security**, an important factor in all of the work we do in the electoral space, especially in the case of Libya.
- **A Complex User Flow** imposed by the legal duties of the commission.

## Designing a voter registration platform that works

### Shaping a clear, focused User Experience

We started by outlining the information architecture and worked on refining the user flow that was originally drafted by the IOM team. Our efforts went into simplifying the navigation and flow.

![user-flow](/images/work/libya/user-flow.png)

Our early prototypes and sketches focused on building a simple user interface that drew the attention to one thing at a time, ensuring a reliable user experience for registrants. We planned on using a single, prominent sidebar navigation to help the user situate himself clearly in the registration process.

### Designing a contrasted User Interface

![illustrations](/images/work/libya/Libya-Wireframe.png)

Building on what we learnt with the user flow and sketches, we proceeded to design a highly contrasted user interface kit with obvious UI elements, keeping in mind the color set defined by the commission. We relied as well on illustrations and a simple minimalist icon set to convey simple, primary call for action.

![wireframe](/images/work/libya/mock.png)

### A bird's-eye view for administrators

The administration interface was designed with 3 goals in mind:

- Provide insights into the registration process.
- Enable quick and easy resolution of conflicts.
- Generate voters list at the end of the registration process.

## Under the hood

* **Speed and reliability with Node.js.** The need for high performance and scalability made this choice a pretty easy one. We used [Carcass](https://github.com/Wiredcraft/carcass), our very own [Express.js](http://expressjs.com/) framework.

* **Quick front-end prototyping with SASS.** Although we usually build [static clients combined with an API](http://devo.ps/blog/farewell-to-regular-web-development-approaches/), the schedule constraints made it difficult to ensure a proper QA for that approach. We decided to build server generated pages, using [Eggshell](https://github.com/Wiredcraft/eggshell/), our SASS prototyping library.

* **Leveraging NoSQL for flexible and compatible storage.** [CouchDB](http://couchdb.apache.org) was our main data storage, combined with [Redis](http://redis.io/) for sessions and [ElasticSearch](https://www.elastic.co) for search and analytics or reporting.

* **Data visualization for geo-data and time series with Javascript and Mapbox.** Mapbox is our go-to solutions to design and host custom maps. We combined it with [D3.js](http://d3js.org/) and [HighCharts](http://www.highcharts.com/) for charting time series and various other data visualization.

* **Infrastructure management with devo.ps.** [Devo.ps](http://devo.ps), Wiredcraft's server management solution, was the central piece to manage everything infrastructure, from continuous deployment to server configuration.

## Takeaway

Working with IOM, the UN and the HNEC on the Libyan elections gave us the opportunity to deepen our expertise in the electoral process and online electoral platforms. We battle-tested our product design process and demonstrated one more time that aggressive time constraints can be used as a catalyst for creativity and efficiency.
