---
published: false
title: How to build a job queue that's parallel and sequential
author: Xavier
tags:
  - Redis
  - Kue
  - Job queues
  - Workflows
excerpt: "Using Kue from Redis, we're building parallel and sequential job queues that are durable and atomic for Starbucks's backend admin."
preview: http://wiredcraft.com/images/post/Redis-Kue.png
---

![Redis Kue makes building parallel and sequential job queues a cinch](http://wiredcraft.com/images/posts/Redis-Kue.png)

[Wiredcraft](https://wiredcraft.com/) is currently helping Starbucks China rebuild a wide range of systems, including mobile apps, backend services, and admin functions. I'm working on the admin service for the call center, so I found I needed some sort of transaction processes to be implemented with a [Node.js](https://nodejs.org/en/) platform.
 
## Requirements & Challenges

- The admin service receives the request from the call center and initializes a workflow (aka, an overlord job) and it can be handled in parallel.
- The overlord job consists of several sub-steps (aka, minion jobs) which must be executed sequentially and each of them should be handled if and only if the previous one succeeds.
- The minion jobs can retry/back-off/timeout if needed.
- The workflow should be atomic (i.e it's not allowed if only parts of the minion jobs succeed) and durable (jobs shouldn't be lost even if the program crashed)

If you come from the traditional relation DB world, you might ask if this is just another [DB transaction](https://en.wikipedia.org/wiki/Database_transaction) solution. The answer is both yes and no. Yes, for the sake of atomicity and durability, but also no, for these reasons: 

We're in a [Node.js](https://nodejs.org/en/) ecosystem and have no intention of using old school relation DB.
The minion steps are not based on CURD operations with DB, but on some http API callings.

Also, if you're familiar with JavaScript's asynchronous and concurrent processing, you might think that [async](https://github.com/caolan/async) would be a good choice. I thought that at first. After all, the requirements above are all kinds of workflow controls, and the `async` module indeed has `parallel`, `series` and has a [retry](https://github.com/caolan/async#retry) feature as well, but because `async` is an in-process utility module, which lacks durability, we can't rely on it if the Node process exits unexpectedly. After a bit of reseach, I had finally found a more suitable solution with [Kue](https://github.com/Automattic/kue).

## What's Kue and why use it?

[Kue](https://github.com/Automattic/kue) is a job queue backed by [Redis](http://redis.io/) and built for Node.js. It's simple and has a clean UI for viewing and managing queues, but what's most important for us is that it's super easy to set up the retry/back-off/timeout mechanisms for minion jobs. I'll elaborate:

### Create job

Creating a job with a job type and custom-made data, the data will be retrieved by the worker when processing the job.

````js
const queue = require('kue').createQueue()
const jobType = 'ipsum'
let job = queue.create(jobType, { jobData: 'lorem' })
  .save(err => {
    //...
    })
````

### Retry

By default, the job fails with only one attempt, but if you want to retry, say, 3 times, just set the `attempts`. It couldn't be easier!

````js
queue.create(jobType, { jobData: 'lorem' }).attempts(3).save()
````

### Fail Backoff

As mentioned above, our minion job completes if the calling of upstream http API succeeds. If there are some connection issues for network latency or something else as bad, the network may not recover in time, so it may be best to delay the attempts upon failure (aka, backoff) instead of continuing to retry. You can use `backoff` method as follows:

````js
job.attempts(3).backoff( { delay: 60*1000, type: 'fixed' }).save()
````

Or you can even use exponential backoff:

````js
job.attempts(3).backoff( { type: 'exponential' }).save()
````

### Timeout

Normally, we don't want to let the job sit for very long. If the job isn't finished within a specified time, we mark it as failure and trigger the retry mechanism by setting up a job ttl:

```js
job.ttl(miliseconds).save()
````

## How to make overlord jobs run in parallel

First, all overlord jobs share one Kue type for they are handled in a consistent way. You can add a worker handler for `overlord` jobs as follows:

```js
queue.process('overlord', (job, done) => {
  handle(job.data, done);
});
````

By default, the Kue only processes one job at a time. For our case, let's say we need a maximum of 5 jobs running in parallel. What we need to do is set the concurrency number.

````
queue.process('overlord', 5, (job, done) => {
  handle(job.data, done);
});
````

## How to make minion jobs run sequentially

It might be a bit difficult to control minion jobs. Even though it's well known as a priority job queue, Kue itself doesn't offer support to stop the worker(processor), and it always continues to process the leftover jobs even if the previous job failed. For example, here you put 3 jobs into queue as the minion steps and hope it would stop after job A failed, but it doesn't work as you expected: 

````
//expected
Job A (failed)-> Job B (not executed) -> Job C (not executed)
````
````
//actual
Job A (failed)-> Job B (executed) -> Job C (executed)
````

So instead of creating all minion jobs initially, I dynamically created the next job only if the previous one succeeds. It's not too complicated as Kue has exhaustive events for every job. Here I use the [complete](https://github.com/Automattic/kue/tree/master/examples#job-events) event for next job creation.

````
create Job A -> Job A completed successfully -> create Job B -> Job B completed successfully -> ...
````

## Some other considerations

### Isolation of overlord job

For every overlord job, there are a bunch of corresponding minion jobs. They're all in one queue (why? refer [here](https://github.com/Automattic/kue/tree/master/examples#processing-jobs)) and it's apt to mess up with different jobs. I created a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) as the type and assigned a worker for every type. This way, they'll never interfere with each other.

### Durability & Atomicity

What if the program/process crashes or the server goes down due to losing power? As a robust solution, we should take the catastrophic event into account. Here we apply durability in the following 2 ways:

**Job persistence**

- Kue is backed by Redis which is known as a fast and efficient datastore, but, by default, it wipes off all data if the Redis instance restarts. That's unacceptable for our case. After an investigation, I found an `append only file` storage mode can be optionally configured to enable the persistence. You can refer to the details [here](http://redis.io/topics/persistence).

**Job recovery**

- Besides enabling the Redis persistence feature, I also dumped all the jobs into a separate Redis DB in case some of the jobs fail. Every time the service restarts, it will find all the previous failed jobs and execute them. Doing this, we also maximize the atomicity of the workflow.

## Next step

That's how I implemented a job queue with both parallel and sequential processing features. As you know, anything related to concurrent programming is not especially easy. There are many intricate problems and pitfalls, even when I stand on the shoulders of Kue and Redis. For the job queue, there're still much to improve. Something worthy of mention is that there's yet another `Redis as a job queue` implementation in this great community called [Disque](https://github.com/antirez/disque) and in the near future, I will investigate whether or not it's a good substitute of Kue. Only time will tell. 

Curious about parallel and sequential processes? See how we automate everything possible [on Twitter](twitter.com/wiredcraft) or [shoot us an email](mailto:info@wiredcraft.com) and be our friend!
