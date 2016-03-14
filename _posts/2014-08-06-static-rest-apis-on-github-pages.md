---
title: Static REST APIs on GitHub Pages
author: juha
tags:
  - REST
  - API
  - GitHub pages
  - GitHub
  - static
redirect_from:
  - /posts/2014/08/06/static-rest-apis-on-github-pages.html
preview: /images/posts/static-apis.png
---

We already wrote about how central [GitHub is to our work at Wiredcraft](http://wiredcraft.com/posts/2013/09/18/github-for-everything.html). We not only use it to collaborate and run our company, it also often is part of how we release applications. For example, [devo.ps' very own documentation website](http://docs.devo.ps) (complete with a search) or this very website are GitHub Pages. Nothing unusual considering the momentum static generators have been gaining in the past couple years.

<!--more-->

With that being said, we often take this concept a bit further. As we've said before, we very often build applications by [coupling a static client and a REST API](http://devo.ps/blog/farewell-to-regular-web-development-approaches/). What we haven't talked much about is the fact that we often host both the client and the API on GitHub Pages. We use that approach for our clients at Wiredcraft (like [GPE's data hub](http://datahub.globalpartnership.org/#/2008/access/gross_enrollment_rateger)) as well as our products.

The core idea is simply to store both the source of the client (usually an AngularJS app) and your raw data (often CSV files when we deal with small geo-datasets) in the master branch of your repository. We then proceed to compile this into a full blown static client and API "mock" in the gh-pages branch (using our beloved [devo.ps](http://devo.ps)). Here's what it looks like:

<p align='center'><img alt='Overview' src='/images/posts/static-apis.png'/></p>

The resulting API looks and behave like a regular REST API, save for `.json` appended to all the queries. We often end up using that approach for geo-data datasets, where you could have the following organization:

    World.json
    Africa.json
    Africa/
    |
    +- Algeria.json
    +- Algeria/
    |  |
    |  +- Adrar.json
    |  +- Chlef.json
    |  +- Laghouat.json
    |  +- ...
    +- Angola.json
    +- Angola/
    +- Benin.json
    +- Benin/
    +- ...

There are multiple advantages to this approach, and we are actually applying some of it to [something in the making sponsored by the Knight Foundation](http://www.knightfoundation.org/grants/201448512/), but mostly it makes it **very easy to build and ship projects**. You immediately have a CI in place, and when it is time to deliver your project over to your client, you can simply migrate your entire repo over to their account. They not only get the source code, but also the production code (from the gh-pages branch), issues and documentation (wiki).

Also, it means you're not hosting one more app, and we're all about not making our lives more complicated than they already are.

We'll soon be posting a tutorial on how to use [devo.ps](http://devo.ps) to do this; in the meantime, don't hesitate to [come chat with us](https://www.hipchat.com/gyHEHtsXZ) if you feel like asking us more details about it.
