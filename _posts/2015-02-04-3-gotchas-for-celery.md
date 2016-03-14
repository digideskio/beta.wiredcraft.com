---
title: 3 Gotchas For Celery
author: juha
tags:
  - Python
  - Celery
  - Ansible
redirect_from:
  - /posts/2015/02/04/3-gotchas-for-celery.html
---

Celery is our go-to task manager when working with Python. It is feature rich, stable, fast and has clean interfaces. We usually end up using it either for high volumes of short tasks or low volumes of long running ones (understand 10+ seconds, or even minutes in [devo.ps](http://devo.ps)' case).

<!--more-->

Celery's feature set is a double edged sword though; it's great once you got things set up, but getting there often means some amount of trial and errors. If you're just getting started, go read ["Celery Best Practices" by Deni Bertovic](https://denibertovic.com/posts/celery-best-practices/). Once you're done, come back here and I'll share a few more tips.

## Gotcha 1: You can't spawn processes from within Celery tasks

You can usually stick to testing (and unit testing hopefully) your tasks outside of Celery. You will however sometimes run into the following error when spawning a process from within a Celery task:

```
daemonic processes are not allowed to have children
```

We ran into this issue when trying to programmatically run [Ansible](http://ansible.com) playbooks within Celery. It was tricky to catch because it only surfaced when we upgraded to Celery 3.1.x. Turns out, any code attempting to create sub-processes using the `multiprocessing` module will fail. That can be hard to prevent or detect since you may not be aware that some of the libraries you use actually do that.

You can find [a long thread discussing this on GitHub](https://github.com/celery/celery/issues/1709). It actually worked in older Celery versions (3.0.x) because of a bug masking it. To my understanding this problem arises from unix limitation and how the underlying `billiard` module is used.

There doesn't seem to be clean solution for this one, but you can find some possible workarounds in the GitHub issue above. You can also use Celery 3.0.x or simply avoid using libraries that rely on `multiprocessing`.

## Gotcha 2: Limitations on arguments when chaining tasks

We had a chain of Celery tasks where the first one had to pass multiple parameters to the following one.  Diving into the documentation, we quickly realized it wasn't as straightforward as it appeared: by default, each task in the chain will pass (multiple) arguments to the next one as a tuple.

This leaves you two options:

Use a decorator on tasks to unpack the tuple or
stick to a single argument (possibly a more complex one, e.g a class instance or dictionary).

Our `unpack_tuple` decorator looks like this:

```
def unpack_tuple(f):
    @functools.wraps(f)
    def _wrapper(*args, **kwargs):
        if len(args) > 0 and type(args[0]) == tuple:
            args = args[0] + args[1:]
        return f(*args, **kwargs)
    return _wrapper
```

And here's how we used it:

```
chain(fetch_user.s(userid), process.s())

@task
def fetch_user(userid)
    # process
    return firstname, lastname

@task
@unwrap_tuple
def process(firstname, lastname)
    # Do processing
```

## Gotcha 3: Tasks stay queued even when there are free workers

We were running long running tasks (5+ minutes to provision new servers on EC2 & Digital Ocean), usually only one at a time. We quickly noticed that when two tasks, or more, where triggered at the same time, second one would hang until the first one completed, even when we had plenty of available workers.

This is due to the way Celery acknowledges messages from the broker; the first worker would simply reserve the first task, then acknowledge it immediately after starting it, and proceed on reserve the following one.

To deal with it, simply use the following 2 settings:

- [`ACKS_LATE=True`](http://celery.readthedocs.org/en/latest/configuration.html?highlight=acks_late#celery-acks-late): this ensures that the worker acks the task **after** it's completed. If the worker crashes, it will just restart.
- [`PREFETCH_MULTIPLIER=1`](http://celery.readthedocs.org/en/latest/configuration.html?highlight=prefetch#celeryd-prefetch-multiplier): this ensures that the worker process can reserve at most one un-acked task at a time. If this is used with `ACKS_LATE=False` (the default), the worker will reserve a task as soon as it starts processing the first one.

Beware that setting `PREFETCH_MULTIPLAYER=0` means unlimited prefetching (not disable prefetching).

Understanding how `PREFETCH_MULTIPLAYER` and `ACK_LATE` work isn't trivial, I recommend you spend some time reading the official documentation.
