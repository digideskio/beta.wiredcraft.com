---
title: Multi-Host Docker Network
description: How to get several servers running docker and the containers talking to one another on a unified bridge.
author: vincent
tags:
  - docker
  - network
  - openvswitch
  - gre
  - bridge
  - multi host
  - mesh
  - digital ocean
preview: /images/posts/multi-host-docker1.jpg
---

Running Docker is becoming increasingly common; many guides are available online to get started and let you spawn containers on a box; may it be a Linux server, or even on your Mac with projects like [boot2docker](http://boot2docker.io/).

<!--more-->

Running on several boxes is another story...

Several options:

- Run docker separately on each box; exposing ports on public or private interfaces so containers can talk to each other. It may prove troublesome and raise security concerns.
- Run in-between solutions like [Weave](https://github.com/zettio/weave) to fully abstract the networking. While promising, this project is quite young and doesn't (yet) integrate with orchestration tools like [compose](http://docs.docker.com/compose/) (formerly [fig](http://www.fig.sh/)) or [maestro-ng](https://github.com/signalfuse/maestro-ng).
- Run "ready-to-go" solutions for multi-hosts for docker like [Deis](http://deis.io/) or [Flynn](https://flynn.io). This may not be an option for you.
- Build a shared bridge on a meshed network among your boxes and get your Docker services to spawn containers there. It sounds complex but ... we'll see in this post that it can be done quite easily !

<p align='center'><img alt='How to connect them?' src='http://wiredcraft.com/images/posts/multi-host-docker1.jpg'/></p>

## Overview

Basically we're gonna perform the following steps:

- Install Docker on each server,
- Install OpenVSwitch on each server,
- Customize network settings to automatically create the bridges / tunnels among the hosts (in `/etc/network/interfaces` of each server),
- Customize each Docker service config so only a small(er) portion of the `docker0` ip range is being handled. It will prevent the overlapping of IP addresses of the new containers.

And that's it; restarting the services or rebooting the servers will get you a fully meshed network, with link redundancy, and Docker services able to spawn containers on dedicated IP ranges (without overlap) that can connect to one another without having to expose all the ports on the public/private interfaces. Ain't that great?

## Technologies

A quick list of the technologies we use here:

- [Docker](https://www.docker.com/); well ... it's a post about Docker and networking, so ...
- [OpenVSwitch](http://openvswitch.org/); awesome project for virtual network switch - can scale very well and would allow you to use this guide for "any" size of network.

We'll consider that our servers will be running Ubuntu Server 14.04.02 LTS x64; you may want to adapt the various configuration provided below for other OSes.

## Installation

### Docker

Not much to say here; follow the guidelines provided on the [official site](https://docs.docker.com/installation/ubuntulinux/). We'll come back later to the in-depth configuration so the various Docker services running the servers can play along together.

### OpenVSwitch

Too bad, the OpenVSwitch packages aren't available in the default repositories (or outdated); we're gonna build the `.deb` files ourselves (once), and dispatch it to the various hosts. To keep your prod boxes clean, get yourself a small box somewhere so you can use it to install dev packages and build your packages (who said use a box on [Digital Ocean](https://www.digitalocean.com/?refcode=3918a442dbd7) for 15 min ;).

The build guidelines are available in details on [OpenVSwitch Github](https://github.com/openvswitch/ovs/blob/master/INSTALL.Debian.md).

Perform the following to build your packages (adapt to new versions if needed):

    # Fetch the latest archive
    wget http://openvswitch.org/releases/openvswitch-2.3.1.tar.gz
    tar xzvf openvswitch-2.3.1.tar.gz
    cd openvswitch-2.3.1

    # Install dependencies
    sudo apt-get install -y build-essential fakeroot debhelper \
                            autoconf automake bzip2 libssl-dev \
                            openssl graphviz python-all procps \
                            python-qt4 python-zopeinterface \
                            python-twisted-conch libtool

    # Build without check in parallel
    DEB_BUILD_OPTIONS='parallel=8 nocheck' fakeroot debian/rules binary

    # Get the latest deb files and copy somewhere ...
    cd ..
    ls -al *deb

Now that you have your new `.deb` packages; go on and push & install on all your hosts.

    # Copy your packages on each host and ssh in
    scp -r *deb user@remote_host:~/.
    ssh user@remote_host

    # Install some dependencies (needed for later) and install your packages
    sudo apt-get install -y bridge-utils
    sudo dpkg -i openvswitch-common_2.3.1-1_amd64.deb \
                 openvswitch-switch_2.3.1-1_amd64.deb

## Configuration

### Network

You could be building your meshed network using the various CLI tools provided by OpenVSwitch (e.g. `ovs-vsctl`), but Ubuntu provides a helper so that you can define your network through the `/etc/network/interfaces` file.

We'll consider 3 hosts: `1.1.1.1`, `2.2.2.2` and `3.3.3.3`. They can ping each other using those IP addresses, they can be public or private, it doesn't matter. The abstract of the `/etc/network/interfaces` for host1 would be the one below.


    ...
    # eth0, eth1 and lo config
    ...

    # auto: to effectively starts it at boot
    # br0=br0: to prevent finding the interface on `ifquery --list`
    auto br0=br0
    allow-ovs br0
    iface br0 inet manual
        ovs_type OVSBridge
        ovs_ports gre1 gre2
        ovs_extra set bridge ${IFACE} stp_enable=true
        mtu 1462

    # no auto; it's an extra config of ovs
    # the gre name should match on both hosts
    allow-br0 gre1
    iface gre1 inet manual
        ovs_type OVSPort
        ovs_bridge br0
        ovs_extra set interface ${IFACE} type=gre options:remote_ip=2.2.2.2

    allow-br0 gre2
    iface gre2 inet manual
        ovs_type OVSPort
        ovs_bridge br0
        ovs_extra set interface ${IFACE} type=gre options:remote_ip=3.3.3.3

    # auto: create on start
    # Define the docker0 that will be used by docker, and attached (when available) to
    # the br0 bridge created by OpenVSwitch
    # A different IP address need to be provided on each host (no conflict!)
    auto docker0=docker0
    iface docker0 inet static
        address 172.17.42.1
        network 172.17.0.0
        netmask 255.255.0.0
        bridge_ports br0
        mtu 1462

This config needs to be adapted on the other hosts; the IP addresses of the `remote_ip` need to be paired accordingly.

<p align='center'><img alt='Shiny new meshed network' src='http://wiredcraft.com/images/posts/multi-host-docker2.jpg'/></p>

A few remarks:

- **Spanning Tree Protocol**; if applied as-is this configuration will create a network loop among the 3 servers. Not good. Adding `stp_enable=true` to the `br0` bridge will ensure that some of the `gre` tunnels are muted. This is also how you will be able to ensure redundancy in your meshed network, allowing the network to recover if one of your hosts goes down.
- **MTU**; this is a critical setup! Without this, you'll get some nasty surprises with the network apparently working fine (e.g. can ping) but unable to support large packets (e.g. `iperf` for BW testing, large DB requests or simply copying files around). Beware that the [GRE tunnels](https://en.wikipedia.org/wiki/Generic_Routing_Encapsulation) need to encapsulate several protocols:
    - **Ethernet**; 14 bytes - we're talking layer 2 between the bridges,
    - **IPv4**; 20 bytes - communication between containers / hosts,
    - **GRE**; 4 bytes - because, well... It's a GRE tunnel,
    - So that's **38 bytes to substract** to your physical interface MTU - hence **1462** (out of a regular 1500 MTU based interface).
- **Use of `=` in auto definition**; this is not a requirement for servers with static IPs, but some cloud providers (who shall remain nameless... Digital Ocean) use an init service (`/etc/init/cloud-init-container.conf`) that rely on `ifquery --list --allow auto`. Not having the `=` sign would include the OpenVSwitch interfaces and delay the whole boot process until that init script is defeated and times out.
- **docker0 bridge**; each server will need its own IP address (e.g. `172.17.42.1`, `172.17.42.2`). Since the `docker0` bridge sits on top of the `br0` bridge, they will (and should!) be able to connect to one another. Imagine what a mess it would be to deal with IP conflict... And this is also the reason why we define it ourselves on boot, and do not rely on the docker service to create that bridge for us.
- **GRE tunnels**; you could start at gre0 (instead of gre1) and it would be working perfectly fine. But for some reason you would be able to see `gre0` when typing `ifconfig` but not the other tunnels. It might be a side effect of `gre0` being a [dummy interface](http://serverfault.com/questions/247767/cannot-delete-gre-tunnel). Starting at `gre1` will make all of your `gre` tunnels "invisible" to `ifconfig` (and less confusing than only 1 visible). Don't worry, you can still list your tunnels / bridges with the command `ovs-vsctl show`.
- **More than 3 hosts**; you can follow the exact same logic and:
    - Add extra tunnels (iface greX) to reach out your new hosts.
    - Update `ovs_ports` in your `br0` bridge definition to include all the `gre` tunnels you have defined in your `interfaces` file.
    - Be clever... Don't link every single server to every other one... The STP convergence will take longer and it won't provide any real value other than extra-extra-extra link redundancy.

If you were to reboot your servers now, you'd be the proud owner of a meshed network with redundancy; you can give it a shot and run the following commands to test:

- `ping 172.17.42.2` from host1, or other IPs,
- Run `iperf` on your boxes; see what are the links in use by checking `ifconfig`,
- Stop the box in the "middle" while pinging the 3rd one, and see your ping stopping for a few seconds while the network converges (via STP).

<p align='center'><img alt='docker0 all around' src='http://wiredcraft.com/images/posts/multi-host-docker3.jpg'/></p>

### Docker

We now have a nice network with a `docker0` bridge that each docker service can hook their containers on. Wouldn't it be nice to get docker to do this automatically for us? The answer lies in docker's ability to allocate only a minimal pool of IP addresses!

For this example, we'll consider the following:

- Each host (`1.1.1.1`, `2.2.2.2`, `3.3.3.3`) is hooked on the `docker0` bridge previously created, with the respective IP addresses of `172.17.42.1`, `172.17.42.2`, `172.17.42.3`.
- Our `docker0` interface is given a /16 IP range,
- Each of our hosts will be given a small section of the `docker0` IP range, under the form of a /18 `fixed-cidr` in their docker service configuration. Respectively `172.17.64.0/18`, `172.17.128.0/18`, `172.17.192.0/18`.

Again, if you have more than 3 hosts, you may want to subdivide each range, or review the entire network topology so it makes sense with your organization.

<p align='center'><img alt='Subdivide IP responsibilities' src='http://wiredcraft.com/images/posts/multi-host-docker4.jpg'/></p>

The configuration file (`/etc/default/docker`) for **host1** would be:

    BRIDGE=docker0
    CIDR=172.17.64.0/18

    wait_ip() {
      address=$(ip add show $BRIDGE | grep 'inet ' | awk '{print $2}')
      [ -z "$address" ] && sleep $1 || :
    }

    wait_ip 5
    wait_ip 15

    DOCKER_OPTS="
        -H unix:///var/run/docker.sock
        -H tcp://0.0.0.0:2375
        --fixed-cidr=$CIDR
        --bridge $BRIDGE
        --mtu 1462
    "

You can adapt your `DOCKER_OPTS` config as per your needs, add mirrors, unsafe registry, dns, etc.

Remarks:

- **wait_ip**; since the `docker0` bridge is the last being created, it may take some time for it to have an IP address. With the `wait_ip` "function", you can safely wait for a few seconds before returning to the docker init script. This config file is being *sourced* by the real init script (`/etc/init/docker.conf`).
- **mtu**; Same reason as previously, and just as a cautionary measure to ensure that each of the interfaces being created will be given the right MTU to use.
- **-H tcp://...**; if you don't want to make it "public" via `0.0.0.0` (or bound to one of the "real" interface of your server), you can also safely bind it to ... your docker0 IP address on that host (e.g. `172.17.42.2`)! This way you can reach out any of your docker services in the intimacy of your own private meshed network, and from any of your hosts.

## Final words

Simply reboot (at least you ensure everything will automatically go up on boot).

You can try the following to see everything is working as expected.

    # Access host1
    ssh user@host1

    # Spawn a new container
    docker run -ti ubuntu bash

    # Check your IP (from within the container)
    ip add | grep eth0

    #
    # In another window
    #
    # Access another host (host2 or 3)
    ssh user@host2

    # Spawn a new container
    docker run -ti ubuntu bash

    # Ping the other container !
    ping $IP


This is not meant to be an authoritative guide on how to setup docker across multi hosts, and I welcome criticism. Lots of thoughts went in the overall setup and this post attempt at capturing as many details as to why this or that option was chosen.

It could be made even more complex by including several level of bridges, VLANs, etc. But this is too much for this simple guide ;)

There is obviously need for more complete networking, and [it seems to already be in the work](https://github.com/docker/docker/issues/8951).


## References

- https://goldmann.pl/blog/2014/01/21/connecting-docker-containers-on-multiple-hosts/
- http://networkstatic.net/open-vswitch-gre-tunnel-configuration/
- http://networkstatic.net/configuring-vxlan-and-gre-tunnels-on-openvswitch/
- http://fbevmware.blogspot.com.br/2013/12/coupling-docker-and-open-vswitch.html
- http://openvswitch.org/support/dist-docs/INSTALL.Docker.md.html
- https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux_OpenStack_Platform/4/html/Installation_and_Configuration_Guide/Configuring_Open_vSwitch_tunnels.html
- https://communities.vmware.com/blogs/kevinbarrass/2013/03/13/mixed-hypervisor-with-openvswitch-and-openflow-network-virtualisation
- http://www.microhowto.info/troubleshooting/troubleshooting_ethernet_bridging_on_linux.html
- http://blog.scottlowe.org/2013/11/22/an-update-on-using-gre-tunnels-with-open-vswitch/
- http://blog.scottlowe.org/2013/05/07/using-gre-tunnels-with-open-vswitch/
- https://github.com/openvswitch/ovs/blob/master/INSTALL.Debian.md
- http://baturin.org/tools/encapcalc/

If you're still reading on, congrats!
