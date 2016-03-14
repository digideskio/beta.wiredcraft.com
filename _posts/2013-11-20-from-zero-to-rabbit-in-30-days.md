---
title: From Zero to Rabbit in 30 Days
tags:
  - Backend
  - RabbitMQ
  - ZeroMQ
author: juha
hn: 6767710
redirect_from:
  - /posts/2013/11/20/from-zero-to-rabbit-in-30-days.html
preview: /images/posts/zeromq.png
---

Over a month ago, we re-organized the architecture of [devo.ps](http://devo.ps), a rather complex piece of software, around [ZeroMQ](http://zeromq.org/) to handle communication between a growing number of subsystems. For those of you who are not familiar with ZeroMQ, it is a messaging library originally written in C++. They have a great [user guide](http://zguide.zeromq.org/) (probably the best I've seen!) with code examples in [26 languages](https://github.com/imatix/zguide/tree/master/examples/). ZeroMQ offers a set of communication methods: Push-Pull, Pub-Sub and Req-Rep. Each method has its own message handling rules. You can use it over TCP to communicate across networks, or you can use its inproc-sockets to do inter-process (or even inter-thread) communication. To quote the ZeroMQ team directly "ZeroMQ looks like an embeddable networking library but acts like a concurrency framework."

<!--more-->

<p align='center'><img alt='ZeroMQ' src='http://wiredcraft.com/images/posts/zeromq.png'/></p>

## The honeymoon begins

ZeroMQ offers a nice set of features to communicate across components. We were using multiple languages (mainly JavaScript and Python), so ZeroMQ seemed promising as it supports multiple languages. It took some time to figure out how to use it in our system, but we soon had a system that was good enough to roll with. We implemented a ZeroMQ bus (using Node.js) to be the message broker in the middle of our architecture linking other components. We used request-reply messaging to do the RPC-style messaging and for less important messaging we chose to go with pub-sub approach.

## Taking a step back

This is when we started wondering if there was something better out there. After the first version was out we started caring about the less common scenarios: what if node X goes down or what if process Y gets stuck. ZeroMQ does handle network problems well by transparently buffering messages and attempting to reconnect. But the application-level logic was restricted by how ZeroMQ's Req-Rep works. Especially after we started thinking of how to handle heartbeat properly. It does a lot of things behind the scenes for the developer, but a bit too much for our taste. For example it mostly relies on buffering and retrying message delivery automatically, which is not always the desired behavior. Rethinking our messaging protocol we could have improved our usage by adapting something close to their [Majordomo Pattern](http://zguide.zeromq.org/page:all#Service-Oriented-Reliable-Queuing-Majordomo-Pattern) but this is when we took a closer look at [RabbitMQ](http://www.rabbitmq.com/).

<p align='center'><img alt='RabbitMQ' src='http://wiredcraft.com/images/posts/rabbitmq.png'/></p>

RabbitMQ is an AMQP compatible message broker implemented in Erlang. It is a reliable and proven technology that we wouldn't have to worry about. RabbitMQ seemed very good in that regard so we checked if its features were matching our needs:

- Language support for JavaScript and Python
- Push as well as Request-Reply (or RPC) style messaging
- Message routing based on topic
- Reliability (no lost messages when processes crash)
- Persistency of queues
- Fast enough

RabbitMQ provided all of these features out of the box; its way of handling RPC was a bit unique (check [their tutorial](http://www.rabbitmq.com/tutorials/tutorial-six-python.html) to find out), but it still seemed doable. With [devo.ps](http://devo.ps/) we value reliability and monitoring of our systems so that part of the feature list was a huge plus. The proven speed and scalability of the broker also means it would not become a bottleneck in our system ([even at 800,000 messages/minute]( http://blog.gopivotal.com/case-studies-2/800000-messagesminute-how-nokias-here-uses-rabbitmq-to-make-real-time-traffic-maps)).

## Moving forward for the better

After reviewing both ZeroMQ and RabbitMQ we decided to re-implement our messaging strategy with RabbitMQ. The switch from ZeroMQ to RabbitMQ went relatively smoothly. Now the messaging part of the system feels much more reliable. Using RabbitMQ for messaging allows us to dedicate more time to developing higher level application logic.

Looking back we now have a good understanding of what ZeroMQ and RabbitMQ are good for. I'm glad we were open minded enough to recognize a better tool in RabbitMQ and adopt it. I would still be happy to use ZeroMQ in future projects, but for our system its approach was too low level.

## The big idea

A high level comparison of the strengths of each of the technologies:

**ZeroMQ**:

 - Is a communication protocol (think of one big level up from TCP)
 - Easy to get started with
 - Does not have/require a server
 - Works well for interprocess communication too (not just network messaging)
 - Lower level in general (allows more freedom, but also more effort)
 - Good documentation

**RabbitMQ**:

 - Is a messaging router that uses AMQP protocol
 - Offers reliable messaging protocol
 - Good reliability
 - Tools to monitor the router
 - Flexible enough or most messaging needs
 - Fast and possibility to scale
 - Standard AMQP, which means good language support
