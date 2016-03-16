---
title: Building the software for the Myanmar elections
excerpt: "Working with IFES and the UEC, we designed, built, shipped and maintained
  the entire suite of software that ensured the success of the first successful
  elections in Myanmar in 2015."
tags:
  - Myanmar
  - elections
  - IFES
  - UEC
cover: /images/posts/check-my-name-software.png
featured: true
---

IFES and UEC are preparing and organizing Myanmar's first democratic election in 25 years, enlisting Wiredcraft to provide a platform that would be stable, reliable and re-usable in order to register voters throughout the country. Leveraging our expertise in building and maintaining user-friendly voter registration systems, we delivered an easy to use system under a strict deadline.

![devices](/images/work/myanmar/devices.png)


## The Client

* **International Foundation for Electoral Systems [(IFES)] (http://www.ifes.org/)** is a non-profit organization whose goal is to promote and support democratic systems by facilitating citizen's access to free and fair elections.
* **United Election Commission [(UEC)](http://uecmyanmar.org/)** is responsible for organizing and monitoring the elections of Myanmar.

<!--logos-->

## Challenges

* **Tight development schedule**, first prototype delivered in 3 weeks.
* **Supporting low bandwidth** by implementing applications that can provide support offline and with old hardware and have the ability to run semi-autonomously.
* **Cross browser/OS support** ensuring that all citizens have access to the registration system.
* **Resilient architecture** that can recover without manual changes to facilitate limited IT support.
* ** Organization and development** of bilingual language and font support.
* **Limited font support** for the Myanmar language.
* **Friendly user interface and experience** for on-site staff, voters, and administrators.
* **Integration** with the Central Voter Registration system.
* **Security **is always top priority for our work with election systems.
* **Transparency** showing traceable changes for the voters' details, changes in the admin/users' details, and architecture.

## Design

### Simple and Easy to Use

Direct communication with our clients during the design ensured that the system remained simple to use while providing details on the user's registration status. We emphasized a simple user interface that communicated the actions needed for each registration step ensuring a consistent and reliable user experience for both desktop and offline applications.

![registration](/images/work/myanmar/registration.png)
![wireframe](/images/work/myanmar/wireframe.png)


### Consistent User Interface

We followed very specific UI guidelines regarding name, color and data to ensure consistent communication in the call to actions. Consulting our client's feedback from our wireframes and mockups, we utilized a joint dropdown menu and map for the Township selection and a three step navigation support in the header so the user could clearly identify the steps in the registration process. We strengthened the call to actions by incorporating the blue from the call to actions in our illustrations.



![steps](/images/work/myanmar/steps.png)
![illustration](/images/work/myanmar/illustrations.png)


### Customized Data Visualization

We utilized Sketch, Mapbox and Leaflet to create customized layers representing Myanmar's state, district and township levels. Since there was no available vector map for Myanmar's Townships so we created the Township layer and adjusted the opacity of the layers so that it's possible to see each of the layers. The use of map and list provided greater accessibilities to the voters to they could easily see the status of the Township's registration.



![stack](/images/work/myanmar/stack.png)
![maps](/images/work/myanmar/darkmaps.png)



<!--logos-->

## Technology

* **Security and flexibility provided by [Django](https://www.djangoproject.com/).** Several django containers run in parallel on various hosts, with the help of **HaProxy**  and **Celery** as load-balancer we were able spread the load across several servers. Providing high availability, security, and integrity for managing the offline registration of over 30 million voters.
* **High performance for low bandwidth with OpenVSwitch and PostGreSQL.** Responsive applications optimized to work offline or in areas with poor connection with old or limited hardware. STP allows the various links to be muted or enabled whenever an underlying hosts become unreachable. With PostGreSQL in replication mode, the setup is made as such as the standby master can take over automatically if the active master becomes unavailable.
* **Deployment and continuous integration** via [Ansible](http://www.ansible.com/home), [Docker] (https://www.docker.com/) and [devo.ps](http://devo.ps) improving performance, control over the environment, QA and uptime (through redundancy and failover mechanisms).limiting at all cost manual operations on the various servers.
* **Data visualization with Mapbox, chartist.js,and D3.js**, For the front-end, we wanted something light, so, we decided not to use any framework and simply used Chartist.js and D3.js and provided the map for the VR township registration status using Mapbox.

<!--last point needs help-->


## Takeaway

Time constraints motivated us to work efficiently and to keep things simple.  Direct communication with our clients on Slack made it possible to perform quick iterations and testing. We developed our language support systems and strengthened our performance for electoral systems. Provided an almost autonomous platform to support in the event of a hardware or software issue and improved our work with high availability and reliability docker based platforms.
