---
title: Getting Started With Ansible in 5 Minutes
author: ronan
tags:
  - Ansible
  - tutorial
  - DevOps
excerpt: "Understand the basics of Ansible in our tutorial, how to install and understand Inventories, Playbook, Roles, Tasks. A how-to to get started in 5 minutes."
preview: /images/posts/ansible-push-vs-pull.png
---

When we started working on [devo.ps](http://devo.ps) a couple years ago, the [Wiredcraft](http://wiredcraft.com) team started re-evaluating configuration management tools. We had switched to Chef less than a year before, but we had started hearing of Ansible as being an interesting alternative. When we finally got around to try it out, we fell in love. We got most of what we already had done in a couple months for devo.ps ported over to Ansible in a couple days and haven't looked back since then. We contributed a bunch to Ansible since then and used it in interesting places.

<!--more-->

It is so simple that even me, despite my rusty technical chops, can pull off automation or orchestration. The last time I looked at Puppet or Chef, I didn't understand much. Let's be honest; I didn't understand jack squat. I've also always been bugged by the barriers to entries for Chef and Puppet; they aren't straightforward to install and require you to run a master somewhere.

So let me show you how easy it is to get started with Ansible.

## Install

Let's assume you'll use `pip` to get this done (if not, just check the documentation for [other ways to install Ansible](http://docs.ansible.com/intro_installation.html)):

    $ sudo easy_install pip
    $ sudo pip install ansible

Make sure it installed by running `ansible --version`.

## Concepts

You'll often hear that **Ansible is agent-less and uses a push approach** (as opposed to pull).

In a nutshell, Chef or Puppet work by installing an agent on the hosts they manage. This agent is pulling changes from a master host, using their own channel (usually not SSH).

![Push VS Pull](http://wiredcraft.com/images/posts/ansible-push-vs-pull.png)

Ansible on the other hand is simply using SSH to push changes from wherever it runs (a server or your own laptop). Conceptually, it's as if instead of connecting to your machines with SSH and running commands manually, you could script the whole thing and run it automatically. Obviously, it comes with better tools to script this, mostly modules that make it more convenient to do the most common operations and ensure [idempotence](http://en.wikipedia.org/wiki/Idempotence) (*aka* ensuring that even if you run the same thing twice you'll end up in the same final state).

![Ansible VS SSH](http://wiredcraft.com/images/posts/ansible-vs-ssh.png)

We'll get familiar below with more of Ansible's concepts: Inventories, Playbooks, Roles and Tasks.

## Adding a host with an inventory

The first thing for us to do once Ansible is installed is to specify which hosts we want to manage.

We're big fans of [Digital Ocean](https://www.digitalocean.com/?refcode=3918a442dbd7) at Wiredcraft and I'll just assume you use it. If you don't yet, consider [signing up](https://www.digitalocean.com/?refcode=3918a442dbd7).

1. **Add a new machine**; Fedora, Ubuntu or CentOS will do, we won't need anything more than the $5/month droplet.
1. You'll get an email from Digital Ocean with the password. Use it to SSH in the box and change the default password.
1. Create a folder where you'll keep the Ansible related code for this example. In this folder, add a file named `hosts` with the following content:

        $ web ansible_ssh_host=198.199.115.67

1. That's it. Let's just make sure this works. Run the following command:

        $ ansible -i hosts all -m ping -u root -k -v

    You should get something like that:

        web | success >> {
            "changed": false,
            "ping": "pong"
        }

This file is called an **[inventory](http://docs.ansible.com/intro_inventory.html)**, it lists the hosts that you will be managing with Ansible.

## Installing NGINX with roles

Now that we have defined an inventory, we can start managing our host. The first thing I'll do here is to try and install NGINX on it.

To run any type of configuration, deployment or orchestration, Ansible uses [playbooks](http://docs.ansible.com/playbooks.html). Playbooks are [YAML](http://en.wikipedia.org/wiki/YAML) files defining what needs to be applied to the targeted hosts.

We'll start by using a [role](http://docs.ansible.com/playbooks_roles.html). Roles are re-usable abstractions that contain a collection of features (variables, [tasks](http://docs.ansible.com/playbooks_intro.html#tasks-list) and [handlers](http://docs.ansible.com/playbooks_intro.html#handlers-running-operations-on-change)).

It happens that Ansible has a community for users to share such kind of roles: [Ansible Galaxy](https://galaxy.ansible.com). A [search](https://galaxy.ansible.com/list#/roles) gets us the most popular role for NGINX:  https://galaxy.ansible.com/list#/roles/466

Go to the folder where you created your inventory in, create a `roles/` subfolder and then run the following command:

    $ ansible-galaxy install jdauphant.nginx -p roles

It will install the NGINX role in the `roles` subfolder, making it available to Ansible when ran from this folder.

Now, we're gonna create our first [playbook](http://docs.ansible.com/playbooks.html): playbook is a key concept in Ansible. It defines what needs to be configured and executed on your hosts.

Add a file named `deploy.yml` in the same folder as your inventory with the following content:

    ---
    - hosts: all
      roles:
        - role: jdauphant.nginx
          nginx_http_params:
            - sendfile on
            - access_log /var/log/nginx/access.log
          nginx_sites:
             wiredcraft:
               - listen 80
               - server_name _
               - root /var/www/wiredcraft.com/_site
               - location / { try_files $uri $uri/ /index.html; }

[More about the NGINX role's options can be found in the README](https://github.com/jdauphant/ansible-role-nginx#role-variables).

The code above will:

1. Install NGINX with `sendfile` on and logs in `/var/log/nginx/access.log` (more about this in [the official NGINX documentation](http://nginx.org/en/docs/http/ngx_http_core_module.html)).
1. Add a site named "wiredcraft" served by default by NGINX on port 80, from `/var/www/wiredcraft.com/_site`. All these options are again available on the official NGINX documentation.

We have nothing to serve yet, we'll get to that later. You can ignore the `/var/www/wiredcraft.com/_site` path for now. Be aware as well that NGINX will be restarted after its configuration has been changed.

We're now ready to apply this to our host. Just run the following:

    $ ansible-playbook deploy.yml -i hosts -u root -k -v

This command will run our playbook against the inventory we've defined previously, using the `root` user to connect and prompting you for the password (thanks to the `-k` option). `-v` is setting the level of verbosity.

Ansible will spurt out logs while running your playbook and should finally display that all tasks were ran successfully ("ok"):

    PLAY RECAP **************************************************************
    web                  : ok=15   changed=10   unreachable=0    failed=0  

Now, if you point your browser at your URL, you'll get a 404 error from NGINX since we haven't deployed our site yet. This however means that NGINX is indeed up and running (great success!).

## Next step

We've covered some of the basics of Ansible here; playbooks, roles and inventories. Now that we have a server set up with NGINX, it'd be nice to deploy an app.

Next time we'll be doing just that, adding tasks to our playbook to deploy our code, install its dependencies and build our app.
