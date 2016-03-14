---
title: Monitoring Series part 1 - Defining the Requirements
author: vincent
hn: 7507711
redirect_from:
  - /posts/2014/04/01/monitoring-series-part-1-requirements.html
preview: /images/posts/monitoring_series_part1_fire.png
---

<p align='center'><img alt='monitoring fire' src='http://wiredcraft.com/images/posts/monitoring_series_part1_fire.png'/></p>

For any web activity, either as a company or individual, knowing what is going on with your servers and services is essential. Failure in detecting or preventing issues can have a serious impact. It can deteriorate your reputation, break the trust users put or you and be a blow to the health of an ongoing business.

<!--more-->

We've tested a whole bunch of monitoring solutions, from full-DIY solutions to services based approaches but are still having a hard time and haven't had yet a breakthrough. We know that finding a _match'em all_ approach will be difficult with regards to the numerous type of projects and architecture we put in place for our customers and in-house projects.

During this process we recognized the core features that we expect from a monitoring system.

  - __Ease of deployment and integration__: we want a solution that we can start using in any of our projects with minimum effort. Target is to decrease the barrier to the level that it's worth the effort to set up monitoring for our shorter and smaller projects too. Low to no dependency is important, drop-in-place with little configuration is even better.
  - __Failure detection and alerting__: we want to sleep at night without worrying if our production setup is down or struggling. We want multi-channel alerts when something unusual is happening with our systems.
  - __Integration with third party systems__: we want to utilize our existing process as much as possible. This means we want our monitoring system to integrate with our messaging/reporting/ticketing tools.
  - __Historical data and data correlation__: displaying historical data and trends in the system is critical for us to be able to prevent problems before they happen.
  - __Good user interface and user experience__: we don't want to have a system that is build _by ops for the ops_. We want a UI that each of our developers can use without long learning curve. A good UI/UX is also critical when trying to predict problems before they happen (see previous point).

Monitoring is a hard issue, we will follow up with a couple extra posts that attempt to cover more in details each of the points mentioned above. Next one will dive more in depth on deployment challenges for monitoring systems.

In the mean time do not hesitate to shoot us an [email](info@wiredcraft.com) if you believe you have the ultimate solution!
