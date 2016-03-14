---
title: How to build a both parallel and sequential job queue
author: Xavier
tags:
  - Redis
  - Kue

date: 2016-01-25
---

## Preface
[Wiredcraft](https://wiredcraft.com/) is currently helping Starbucks China to rebuild a wide range of systems including mobile applications, backend services and also admin services,
as I'm working on the admin service for the call center, there're some like of transaction processings need to be implemented with [Node.js](https://nodejs.org/en/) platform.
 
## Requirements & Challenges

* The admin service receives the request from call center and initializes a workflow(A.k.a overlord job), and it can be handled in parallel.
* The overlord job is consist of several sub steps (A.k.a minion job) which must be executed sequentially, and each of them should be handled if and only if the previous one succeeds.
* The minion job can do retry/back-off/timeout if needed. 
* The workflow should be atomic(i.e it's not allowed that only parts of minion jobs succeed) and durable(jobs shouldn't be lost even if the program crashed)

If you come from traditional relation DB world, you might ask isn't it just one of [DB transaction](https://en.wikipedia.org/wiki/Database_transaction) solution, my answer is both yes and no. Yes for both need atomicity and durablity, no for the following reasons: 

1. We are in [Node.js](https://nodejs.org/en/) ecosystem and have no intention to use old school relation DB.
2. The minion steps are not based on CURD operations with DB but on some http API callings.

Also if you are familiar with asynchrous JavaScript and concurrency processing, you might think the [async](https://github.com/caolan/async) would be a good choice. That's also what I thought at first, after all the requirements above are all kinds of control of workflows, and `async` module indeed has `parallel`, `sereis` and has [retry](https://github.com/caolan/async#retry) feature as well, but because `async`'s a in-process utility module which is lacking durablitiy we cann't rely on it if node process exits unexpectally. 
After a bit reseach I had finally found a more suitable solution with [Kue](https://github.com/Automattic/kue).

## What's kue and why use it?

[Kue](https://github.com/Automattic/kue) is a job queue backed by [redis](http://redis.io/) and built for Node.js. It's simple and also has a clean UI for viewing and managing queue, but most important for us is that with it it's quite easy to set up the retry/back-off/timeout mechanisms for minion jobs, I will elaborate as follows:
### Create job
Creating job with a job type and custom-made data, the data will be retrieved by the worker when processing the job.
```js
const queue = require('kue').createQueue()
const jobType = 'ipsum'
let job = queue.create(jobType, { jobData: 'lorem' })
  .save(err => {
    //...
    })
```

### Retry
By default the job fails with only one attempt, say if you want to retry 3 times, just set the `attmempts`, it cann't be more easy!
```js
queue.create(jobType, { jobData: 'lorem' }).attempts(3).save()
```

### Fail Backoff
As mentioned above, our minion job completes if the calling of upstream http API succeeds, there may be some connection issues for network lantency or something else,
we have already been with a retry strategy but sometimes the network may not recover in a short time, it's great to delay the attemps upon failure(A.k.a backoff), you can use `backoff` methond as follows,
```js
job.attempts(3).backoff( { delay: 60*1000, type: 'fixed' }).save()
```
or you can even use exponential backoff.
```js
job.attempts(3).backoff( { type: 'exponential' }).save()

```
### Timeout
Normallly we don't want to let the job stuck for a long time, if the job isn't finished within a specified time, we mark it as failure and trigger the retry mechanism by setting up a job ttl.
```js
job.ttl(miliseconds).save()

```

## How to make overlord jobs run in parallel
Firstly all overlord jobs share one kue type for they are handled in a consistent way. Adding a worker handler for `overlord` jobs as follows:
```js
queue.process('overlord', (job, done) => {
  handle(job.data, done);
});
```
By default the kue only process one job at a time, for our case let's say we need maximum number of 5 jobs running in parallel, what's needed to do is just setting the concurrency number.
```
queue.process('overlord', 5, (job, done) => {
  handle(job.data, done);
});
```

## How to make minion jobs run sequentially
It might be a bit difficult to control minion jobs, because although it's well known as a priority job queue, kue itself doesn't support to stop the worker(processor), and it always continues to process the left jobs even if previous job failed. For example, here you put 3 jobs into queue as the minion steps and hope it would stop after job A failed, however it doesn't work as you expected. 
```
//expected
Job A (failed)-> Job B (not executed) -> Job C (not executed)
```
```
//actuall
Job A (failed)-> Job B (executed) -> Job C (executed)
```
So what I have done is instead of creating all minion jobs initially, I dynamically create the next job only if the previous one succeeds. It's not too complicated as kue has exhausitive events for every job. Here I use the [complete](https://github.com/Automattic/kue/tree/master/examples#job-events) event for next job creation.
```
create Job A -> Job A completed successfully -> create Job B -> Job B completed successfully -> ...
```

## Some other considerations

### Isolation of overlord job
For every overlord job there're a bunch of corresponding minion jobs, they are in one queue(why? refer to [here](https://github.com/Automattic/kue/tree/master/examples#processing-jobs)), and it's apt to mess up with different jobs. I create a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier) as the type and assign a worker for every type, in this way they will not interfere with each other.

### Durablity & Atomicity
What if the program(process) crashed? or the server down due to power off? As a robust solution we should take the catastrophic event into account, here we apply durablity in the following 2 ways.

* Job persistence

  * Kue is backed by redis which is known as fast and efficient datastore but by default it wipes off all of data if the redis instance restarts, it's unacceptable for our case, after an investigation I had found there is a `append only file` storage mode can be optionally configured to enable the persistence. You can refer to the details [here](http://redis.io/topics/persistence).

* Job recovery

  * Besides enabled the redis presistence feature, I also dumped all the jobs into a sepereate redis DB in case of some jobs fail. Everytime when the service restarts it will find all the previous failed jobs and resume to execute them. In this way it also maximizes the atomicity of workflow.

## Next step
That's how I implemented a job queue with both parallel and sequential processing feature, as you know anything relates concurrent programming is not so easy there are many intricate problems and pitfalls even I stand upon the shoulder of kue and redis, for the job queue there're still pretty much to improve. One of those things may be worthy of mention is that there's yet another `Redis as a job queue` implementation in the community called [disque](https://github.com/antirez/disque) and in a near future I would have a investigaion to figure out whether is't a good substitution of Kue. We will see. 

