---
title: "ChatO.ps, Bot-as-a-Service"
author: ronan
tags:
  - automation
  - ChatOps
  - Hubot
  - GitHub
redirect_from:
  - /posts/2015/01/15/chatops-bot-as-a-service.html
preview: /images/posts/bots.png
---

![All My Circuits](http://wiredcraft.com/images/posts/bots.png)

*We just released [ChatO.ps](http://chato.ps), go have a look.*

[ChatOps](https://speakerdeck.com/jnewland/chatops-at-github) ([video](https://www.youtube.com/watch?v=pCVvYCjvoZI)) has been a major influence on our team to adopt a DevOps approach. If you're not familiar with the concept, it is a term coined by GitHub to describe their approach of “putting tools in the middle of the conversation”. In a nutshell, it means using the team's chat as a multi-user terminal.

<!--more-->

Want to deploy your app? Just send a message and a bot will take care of running things for you. Got a new commit in? The bot will let you know if your changes broke the build. Add to this the social dimension of using it as a bonding tool (through the countless gif and meme scripts available), and you have the perfect tool for introducing some of the fundamentals of DevOps. Anybody on the team is made aware of what's happening, and potentially encouraged to contribute, may this be code or infrastructure related.

### We love Hubot

[Hubot](https://hubot.github.com/), GitHub's very own chat bot, features hundreds of integrations. Pretty much any popular service under the sun has a script for it, and will run with most chat services (Campfire, Flowdock, HipChat, IRC, XMPP, Hall, Slack, QQ, ... even AIM). The barriers to entries to add your own custom scripts for Hubot are really low; whip out a few lines of Javscript, restart your bot and done.

You can have a lot of fun with it; we can get an air quality report coming out of a sensor outside of our office, and are working on hooking up an Arduino microcontroller to let us open our door to visitors right from our chat. We also occasionally get work done, getting build status, commit notifications and deploying apps (in between copious amounts of animated gifs).

### Enters ChatO.ps

While Hubot is pretty neat, we thought that we could make things even simpler for others to get started with it:

- A bot is lightweight enough that it doesn't necessarily require its own instance, but is something you want to keep moderately secure and stable as it sits at the center of a lot of your automation/ops.
- It can be slightly austere to configure. Documentation is more often than not fairly dry.
- Juggling with multiple bots can make things increasingly painful.

This is why we built [ChatO.ps](http://chato.ps), a simple service that lets you create and customize (Hubot) bots. You can easily browse available scripts and set things up through a straightforward interface. We actually even support custom scripts (which we use ourselves for custom integrations like the air quality sensor).

It's still very much beta, but we thought we'd put it out there and see what people think. We have a whole backlog of features we'd like to add, first of which would be the ability to add custom scripts directly through our UI (for now users must make their custom scripts available to the bot in a Git repository). We're also cleaning up the documentation of various scripts, fixing some of the older ones and thinking of ways to make the overall experience even simpler.

[Try out ChatO.ps (it's free)](http://chato.ps).
