---
title: Trends in International Development
author: ronan
tags:
  - design
  - product
preview: https://wiredcraft.com/images/posts/computer-class-san-jose.png
---

![Computer class in San Jose](https://wiredcraft.com/images/posts/computer-class-san-jose.png)
*<small>[Image Source](https://www.flickr.com/photos/worldbank/4725033296/in/photolist-8cx2Mj-8rMqoS-eUGYaU-cvL2c7-nev36D-cbLMj1-dnyXjb-eUtLoM-8zBWjs-2HGi9t-fgNu7E-bzJ9Fu-eUF7mE-d1w7Rd-cvL28d-cvL25G-8zxuj4-8zAC21-8rJjyv-8zAEaj-8zEdBo-8zxupk-8zAgMC-8zAmKy-8rMq8A-8LcZuo-8rMqkU-8zBRwm-8zEduf-8zAgUq-fgNu33-8zEd6f-8zEdjo-8zEdNd-8zBWuN-8zB4VX-8zEdFm-8La3ZT-8zEdqb-cWJGKE-8zBpPq-8zBS47-8zBRob-8zBNUq-8zBRNW-8zyEme-8zyhuD-8zyHbP-8zBNCE-8zyfHF/)</small>*

We work with a fair amount of international development organizations; from [helping the World Bank with its Open Data initiative](/blog/bringing-the-world-bank-data-to-sub-national-levels/) to [data science to assess the risks of floods with WRI](/blog/a-look-at-texas-flooding/) or [building the software for the Myanmar elections](https://wiredcraft.com/blog/myanmar-township-voter-registration-pilot/), we've dealt with many of the big players in the space.

These organizations are increasingly investing in technology (which is why [they hire us, and you should too!](https://wiredcraft.typeform.com/to/GG4GQz)). We've started noticing some interesting trends in the way they approach projects with a technological component.

<!-- more -->

## Products not projects

A growing number of organizations are finally approaching their projects with a product development mindset:

- **Measuring**. Defining a framework for how to measure success and failure early on. Without this in place, you are unable to validate or invalidate your assumptions and measure your impact. This is however a difficult process because, historically, there has not been a lot of international development organizations trying to do this. The Open Data movement has helped by putting some of the raw data in context, but defining what data measures your success is a challenge.
- **Prototyping**. Rather than investing large amounts of resources in long development and planning cycles based on little or anecdotal/unvalidated data, some of our partners (like the [World Bank](http://worldbank.org) or the [World Resources Institute](http://wri.org)) are starting to experiment with building multiple prototypes. These are smaller in scope, focused on, at most, validating a couple assumptions. Once you validated (or discarded) these assumptions, you can decide if and how to move forward. The direct results: a lot less waste and more chances to [make something people want](http://www.paulgraham.com/start.html).
- **Validating**. Related to the two previous points, but based on the metrics agreed upon to measure success/failure, we see people actually evaluating prototypes and validating the assumptions that were made. We double validation with post-mortems, drawing lessons from how the product was executed.

International development organizations have a lot to gain by adopting what startups have embraced when it comes to product design. We recommend you have a quick look at [how we design products](https://wiredcraft.com/blog/how-we-design-products/) and see if you can apply this to your own project (or [ask us to help](https://wiredcraft.typeform.com/to/GG4GQz)).

## Transparency & Open everything

Open Data, Open Knowledge and Open Source are some of the more visible trends, but there is a push to work more transparently, internally and externally. While many organizations and teams are still pushing back, we see a clear parallel with the resistance initially met by Open Source in the for-profit sector. Transparency has also been widely adopted in smaller for-profit organizations (startups especially) and we only see that trend catching on for international development organizations.

This can take many forms:

* **Public post-mortems and progress reports**. Reporting openly on what worked and what didn't after a project is done, or even better reporting on the progress through it. There is a **huge** value in sharing the learnings of your team at least internally, and often externally as well. The main arguments against it we usually hear is that it could give an advantage to competitors (other organizations competing for the same resources/donors). These arguments are similar to the ones made against Open Source, and are equally moot. Sharing back usually raises your understanding of your own process, strengths and weakness and the PR gains usually far outweigh the potential competitive edge you're giving away.
* **Best practices**. Many of our partners are starting to invest in building playbooks, internal Wikis or knowledge platforms to help share best practices and lessons learned across their organization. What we'd like to see next here are organizations sharing knowledge with each others. For example, NDI, DI, IFES, IRI and the UN would have a lot to gain from collectively contributing to an Open Knowledge platform on elections and democracy.
* **Open Source & ["not invented here"](http://en.wikipedia.org/wiki/Not_invented_here)**. Some of the larger players are finally starting to leverage Open Source and making strategic investments that they can use across teams and projects, rather than reinventing the wheel every time a new project comes along. We actually think that engaging with Open Source will also be a crucial factor to attract talent. Open Source is where it's at; any respectable developer has a GitHub account (or similar) to showcase its side projects and OSS contributions. Disregarding Open Source for proprietary solutions (and their vendors) is crippling these organizations' ability to attract and retain the candidates who could help them further their investment in tech.
* **Open Data**. I don't think I need to make the case for it. I would like however to mention that we finally see people investing in higher value elements like story-telling. A lot of organizations are getting around to pushing for Open Data and sometimes (proper) data visualization, but most are still not crafting any story around it. This is the impactful and relevant part of data science and they are starting to realize that.

We see many other things happening in that space, and hope for a lot more, in particular we'd like to see more cross organizational knowledge sharing. It's important that as a community we learn from our mistakes. Our team actually lives by the following principle:

> We fail fast and publicly, we break stuff and learn from it.

## Technology

We'll keep this one short with the few main trends:

- **Open Data rather than enterprise**. We already mentioned it, but Open Source is becoming a critical investment for international development organizations. This means as well adopting languages and technologies (like Python, [Mapbox](http://mapbox.com), [D3.js](http://d3js.org), Javascript) rather than proprietary and/or enterprise ones (.net, Tableau, Google Maps).
- **Fat data**. Big data was the buzz word in the past few years, but many organizations are now realizing that most of their data is "fat data" at best. They do not need map-reduce, Hadoop or Cassandra. Most needs can be covered with very approachable technology; we build many of our prototypes with Python and CSV or JSON files, with the occasional database like PostgreSQL (this includes [the sub-national data browser for the World Bank](/blog/bringing-the-world-bank-data-to-sub-national-levels/), the [Flood Analyzer tool for WRI](/work/the-aqueduct-global-flood-analyzer-tool/) with **over a million data points** or the [ongoing voter registration in Myanmar](https://wiredcraft.com/blog/myanmar-township-voter-registration-pilot/) with **over 30 million registrants**).
- **Static everything**. There is a departure from heavy, monolithic platforms (e.g. Drupal, Socrata) towards lighter, more nimble solutions. For example, static site generators like [Jekyll](http://jekyllrb.com). The new [NewAmerica.org](http://www.newamerica.org) is built on [Pelican](http://www.getpelican.com/) (that is until our team extends the work done with Jekyll on the [New America Weekly](http://weekly.newamerica.org) prototype to the entire platform). Most of our work in the past 18 months with the World Bank has been based off of either using static generators or building static clients combined with an API in the backend (like the new [sub-national data browser](/blog/bringing-the-world-bank-data-to-sub-national-levels/)). You can [read more about this approach](http://devo.ps/blog/farewell-to-regular-web-development-approaches/) on the devo.ps blog (one of our products).
- **3rd parties**. Platforms like GitHub are becoming industry standards. Most modern organizations have already been there for a few years and we see this only accelerating. This plays along nicely with being transparent, prototyping and fighting the "not invented here" trend. If there's an online tool to do it (and if it does it well), why would you go and try to build it yourself. It is a distraction and a poor use of your resources.
- **Security**. It should be pretty clear for most that the increasing complexity of our stacks means that we have increasingly complex and large surfaces of attack. We often mitigate that aspect by using [our static approach](http://devo.ps/blog/farewell-to-regular-web-development-approaches); if the public facing application doesn't have an admin interface, credentials or a complex stack (dynamic language, database etc), it is a lot easier to keep it secure.
- **Mobile** is the fastest growing audience, we doubt we need to convince anybody of the need for investing in mobile/responsive at this stage. The big players are already investing in it.

A few of the technologies that we've reliably invested in the past few years:

- **Front-end frameworks**: after first investing in Backbone, and then AngularJS, we settled for [React](http://facebook.github.io/react/) in late 2011 and haven't looked back.
- **Data visualization**: [D3.js](http://d3js.org) of course, but also [Mapbox](http://mapbox.com) (especially their new [Mapbox Studio](https://www.mapbox.com/mapbox-studio/)), [Leaflet](http://leafletjs.com), [CartoDB](http://cartodb.com) and [chartist.js](http://gionkunz.github.io/chartist-js/) (which plays nice with React).
- **Backend**: [Django](https://www.djangoproject.com/) & Python, [Node.js](https://nodejs.org/en/) and [Go](https://golang.org/).
- **Database**: [PostgreSQL](http://www.postgresql.org/) (especially for anything GIS), [Redis](http://redis.io), [CouchDB](http://couchdb.apache.org) & [CouchBase](http://www.couchbase.com).
- **Search**: [ElasticSearch](https://www.elastic.co/products/elasticsearch).

## In conclusion

The successful organizations we've had the chance to partner with in the past few years have been consistently investing in 3 things:

- **Technology**; there's no way around it, this is how modern organizations are reaching out their audiences and solving the challenges they're facing.
- **Transparency and "Open"**; Open Source, Open Knowledge, Open Data... Building walls around most of your assets, may this be code or know-how, is becoming irrelevant. Embrace it and learn to leverage it.
- **Prototype, Measure, Validate**; learning to adopts the tools and methodologies the startup world has forged in the past decade is the best way to ensure you're building something actually successful.

These are the things governments and large established for-profits are already set on adopting. It's only a matter of time before these become the default for the international development organizations.

If you're looking for a partner to help you navigate these topics, [reach out to our team](https://wiredcraft.typeform.com/to/GG4GQz).
