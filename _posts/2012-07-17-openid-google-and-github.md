---
title: OpenID with Google and GitHub
author: vincent
tags:
  - Tools
redirect_from:
  - /posts/2012/07/17/openid-google-and-github.html
---

I doubt I need to explain what [OpenID](http://en.wikipedia.org/wiki/OpenID), the decentralized authentication standard, is. You may actually use it without knowing it as [quite a few companies are indeed OpenID providers](http://openid.net/get-an-openid/). [We](http://wiredcraft.com) find it especially handy for providing admin credentials to our staff when we build products, and doing so without having to specify user passwords in clear in our code base.

<!--more-->

We had been using [MyOpenID](https://www.myopenid.com/) for a while; it allowed us to manage accounts for our staff in a centralized fashion. Unfortunately, the service proved to be unreliable and we could not get support from its owners. None of the other providers seemed to allow us to manage multiple accounts for our domain name, so we settled for setting up our own OpenID service. We are pretty averse to maintaining services on our own; we happily delegate to Github, Dropbox, Linode, HelloFax and the likes. Our solution had to be easy to maintain, and if possible running on servers we’re not responsible for.

The approach we took, and that I will describe below, leverages Google as the OpenID provider and Github to redirect our company URLs.

## Enabling OpenID on your Google account

Whether you have a personal or professional GMail account, you should be able to activate OpenID for your Google account. It is fairly straightforward, however you will be required to enable Google+ to do so:

1.  **Enable Google+** for your email account,
2.  In your web mail interface, click on **privacy** on the top right,
    ![OpenID screenshot](http://wiredcraft.com/images/posts/privacy_openid-1.jpg)
3.  Get the long number in the following format: `https://plus.google.com/A\_VERY\_LONG\_NUMBER` - the very long number is your profile ID,

However, the OpenID provided by Google is not really convenient; I happen to address my colleagues with their surname, rarely with their Google+ serial number. Google’s alias [http://google.com/profiles/me](http://google.com/profiles/me) ain’t exactly what we call unique and not really suitable as an OpenID URL on any website. That’s when Github comes in handy, allowing us to alias URLs like `https://plus.google.com/A\_VERY\_LONG\_NUMBER` into `http://openid.wiredcraft.com/bob`.

## Set up Github

We already host quite a few sites on [GitHub](http://github.com), leveraging the awesome [Github pages](http://pages.github.com/) feature. We here just want to redirect our custom URLs to the appropriate Google+ accounts;

1.  Create a new github repository (public or not, as long as you’re fine with exposing your list of users),
2.  Create a new branch `gh-pages` and switch to it,
3.  Create a file called `CNAME`, simply put the domain name you want to use to access the site (in our case: `openid.wiredcraft.com`)
4.  For each user, you will need to create a file to handle the redirection to his Google+ account, for example `bob.html` with the following content;

        <html>
          <head>
            <link rel="openid2.provider" href="https://www.google.com/accounts/o8/ud?source=profiles">
            <link rel="openid2.local_id" href="https://profiles.google.com/GOOGLE+_PROFILE_ID">
          </head>
        </html>

5.  Commit and push to Github,
6.  [Update your DNS with an entry pointing the domain name you defined in the “CNAME” file to Github](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

You can now use your OpenID with your own domain name; in the previous example it would be something like `http://openid.wiredcraft.com/bob`. You obviously need to be logged in your Google account for things to work.

You can have a look at our [company repository](https://github.com/Wiredcraft/openid/blob/gh-pages) if you’re wondering how this might look like.
