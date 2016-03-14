---
title: Improving Humanitarian Assistance
author: quentin
tags:
  - Case study
redirect_from:
  - /posts/2013/08/15/improving-humanitarian-assistance.html
---

[Internews](http://www.internews.org/) is an international non-profit organization whose mission is to empower local media worldwide to give people the news and information they need, the ability to connect, and the means to make their voices heard. Infoasaid is a consortium of Internews and the BBC World Service Trust. The objective is to improve how aid agencies communicate with disaster-affected communities.

<!--more-->

## Rethinking humanitarian communication

Infoasaid.org was previously built on Drupal 6 with a limited code structure. There was no real use of a code versioning system and a systematic development workflow was not used. One of the goals was to rebuild Infoasaid.org as a distributed system: a master instance monitoring and synchronizing with several slave instances. Each slave instance should allow for localized content and an independent editorial workflow.

Before digging into the project, a systematic development workflow needed to be put in place. We used the Settings module to migrate settings from the database to the code itself. We adopted Git version control. And we migrated all of the code to an installation profile allowing for streamlined deployment.

## Implementing a distributive contextual platform

With a systematic development environment in place and a full upgrade of the core Drupal 7 modules, we could now implement the distributed master/slave logic. We built a flexible system where the content from the Master instance was accessible via Feeds and were implemented on each Slave. Changing feeds became a simple and reliable configuration change. When content synchronizes with one of the platforms the content becomes available locally without any connection to the Internet or the Master instance. Lastly, a translation workflow was implemented to provide a simple translation of the instances and content.

## A new platform

With upgrades and enhancements applied to the platform, Infoasaid.org was now stable and had an improved user experience. By applying development best practices, including Git version control, the Infoasaid.org relaunch was a success.
