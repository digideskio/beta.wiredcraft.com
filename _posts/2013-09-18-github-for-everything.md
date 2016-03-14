---
title: Github For Everything
author: ronan
tags:
  - process
  - Github
hn: 6404847
redirect_from:
  - /posts/2013/09/18/github-for-everything.html
preview: /images/posts/wiki.png
---

We're huge fans of Github at Wiredcraft. We started using it in 2009 and haven't looked back. While it initially mostly replaced our code tracking tool (I believe we were then using Redmine), it now is the single most important platform for our team to collaborate, on all levels, from code to HR.

<!--more-->

## How did we get there?

We went through using a few tools over the years; Basecamp, Open Atrium or more recently [Trello](https://trello.com/) for threaded discussions, Redmine for issue tracking, IRC or Campfire for chats, Wikis, Hackpad and files, in Dropbox or Git, for documentation...

It became painfully obvious over time that we were spreading ourselves thin. I wrote about [the increasing surface of friction](http://devo.ps/blog/2013/06/20/automation-and-friction.html) that the adoption of the SaaS model has introduced. Our needs changed over the years and we faced a few key junctions when we had to adopt a new tool.

This meant convincing the entire team to adopt a new workflow; not something particularly easy to do with a team of technologists mostly focused on shipping stuff.

## One platform to rule them all

First, let me illustrate how our current approach is actually impacting our communication.

Juha joined our team two months ago. He's been involved in some of the most passionately debated issues we're working on, getting his hands dirty with Vagrant, Docker, Python, Ansible and [some of the more esoteric things we're doing on devo.ps](http://devo.ps/blog/2013/09/11/zookeeper-vs-doozer-vs-etcd.html). **In these 2 months, he received a total of 15 emails**.

What we're effectively doing is driving most of our collaboration through Github:

- **Our internal wiki**, associated to the code of [our company site](http://wiredcraft.com) (a Github page by the way) is filled with awesomeness. From the "Getting started" page that walks new employees through our tools and processes, to the tutorials on "Writing issues, comments and milestones", we've captured most of the valuable lessons we've learnt along the way.

    ![Wiki](http://wiredcraft.com/images/posts/wiki.png)

- **Our recruitment process** is entirely done through the issue queue. Whenever we receive a new application by email, we create an issue on Github and let one of our managers grab it.

- **Day-to-day operations**, from buying new snacks for the office to dealing with HR or logistical issues. Need a new SSD for your Macbook? Create an issue on Github. Want to get sponsored to attend a conference in Beijing? Same deal.

    ![Wiki](http://wiredcraft.com/images/posts/issues.png)

- **Marketing efforts** are discussed and led through the Github issue. This very post was discussed, planned and wrote on Github.

- And a lot more...

This actually had a couple interesting effects on the team:

- **We've significantly increased participation**. Our staff (engineers, designers et al) are already working on Github. There's virtually no friction when engaging them on discussions not related to their day-to-day responsibilities.
- **We've drastically raised transparency**. Everything is done on Github, available for all to see and comment on. Processes like employee termination or tax payment are in the Wiki, for every new staff to check (and even collaborate to).

By the way, [Wikis on Github are full-blown Git repositories](https://github.com/blog/699-making-github-more-open-git-backed-wikis).

## Epilogue

There are still a couple things that we're not tracking in there obviously. We use  a [3rd party solution for our CRM](https://app.futuresimple.com) and are sharing a lot of administrative and legal documents through Dropbox. We've also started using [Huboard](http://huboard.com) in some cases, bringing a more Kanban-like (some may say Trello-like) approach to managing our tasks, and, as we've written before, [we heavily automate things](http://devo.ps/blog/2013/06/20/automation-and-friction.html) through [Hubot](http://hubot.github.com).

**But Github is where we go for everything we produce (content, design, code), discuss (issues, announcements) and document (guides, processes, documentation).**
