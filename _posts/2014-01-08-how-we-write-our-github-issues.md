---
title: How We Write Github Issues
author: quentin
tags:
  - Github
  - process
hn: 7023203
redirect_from:
  - /posts/2014/01/08/how-we-write-our-github-issues.html
preview: /images/posts/how_we_write_our_github_issues_1.png
---

It is no secret that the Wiredcraft team is [hooked on Github](http://wiredcraft.com/posts/2013/09/18/github-for-everything.html). And while we definitely use a lot more than GitHub to collaborate, **the issue queue remains the single most important collaboration medium for our team**.

<!--more-->

Which means, learning how to properly write issues and comment on them is a pretty important part of the onboarding process for our new recruits.

## What is an issue?

* **Issue queues should mirror your thought process**. Issues are where you structure your ideas, with others or alone.
* **Issues should focus on ideas, problems, and solutions; they are not activity trackers**. While you want to share your ideas as they unfold, you may not want to comment every little bit of activity you register on an issue; for this, IM, commit messages or Scrum meeting may be better suited.
* **The issue queue is where real collaboration is done**. Other forms of communication (verbal discussions, email, IM...) should happen after having explored things in an issue. This ensures that everyone involved had a chance to make and review the arguments in a clean, structured, and transparent manner. The more real-time the discussion, the more likely it is to be charged with emotions.

## How to write issues (and everything else)

We usually stick to the following structure:

* **Context**: explain the conditions which led you to write this issue.

    For example: *"Since we've moved to the latest version of Express.js, we've experienced a few performance issues (#14 and #15) on production."*

* **Problem or idea**: the context should lead to something, an idea or a problem that you're facing.

    For example: *"We've had no way of easily seeing the performance impact before releasing our changes to production."*

* **Solution or next step**: this where you move forward. You can engage others (request feedback), assign somebody else to the issue, or simply leave it for further investigation, but **you absolutely need to propose a next step towards solving the issue**.

  For example: *"@bobby see with @johnny if he has a tool that could provide us insights on the performances in the development environment. We should include something similar in our development and deployment processes for future projects."*

This last point is the most important, and often most disregarded, aspect of an issue thread. This is the seed of collaboration. Omitting it seriously hinders your chances of engaging others.

It is also important to try and put down all of the relevant information you can think of when creating the issue. It enables others to take over and provides invaluable context may you get to work on it days or weeks after creating it.

<p align='center'><img alt='Bad issue' src='http://wiredcraft.com/images/posts/how_we_write_our_github_issues_1.png'/></p>

***A bad issue****: too much in the title, no context, actionable or relevant people notified.*

<p align='center'><img alt='Good issue' src='http://wiredcraft.com/images/posts/how_we_write_our_github_issues_2.png'/></p>

***A good issue****: simple title, context, actionable and relevant people are included.*

## A few more things

* **Keep titles short and descriptive**. People's attention is hard to capture, even your colleagues. The title is the most visible part of your issue, you want it short and to the point. "Refactoring the plugins structure to take into account changes in the Express.js library" is not a title, it's almost the issue message itself. "Plugins structure refactoring" is enough.
* **Remain clear and concise**. Keep your messages as short and to the point as possible. Bullet points are often a great way of quickly structuring complex ideas or solutions.
* **Include the right people in your discussion**. Who are the most relevant people to help resolve a particular issue? While you can assign the issue to the most suited colleague, mentioning people in the issue is also a great way of soliciting feedback (we see a lot of `/cc @bob @john` in our issues).
* **Format your messages**. Help the reader focus on what matters and understand the structure of your message. [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown) has a simple but effective syntax: make use of bold text, lists, check-boxes, syntax highlighting, headers, lists, links and images.
* **Add links to you references**. It's a no-brainer.

## Is it that simple?

We feel very strongly about these guidelines; they may seem overkill at times but sticking to it in a systematic manner has helped us improve drastically the quality of our collaborations, may this be to organize a business trip between members of our San Francisco and Shanghai offices or coordinating work between two engineers sitting next to each other.
