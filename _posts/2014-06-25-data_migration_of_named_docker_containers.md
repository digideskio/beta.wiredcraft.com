---
title: Data migration of named Docker's containers
author: vincent
tags:
  - Docker
  - container
  - data
  - database
  - migration
redirect_from:
  - /posts/2014/06/25/data_migration_of_named_docker_containers.html
preview: /images/posts/containers_transfer.png
---

<p align='center'><img alt='container transfer' src='http://wiredcraft.com/images/posts/containers_transfer.png'/></p>

Docker has evolved quite a lot in the past few months, from nameless containers to named ones, from little support of persistent storage to support of mounted end-points and self-generated volumes.

<!--more-->

So what if you have a new version of your redis container? And you want to keep your data and still name it ... say ... *redis* ?

Docker comes with awesome features but also limitations that make the above a bit laborious:

- **Named containers**: containers can be named anything, or get a default name provided (amazing-einstein?). It is very convenient when you try to address them without going for a long ID. But you can't use the same name twice... And you can't rename the container either...
- **Volumes migration**: containers can be built using the volumes of another container, neat for data migration! But the "source" container needs to exist (stopped is ok - destroyed containers is ... not ok, because they aren't there anymore)

So how to keep the same name and the same data? **Use a temporary container!** That does nothing but hold your data while you kill the old container and free its name!

```
# Consider the following details for your "old" container
NAME=i_like_this_name_very_much_and_i_wanna_keep_it
IMAGE=some/image
CMD=some_command

# Pull / Update your container's image
docker pull $IMAGE

# Start a temporary container that does .. nothing
docker run -d -name temp_box -volumes-from $NAME ubuntu:latest /bin/bash

# Stop and remove the original container
docker stop $NAME
docker rm $NAME

# Start the new container with the same old name
docker run -d -name $NAME -volumes-from temp_box $IMAGE $CMD
```

We hope you enjoyed this little tip; go ahead and suggest others!
