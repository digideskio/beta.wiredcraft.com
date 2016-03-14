---
title: How to get a Job (the bot way)
author: benjamin
tags:
  - recruitment
  - job
  - startups
preview: /images/posts/benderv-bot.png
---

![image frustrated](http://wiredcraft.com/images/posts/benderv-bot.png)

Last semester, I began searching for an internship in a startup. I made almost every mistake possible but in the end, I think I did pretty well! [(hint)](http://wiredcraft.com/about/) I wasted time searching for startups in search engines and created countless accounts on different job platforms: **you know the struggle!**. Spending hours trying to get your search criteria working, only to receive lists full of unsuitable positions.

<!--more-->

## How I started

It was my first real attempt looking for a "Grown Up" job. I was totally lost. Where to begin? I had no idea. Procrastinate? Cry in a corner? No! Progress must be made. I created a list of startups I was already familiar with. I went to their websites and applied for the vacant positions. Great, right? No! It was slow, painful and inefficient. Repetitively filling in fields, spending an hour (or more) on each application. After filling in application after application and not receiving any real leads, I knew it was time to try a different approach.

Realizing my knowledge of startups abroad was limited, I moved to utilizing search engines for positions in startups. Although I was able to find more positions to apply for, I encountered the same problems as before. *Repetition, boredom, and frustration.*


## The Platform Problem

Desperation started to kick in. Trouble sleeping. Increased alcohol consumption. Panic. This is when I turned to job platforms. Quickly learning that:

**Job Platforms Suck.** Trust me. I tried them all.

For one, there are way too many of them. You end up creating hundreds of accounts and waste so much time re-entering information every time. It's really @$#%$! boring. Once your account is 100%  complete (10 minutes wasted uploading resumes that you only have to rewrite in their system) you have to enter criteria for the position. Often returning positions that don't actually meet your criteria, or you don't meet their criteria. If you are lucky enough to have suitable matches then you have to spend time researching and struggling to create perfect personalized cover letters for each one. You can wait for a startup to find your profile, but the chances are that these startups are not the best or simply not the best for you.

So, **you** spend a huge amount of your time and it often produces only frustration and false hope.



## Reverse Engineering

After wasting so much time my inner engineer began to think, "Let's reverse engineer this." I took the entire job database of AngelList (a platform specifically for startups, one of the few platforms I recommend) and I ran an algorithm to select the startups that matched my criteria, and that I matched theirs. At first, I wanted to run a machine learning algorithm to predict jobs that would fit me. However, not wanting to over-engineer things too much, I started with a simple function that checked some criteria (ie: "python"+"san francisco"+"data"+"intern") and printed out the job description, asking for my interest.

## The Mail Template

So, at this point, I had a list of lots of startups that had interesting positions. Now, I just needed to automate the way to reach the startups. I wrote a script to generate a custom email based on a template. This way, I was able to automatically send a semi-personalized email to every startup that I had collected. Resulting in startups feeling that they received a personalized and unique email.


![Image of Email Template](http://wiredcraft.com/images/posts/benderv-email-template.png)
<sub>Sample Email Template: I changed the bullet points and the name of the company to suit the position</sub>

## The Result

 I contacted approximately 50 startups (I stopped there to make sure I would be able to answer all of them), and nearly half of them replied to me. This was, by far, the most responses I ever got out of all the different ways I tried to get a job! **Plus:** It gave me direct personal contacts with people working in awesome places.


![Image of Emails Received](http://wiredcraft.com/images/posts/benderv-email-list.png)

## Why it worked?

### 1. Reciprocity Principle

You don't want to spend more time for a startup than a startup will spend for you. In case you don't know, recruiters spend around one minute per resume. So, you want to spend as much as one minute per startup. Sounds crazy, right ? But, if you have a solid resume and optimize the process this is possible!

### 2. Avoid platforms at all cost.

Job platforms suck*. There are way too many of them. The biggest are painful to use, the best have only a few jobs on them. You have to re-enter all your information every time and manage multiple accounts. It takes a long time and it's fucking boring. Simply use email, instead.

### 3. Automate and Personalize

To get the Reciprocity Principle right you will need some automation. That's why mail and template are a great mix. You don't need to write a script like I did, but you should focus on having the best introduction mail you can, and just adapting a bit the content for the startup that you apply to. Also, use startups platform (like AngelList) instead of search engine.

### 4. Results
From the 50 companies I contacted using this method I received responses from half! Optimizing helped me receive more responses and waste less time. People are more likely to respond if your emails look like you spent time and personalized them.  

![image hired](http://wiredcraft.com/images/posts/benderv-bot-hired.png)

Good Luck!

Let us know if you have found a job the bot way? [Tweet.](https://twitter.com/wiredcraft)

\* I like AngelList, but it's more a startup specific platform than a regular catch-all job platform.
