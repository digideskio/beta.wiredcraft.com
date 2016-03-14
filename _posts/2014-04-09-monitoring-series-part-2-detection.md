---
title: Monitoring Series part 2 - Detection and Alerting
tags:
  - monitoring
  - alerts
  - servers
author: vincent
redirect_from:
  - /posts/2014/04/09/monitoring-series-part-2-detection.html
preview: /images/posts/monitoring_series_part2_detection.png
---

<p align='center'><img alt='monitoring detection' src='http://wiredcraft.com/images/posts/monitoring_series_part2_detection.png'/></p>

Following up on the previous post of our [Monitoring Serie](/posts/2014/04/01/monitoring-series-part-1-requirements.html), we want to address the issue of detection and alerting.

<!--more-->

Many (any) things can go wrong, from the the application level down to the system and even hardware level. While everything is worthy of consideration (to some degree), not all events and issues must be treated as equal.

We obviously are opinionated in this post, the issue at stake is the detection of problems in our systems. Monitoring solution should offer much more than just error detection. It can eventually be used to gather any metrics that would be valuable from a business stand-point. Such business logic is not addressed here and while it could be done in-house, it is worth considering third party providers that are experts in the area such as [MixPanel](http://mixpanel.com) or [KissMetrics](https://www.kissmetrics.com/).

Let's cut to the chase and talk about error detection and alerting logic.

## Hard vs. Soft errors

Classifying errors is hard but essential, one way to do that is to separate them to soft and hard errors. Hard errors may need to trigger a notification on the spot while soft errors may require some buffering and multiple checks first.

Error classification:

- __soft errors__ (e.g. unreachability, timeout), those errors do not necessarily tell that the service is interrupted, but that from a monitoring stand point we are "seeing" an issue. Such error is harder to diagnose and often requires further investigation before triggering notification. They can be caused by anything from a congested network, to a temporarily on-going maintenance, or simply a busy box (maybe even your monitoring box is at fault in fact!). Common ways to check on soft errors are:
  - to execute checks from various geographical locations (exclude network issue),
  - to correlate metrics with one another (e.g. _50X page_ + high load average),
  - to evaluate trends (e.g. recurrent operation at a certain time).

- __hard errors__ (e.g. service is down, no more disk space), they depict definitive errors that can not be misinterpreted. We can be sure that the issue being reported is depicting a fact that describe the current state of the monitored host or service.


It is to be noted that the classification of the error is in no way related to the criticality of that error. It is to the threshold component to define whether this is meaningful and should be reported.

## Data gathering

Many projects and products are specializing in capturing data:

- "standalone" systems like [collectd](http://collectd.org/), [munin](http://munin-monitoring.org), [statsd](https://github.com/etsy/statsd/)
- more architecturally complex systems involving client / server approach like [zabbix](http://www.zabbix.com/), [nagios](http://www.nagios.org/),
- third party services like [datadog](https://www.datadoghq.com/), [newrelic](http://newrelic.com/), [copperegg](http://copperegg.com), etc.

There is no best solution from what we've experienced, each have pros and cons but it is worth considering the following when choosing your monitoring system:

- __the setup phase__: will the integration of that monitoring solution be a week worth of work, or as simple as installing a client that "auto" registers to a central server?
- __technology support__: many projects wish to support as many technologies as possible but obviously there are trade-offs. The 80/20 often applies and some of your technologies may not be supported out of the box.
- __community plugins__: this is where the beauty of open-source is at its best. Your technology is not supported yet? Then contribute back and extend the collection - collectd, munin, nagios are pretty nice for that.
- __ease of use__: how much tweaking do you need for the monitoring to be relevant to your setup? How much work to get the UI (if any) tuned up to let you aggregate your data in an efficient manner?
- __third party integration__: can you integrate the system with third party services (e.g. [PagerDuty](http://www.pagerduty.com/) for escalation management, [Twilio](http://twilio.com) for the notification, [hackpad](https://hackpad.com) for some documentation, [graphite](http://graphite.wikidot.com/) for advanced graphing).

Some of the monitoring products are all-in-one solutions and on top of the data gathering provide also proper management interfaces, alert / notifications, escalation, but their tuning can become quite difficult in-between non-expert hands.

## Thresholds and alerts

Based on the captured metrics, one needs to be able to set various thresholds, types of alerts and priorities, sometimes even cross-metrics thresholds are needed for a state of the art monitoring.

Some of the projects mentioned above provide "easy" to set-up triggers, some are more complex, some simply do no support alerting and thresholds and you need to integrate with other tools like [cabot](http://cabotapp.com/), [graphite](http://graphite.wikidot.com/), etc.

## Notifications

As for the notification part, several blog posts already provide a nice landscape of best practices (I can't find them - sorry - but happy to add them if a fellow reader suggests a few links).

What to do and when to do it is at stake here; you do not want your monitoring system to call relentlessly a duty engineer at 3am when an issue is not critical and can be fixed the next morning. The response must be proportionate to the criticality of the alerts.

Communication channels can range from a simple email, to an IM notification, to SMS / phone calls, to ... you name it (a boat horn in the office?).

Escalation is also an important feature, as is acknolegement of issues. PagerDuty previously mentioned is good at defining such workflow. You may not want to keep on receiving a twilio SMS every 2min when you are already working on the issue.

To summarize, a good monitoring system should be able to:

- be extendable to support your technologies
- capture metrics in a scalable manner
- let you customize thresholds and rank your alerts
- notify / escalate alerts to your peers

See you soon for the next post!
