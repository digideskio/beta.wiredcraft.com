---
published: true
title: "Lightening the Load with FalcorJS"
author: baruch
tags:
  - Falcor JS
  - data flow
excerpt: "The 3 most important reasons why i use FalcorJS to rebuild an Open Data portal: keep requests down, unify & simplify the dev of front and back-end."
preview: https://wiredcraft.com/images/posts/falcor-js-dataflow-app.jpg
---

![FalcorJS logo](https://wiredcraft.com/images/posts/falcor.jpg)

Wiredcraft is currently rebuilding an Open Data portal to be an SPA (single-page application) and to work well on mobile. The dataset has about 1500 different indicator time series for most countries and the portal can display these in graphs and heatmaps. We had the flexibility to try some new technology with this project and choose to try [Netflix’s Falcor Technology](https://netflix.github.io/falcor/starter/what-is-falcor.html). 

 FalcorJS produced some really good results, including:

- __Helping with getting the amount and size of network requests down, important for bandwidth restricted devices__
- __Greatly simplified code on the front-end__
- __Increased development speed by unifying the front- and the back-end__

## Keeping network requests down using Falcor

In order to deliver a good performance on mobile, not only do the frames per second need to be good, but also the response time on user actions. By using [Falcor](https://netflix.github.io/falcor/starter/what-is-falcor.html) we are able to keep the amount of network requests and their size down, which is important for connections with limited connectivity such as mobile phones. Falcor gets data to you by allowing you to _query_ on your data-structures with a little bit extended JavaScript-like access language called jsonGraph. When a user changes something on the page that updates any of these queries they can be sent to Falcor which turns it into paths on the data-structures. These are used by Falcor to __make a single request to resolve all the data__. 

![Falcor dataflow application diagram](https://wiredcraft.com/images/posts/falcor-js-dataflow-app.jpg)

<!-- more -->

## Greatly simplifies code on the front-end

>  "Well-formed Data at rest is as close to perfection in programming as it gets. _All the crap_ that had to happen to put it there however.."_ - [Michael Fogus](https://twitter.com/fogus/status/454582953067438080)
 
The aforementioned "crap" becomes substantially less for the front-end as most of your concerns about merging in new changes into your existing data on the client evaporate. But the key word in this quote is _well-formed_. In order to get to such a simple way of “querying” your data it is best to have gone through the process of _normalization_. 
The cause of many problems that front-ends face has to do with the fact that _UI’s are representing data as a tree_, __when our data is usually a graph.__ What that means is that usually UI’s represent the same logical entity in different places, in a database there
 are _links_ to _identify_ the data as belonging to an entity. 
 
Falcor provides us with a way to not have to do all the composition logic surrounding requesting and merging in parts of our data. For example: updating an entity in a tree means maintaining it in all the places it’s represented, and Falcor does this for you by providing you the means to resolve links in your data structure. This allows you to form trees that are actually maintained as graphs.

An added benefit to identifying your logical entities like this, is that attributes can be cached. This means that if we first query a range from 1960 to 1990 and later update this range to go from 1960 to 2015, Falcor will only try to retrieve paths that were not already locally available. As a user browses longer that means less and less requests as the cache fills up.

## Increased development speed by unifying front- and back-end

By just using Falcor the back-end does not magically know the supported data formats, but _that drives the discussion_ with a focus on the data-structures supported. What is normally complex composition logic from multiple end-points is now offloaded to the back-end. We’ve found discussion around the data-structures to be way more fruitful than the discussion around endpoints, which we’ve found is a costly level of indirection.

### Good stuff aside

Falcor is rather new. Although Netflix reports that it's used for all their platforms (from pc to set-top box) and eliminated 90% of their rest based code, there remains some danger to using a new technology like this that takes such a different approach from the industry standards.

For example code-examples are a little sparse, luckily the documentation is good so figuring things out ourselves hasn't been too difficult. 

Additionally, we don't make use of some of the more advanced features that change the data through Falcor, since our data is pretty static in the sense that it doesn't get updated often (there is no events like "user favorites thing").

### Good stuff

By starting to use Falcor we have found a big simplification in managing data-flow from and to the server, and by having talks around data-structures we’ve found it easier to optimize for reduced requests. We have minimized the amount of requests: when the html, css and our JS framework loads it does not need to make any additional requests for data until the user starts interacting with the components. And when these interactions happen the minimum amount of changes get pulled in. Ultimately FalcorJS lightens the load on us developers mentally and on the user measured in bytes.
