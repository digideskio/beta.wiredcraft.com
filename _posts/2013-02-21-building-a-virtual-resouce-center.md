---
title: Building a Virtual Resource Center
author: quentin
tags:
  - Case study
redirect_from:
  - /posts/2013/02/21/building-a-virtual-resouce-center.html
---

As an international non-profit organization [Internews](http://www.internews.org/)' mission is to empower local media worldwide to give people the news and information they need, the ability to connect, and the means to make their voices heard. Wiredcraft helped Internews build a Virtual Resource Center (VRC) used to further Internews' mission.

<!--more-->

## A solution to hear silent voices

Several problems arise in countries where freedom of speech is limited. One of the main problems for publishers of a content focused platform is the difficulty in notifying users of the platform as well as allowing a local and international editorial team manage the site's content. Drilling down through the content to find relevant information was also tedious. Another challenge, which is not specific to this platform, was to foster and track user engagement.

The main problem to tackle was the implementation of a notification workflow. The most straightforward way to do so would be to allow users to create profiles and notify them within the platform. After careful consideration this solution was rejected: specific users should not be tied to the platform due to its politically sensitive nature. If the user information were to be leaked, it would be disastrous for the user. To avoid such potential threats, a mail based workflow was implemented and user information was securely collected on a specific component separate from the VRC. On top of this, a content edition and management workflow was implemented providing an easy way to add, review and moderate content through a dashboard accessible to the editorial teams. To allow a finer search of the content within the platform, both from the users and the administrators, a Search API backend was integrated with a focus on faceting.

## Reaching outside of the box

After security, content management and search was implemented, it was important to increase user engagement. It was decided that the simplest and most efficient way to do so will be to integrate SNS sharing options (on Facebook, Goolgle+ and Twitter) as well as providing them with the possibility to vote on content. These user engagement aspects of the platform are tracked through analytics to provide statistics and are visualized on a dashboard.

These enhancements led to higher user engagement, improved search functionality, and improved high-level performance and engagement indicators. All of this was accomplished without gathering sensitive user data. Internews was able to provide an anonymous platform for users to get and share content reinforcing freedom of expression.
