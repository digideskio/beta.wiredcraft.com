---
title: How We Stopped Wasting Our Time Manually Updating Docker Images
author: vincent
tags:
  - Docker
  - Python
hn:
redirect_from:
  - /posts/2015/01/22/how-we-stopped-wasting-our-time-manually-updating-docker-images.html
excerpt: "How we use Docker as a convenient solution for updating a whole bunch of images at once, while ensuring that images are built in the correct order"
---

The folks at Wiredcraft have been increasingly fond of Docker; more and more of our work leverages it one way or another, may this be for our own products like [devo.ps](http://devo.ps) and the brand new [ChatO.ps](http://chato.ps), or some of our client work. We're actually currently building the Burmese electoral platform entirely with Docker (more about this in a future post). We thought we'd share some of the lesson learnt along the way, most of which was captured in [docker-builder](https://github.com/Wiredcraft/docker-builder) which we just released on `pypi`.

<!--more-->

## Best practices & Re-usability

We use a wide range of technologies (Python, Node.js, Golang, RabbitMQ, ElasticSearch, CouchDB, PostgreSQL, Redis, and the list goes on...). Often times, because we build complex systems, we end up using many of these at the sam time. Being able to transfer best practices for each technology from one project to another is crucial.

This directly dictate how we use containers; we make a heavy use of image dependency. For example, getting a Django app containerized will mean stacking up 4 base images; Debian, then Python, then Django and eventually our custom Django one.

## Building containers is a PITA

All of our containers are inter-dependent. When updating a base container, we want to rebuild the children containers along with it. This process is tedious, time-consuming and error prone:

- Change the Dockerfile,
- Build & tag the container image,
- Push the image to the registry,
- Remember that 5 other containers depends on that base container. Rinse and repeat...

We have yet to found a convenient solution for updating a whole bunch of images at once, while ensuring that images are built in the correct order (aka following the dependency chain).

## Our solution

This is why I came up with [docker-builder](https://pypi.python.org/pypi/docker_builder). Just install it with `pip install docker-builder`.

With it, you'll be able to declare the dependency chain between your images in [a few lines of YAML](https://github.com/Wiredcraft/docker-builder#format), and then rebuild all images with a single command. Don't worry about a thing, `docker-builder` will take care of the tedious part of the job.

This isn't rocket science, but it has already saved us a huge amount of time. Give it a shot and let us know how we can make it better. [See you in the issue queue](https://github.com/Wiredcraft/docker-builder/issues).
