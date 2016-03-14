---
title: Using Slack as a Public Chat
author: xeodou
tags:
  - Slack
  - chat
  - slackin
---

As we started organizing the [2015 JSConf China](http://2015.jsconf.cn), we wanted to set up a public chat for anybody who wanted to help out. We had in the past used HipChat both internally at Wiredcraft and as support channel for [some](http://sweepboard.com) of [our](http://devo.ps) [products](http://chato.ps).

<!--more-->

Our team switched over to Slack for internal chat a few months ago and we had been looking for an opportunity to start using it for public chat as well. Unfortunately, Slack allows you to create public organizations, but you still need to invite users individually.

Enters [slackin](http://rauchg.com/slackin/), from Guillermo Rauch (the author of [Socket.IO](http://socket.io)), which automates the process of inviting new users (among other things). It works wonderfully, so I thought I'd share how we got it set up (for free) on Heroku. Here we go:

1. [Create a (free) public Slack team](https://slack.com/), for us it was `jsconfcn.slack.com`.
2. Create an API key for this group at https://api.slack.com/web
3. The original slackin repo only supports paid account, we made submitted a PR but it hasn't been merged yet. You go to https://github.com/Wiredcraft/slackin and click on the "Deploy to Heroku" button.
4. You'll then be redirected to Heroku (create an account if needed, it's free). When deploying the app, you'll be asked for a few values:

    <p align='center'><img alt='Deploy on Heroku' src='/images/posts/slackin-heroku.png'/></p>

  - `slack_subdomain`: enter the name of your team (in our case `jsconfcn`),
  - `slack_api_token`: use the API key you generated before at  https://api.slack.com/web
  - `slack_channel` & `slack_restrict` can be left blank.
  - `badge_height`: set it to 20.

5. Once deployed, you'll have the application link (in our case https://shenjs.herokuapp.com/) and a badge (https://shenjs.herokuapp.com/badge.svg). You can drop it in your README file on GitHub with a bit of Markdown magic, for example:

    `[![Join the ShenJS chat](https://shenjs.herokuapp.com/badge.svg)](https://shenjs.herokuapp.com/)`

## Note

Slack has now restricted the invite API to paid users only. For free accounts, the API will systematically return `{error=paid_only, ok=false}` and not send any invitation email. We contacted the Slack support but haven't heard from them yet. More about this on GitHub: https://github.com/rauchg/slackin/issues/15
