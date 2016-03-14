---
published: false
title: "Structured Data and Markup: how Google is shaping the future of SEO"
author: thomas
tags:
  - seo
  - structured data
  - markup
  - search
excerpt: "SEO"
preview: http://wiredcraft.com/images/posts/search-seo-structured-data-markup.png
---
![Search is evolving incredibly fast, so SEO needs new tricks, like markup and structured data.](http://wiredcraft.com/images/posts/search-seo-structured-data-markup.png)

Search is evolving - fast - right in step with our ever-changing social habits. As search engines are moving to improve their algorithms, I’ve seen three huge trends leading the way: mobile use, conversational search, and implicit queries.

For people using mobile internet, voice search is increasingly popular. Search queries are becoming more mobile and more conversational. Recently, Lisa Michaud wrote on TechCrunch about [the challenges of conversational queries](http://techcrunch.com/2016/03/06/cognitive-correction-and-creating-better-human-to-machine-interaction/).

Voice search uses a mix of natural language and semantic search. Ultimately, search will be able to predict your needs, guess your implicit intent and do things on your behalf. Mobile and voice search are the new priorities, with an emphasis on “[direct answers](http://www.cio.com/article/2919092/seo-sem/how-voice-search-and-google-direct-answers-are-changing-seo.html)” to queries. Mobile use implies conversational search, which weaves in information such as where you are, what you’ve searched for in the past, and who you are. Localization and personalization of search will make semantic SEO and structured data increasingly important. And with the Internet of Things and voice search, search engines are refocusing into becoming more of an interface that allows people to interact with data and take advantage of different functionalities.

Google understood it well and went full steam ahead on improving its search functionalities in 2011. Google built up the [Knowledge Graph](https://www.google.com/intl/es419/insidesearch/features/search/knowledge.html), its Google cards and started encouraging websites to use “markup tags” to enrich result pages. These tags allow Google to truly understand what your content is about. 

It’s plain fact that traditional SEO tags are dying. Keyword tags disappeared and meta descriptions stopped being used as a ranking factor. Lots of qualitative factors appeared as measures while Google’s search algorithm was becoming more complex: link quality over link quantity, content quality over keyword-stuffed articles, and domain authority on top of it all. Old meta tags are becoming less and less relevant. So what’s left for the search specialist to optimize?

## What is Structured Data?

First, a bit of vocabulary. Three terms to remember:

**[Structured data](https://developers.google.com/structured-data)** is a system of pairing names with values that helps search engines categorize and index your content. 

**[Microdata](http://schema.org/docs/gs.html#microdata_how)** is one form of structured data that works with HTML5 (also RDFa or JSON-LD). 

**[Schema](http://schema.org/)** is a project that provides a particular set of agreed-upon definitions for microdata tags. If you’re wondering about the compatibility of those tags across the different search engines, you’d better know that Schema is a collaboration between Google, Bing, Yandex, and Yahoo!

These data elements can be used in anything from pricing, availability, breadcrumbs, videos, emails, company details and so on.

To use the Schema example, [let’s say you have a blog about the 2009 blockbuster film “Avatar”](http://schema.org/docs/gs.html). Thanks to specific tags dedicated to movies, markup tags will help Google to understand you are talking about the movie, not your character in some game or your collection of emojis. 

## What’s in for me?

Schema tags have been built to help search engines understand your content and potentially making your search result snippets even richer.

It will obviously improve your visibility on result pages - and your [click-through-rate](https://support.google.com/adwords/answer/2615875?hl=en) - and while structured data isn’t a ranking factor, Google’s John Mueller already [hinted it could become one in the future](https://youtu.be/QWL864VlW7I).

Search engines use structured data to generate rich snippets, which are small pieces of information that will then appear in search results. For search engines to understand these informations, you need to tag your article titles, ratings, number of reviews, author, pictures and breadcrumbs. 

By the way, apart from search engine optimization, all those elements have value by themselves. And once they’re used on your website, you only need to tag them. Breadcrumbs, for example, are an Ariadne’s thread for giving readers their location on website. Multiple studies have shown that [breadcrumbs lower bounce rates](http://usabilitynews.org/breadcrumb-navigation-an-exploratory-study-of-usage/) by giving visitors some navigation options. 

It almost always appears in the top left part of the website and would look like this:
Home > Blog > SEO > Structured data and markup - how Google is shaping the future of SEO

On the result page, your users will get search results that are optimized and, thus, more enticing.

Here’s a good example (let’s not get too serious):

![Search result page](http://wiredcraft.com/images/posts/search-seo-markup-structured-data-1.PNG)

On the left, results 3 and 4 shows pictures, publication date, recipe time, titles and author. On the right, we have a knowledge graph using the most authoritative content. Here it is Wikipedia, but it could be your website.

Structured data might be used as well to [highlight your company details](https://developers.google.com/structured-data/customize/logos), contact informations, address, social networks. I took a little company called IBM as an example to show you how you can enrich your contact information straight on a Google result page.

![Knowledge graph](http://wiredcraft.com/images/posts/search-seo-markup-structured-data-2.PNG)

You can also use structured data to personalize Google Now cards. For example, Google can read your Gmail and, from that information, understand that you have a hotel reservation for a particular date and time. Google can then surface relevant results when you’re performing searches (such as “nearby restaurants”).

Consider adding structured data to your emails for this purpose. You can also [mark up events](http://searchengineland.com/google-events-knowledge-graph-adds-ticket-links-delegated-events-comedian-events-venue-events-212894) to show in the Knowledge Graph.

In fact, markup tags can used for any exploitable data by search engines.

## How to implement Schema.org tags

Structured data is added directly to a page’s HTML markup. It’s simply a way of tagging the data in your web pages so that search engines can easily understand them. 

Two tools are fantastic when you’re starting with schema tags. 

[Google Markup Helper](https://www.google.com/webmasters/markup-helper/) allows you to generate your markup-tags-improved-html code with the type of information you want to highlight.
Select the type of values you want to highlight, add your URL, and highlight the related fields. Click on generate HTML… Et voila!
Here’s an example of our last blog post which I tagged with the Google Markup Helper tool.

![Our recent blog post tagged with Google's Markup Helper tool](http://wiredcraft.com/images/posts/search-seo-markup-structured-data-3.PNG)

And if you feel insecure using those mysterious new tags, Google also provides a [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/).

I don’t want to drown you in code, so I’ll give you just one example of an email enriched with markup tags:

````
<html>
  <body>
    <p>
     Dear John, thanks for coming to the NingJS conference organized by Wiredcraft for the JavaScript community.
    </p>
    <p>
      BOOKING DETAILS<br/>
      Order for: John Smith<br/>
      Event: NingJS 2016<br/>
      When: September 2016<br/>
      Venue: Nanjing Conference Hall<br/>
      Reservation number: NingJS12345<br/>
    </p>
  </body>
</html>
````

_And if i add markup tags..._

````
<html>
  <body>
    <div itemscope itemtype="http://schema.org/EventReservation">
      <meta itemprop="reservationNumber" content="NingJS12345"/>
      <div itemprop="underName" itemscope itemtype="http://schema.org/Person">
        <meta itemprop="name" content="John Smith"/>
      </div>
      <div itemprop="reservationFor" itemscope itemtype="http://schema.org/Event">
        <meta itemprop="name" content="NingJS 2016"/>
        <time itemprop="startDate" datetime="2016-09-01T10:30"/>
        <div itemprop="location" itemscope itemtype="http://schema.org/Place">
          <meta itemprop="name" content="Nanjing Conference Hall"/>
          <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <meta itemprop="streetAddress" content="888 Main Street"/>
            <meta itemprop="addressLocality" content="Nanjing"/>
            <meta itemprop="addressRegion" content="Jiangsu"/>
            <meta itemprop="postalCode" content="210000"/>
            <meta itemprop="addressCountry" content="CN"/>
          </div>
        </div>
      </div>
    </div>
    <p>
      Dear John, thanks for coming to the NingJS conference organized by Wiredcraft for the JavaScript community.
    </p>
    <p>
      BOOKING DETAILS<br/>
      Reservation number: NingJS12345<br/>
      Order for: John Smith<br/>
      Event: NingJS 2016<br/>
      Start time: September 1st 2016 10:30am PST<br/>
      Venue: Nanjing Conference Hall, 888 Main Street, Nanjing, Jiangsu 21000<br/>
    </p>
  </body>
</html>
````

By the way, don’t go to Nanjing Conference Hall, 888 Main Street, Nanjing - there’s no such place. We’ll give all the details for NingJS in due time. :)

Hate the change? Like it? Share your thoughts with [us on Twitter](https://twitter.com/wiredcraft) or [me personally](https://twitter.com/tomportolano). We’ll be happy to hear your thoughts.

