---
title: GitHub As Your Recruitment Platform
author: ronan
tags:
  - GitHub
  - recruitment
  - startup
redirect_from:
  - /posts/2014/09/03/github-as-your-recruitment-platform.html
hn: 8262558
preview: /images/posts/recruitment-zapier.png
---

As we've said before, [we use GitHub for pretty much everything at Wiredcraft](http://wiredcraft.com/posts/2013/09/18/github-for-everything.html); we use it to build software of course, but we also use it to interact with our clients, manage office purchases and is starting to act as our CRM (more on that in a few weeks). Recruitment is actually the main reason we initiated that trend.

<!--more-->

## Why would you do that?

Over the years we used a wide range of methods to try and better organize our recruitment pipeline, from email to dedicated platforms. We tried really hard to make [Streak](http://www.streak.com) work but never felt really at ease with the overall UX and lack of cross-browser and mobile support. [Trello](http://trello.com) came the closest to satisfying our need in terms of UX but meant that we were expecting our team to split their focus between GitHub, email AND Trello.

**Ultimately, we wanted to get the whole team involved in reviewing applicants and participating in the HR discussions**. We needed our engineers to help us evaluate candidates, review job offers and decide what should be our next recruit. We also wanted to make the whole process, from rejection to salary negotiations, transparent to our colleagues.

That's when we decided to consider managing HR the same way we manage software projects; we have SCRUM, we commit changes to job descriptions and more importantly we organize everything around GitHub issues.

## How does it all work?

1. **Applicants send us an email (job@wiredcraft.com)**. We're still using email. We've tried using Web forms or platforms to try and collect the information, but it never worked out as well as simply letting people shoot us an email.

1. **On reception of the email we do 3 things** using [Zapier](http://zapier.com) (I recommend you check it out):

    ![Zapier](http://wiredcraft.com/images/posts/recruitment-zapier.png)

    1. **Borat, our awesome bot, sends a series of questions** that help us get a better understanding of who the person is, where she's from, what compensation she's looking for... The more important questions though are "What is the main reason for you to be looking for a (new) job?" and "What are you interested in learning with us?". It usually is the first thing I look at on an application; it helps us understand whether or not that person will be a fit.

        ![Borat](http://wiredcraft.com/images/posts/recruitment-email.png)

    1. **We create a GitHub issue** with the content of the application, labeled "Recruitment" and accessible to the whole team.

    1. **We push the attachments on Dropbox** since these are usually the resume. We'd like to do more here, and be able to link to this file in the GitHub issue, which we'll be able to do soon once we've added Dropbox support on [SweepBoard](http://sweepboard.com).

1. **We then use [SweepBoard](http://sweepboard.com) to review the application**. As we started to rely more and more on GitHub, we quickly realized the default issue queue on GitHub, while functional, kinda... suck. So we built [SweepBoard](http://sweepboard.com) to give us a kanban view of our repositories and help us get stuff done faster. Rejected applications go straight to the "Done" (and with upcoming changes on [SweepBoard](http://sweepboard.com), we'll be able to automate sending them a rejection email).

    ![Borat](http://wiredcraft.com/images/posts/recruitment-sweepboard.png)

1. **Casual interview**; we invite candidates we're interested to have a quick chat on HipChat/Skype/Hangout. We rarely do face to face interview right from the beginning, unless it's convenient for the applicant to pass by our office or grab a coffee over the weekend.

1. **We send actual work as GitHub issues**. We don't do quizzes, ask riddles or perform cross-technical examinations. We mostly want to see how they do on the job, may they be doing code, design or marketing. We usually simply send them a couple issues on GitHub, for a real project. It helps us evaluate how they do on getting stuff done, which isn't just about how good they are at what they do but also how they interact with our team and wether they're able to get the help they need from the team.

1. **We discuss the final offer in the GitHub issue**, using [SweepBoard](http://sweepboard.com) again. I'm usually the one sending it to them by email afterwards.

Ultimately, what we try to assess is wether candidates are passionate about what they do and are able to get sh*t done.

Moving to GitHub with a sprinkle of automation and workflow (with [Zapier](http://zapier.com) and [SweepBoard](http://sweepboard.com)) has drastically improved our HR processes; the whole team gets involved, transparently contributing to our recruitment effort, taking part in the negotiating process and helping us assess the skills of our candidates.
