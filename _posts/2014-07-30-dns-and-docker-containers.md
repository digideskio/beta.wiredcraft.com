---
title: DNS And Docker Containers
author: vincent
tags:
  - containers
  - Docker
  - DNS
hn: 8107574
redirect_from:
  - /posts/2014/07/30/dns-and-docker-containers.html
excerpt: "My trick to get containers to talk with each another using their names. The problem being that with Docker, containers have different IP addresses on start."
preview: /images/posts/hello_container.png
---

<p align='center'><img alt='hello container' src='http://wiredcraft.com/images/posts/hello_container.png'/></p>

Following our previous post about [container migration](https://wiredcraft.com/blog/data_migration_of_named_docker_containers/), I wanted to explain a simple trick to get containers to talk with each another using their names that we've used a few times while building [devo.ps](http://devo.ps).

<!--more-->

The problem at hand is that with [Docker](https://www.docker.com/), containers have different IP addresses on start. Even after a successful data migration or simply a restart of your container, you need to propagate that new information. For example let your app container know that the database changed IP address.

Sure, you can use [etcd](https://github.com/coreos/etcd) or related types of project, but it sometime is overkill - or you simply don't have the time or resources.

Let's go instead for the poor's man approach: simply set a DNS. We're gonna keep it simple and use  [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) on the current host since it's also used by docker for DHCP purpose.

Let's get staretd:

1. The `dnsmasq` service loads extra config files

        $ > cat /etc/dnsmasq.conf

        listen-address=0.0.0.0
        interface=lo
        interface=eth0
        interface=docker0
        resolv-file=/etc/resolv.dnsmasq.conf
        conf-dir=/opt/docker/dnsmasq.d         # <== Here !

1. We get the containers to use the dnsmasq as their resolver; usually `172.17.42.1` is the IP of your host

        $ > docker run -d -dns 172.17.42.1 -name db -h db db_image
        $ > docker run -d -dns 172.17.42.1 -name app -h app app_image

1. Whenever we change a container, we update the host config and get the DNS service updated

        $ > container='db'
        $ > new_ip=$(docker inspect $container | grep IPAddress | cut -f4 -d'"')
        $ > echo "host-record=$container,$new_ip" > /opt/docker/dnsmasq.d/0host_$container
        $ > service dnsmasq restart

Et voila! Your app can now simply refer to its database by using `db` as host in its config. Script the above in a better way to handle edge cases and you're good to go.
