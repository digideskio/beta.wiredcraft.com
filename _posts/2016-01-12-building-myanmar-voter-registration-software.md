---
published: true
title: "Building the Voter Registration for the Myanmar Elections"
author: katie
tags:
  - Myanmar elections
  - software
preview: https://wiredcraft.com/images/posts/Myanmar-TVR/working-with-team.jpeg
---

![Voters lined up at the polling station - WaterMark Removed](https://wiredcraft.com/images/posts/voter-at-school.png)

*[Source](https://www.flickr.com/photos/oxlaey/22239595774/in/photolist-zTeK1s-btYWMF-bvmmn1-8RgfM6-btYXxF-bybAEq-6xM2zZ-5zu7E2-98h2EQ-9vVo8T-bDaD7W-btYXqa-9Fbtfo-9eTWtM-98M2VF-9D3p97-9dpLwG-burZks-btYWuD-9vq5qw-8bD6nW-9Epzyw-97azpW-hT3tkr-btYWY6-btYWD2-bDaD9G-8QFcu6-8QF97F-8QFape-8QJfzq-8QJgnd-98M2CV-bJ4DRr-8vQWRb-xQdBKJ-xRFjgG-xA35jK-xA2X3F-xSxaN2-wVEt5F-wVwjqU-xSxfKB-xSxnCp-xTbS94-xzVY1y-xzVMqW-xQdF1w-xQdB6h-xzVkT5)* Voters lined up at the local polling station a school on November 8th

Myanmar's first free and fair elections in 25 years were held Sunday, November 8th. From 1962 to 2011 Myanmar was under military control, but elections were held in 2010 and 2012 (a by-election for small number of seats). These elections lead to the transition of a full military rule to a military backed people’s government in 2011. The 2010 election was met with heavy opposition and was boycotted, and weren’t considered free or fair. Over the past four years Myanmar has implemented important changes for the slow transition of Myanmar to a democracy, including opening the economic region to foreign investment and investing in election infrastructure.

Wiredcraft was tasked to build the voter registration system by [IFES (International Foundation for Election Systems)](http://www.ifes.org/) and the [UEC (Union Election Commission)](http://uecmyanmar.org/). Wiredcraft won the contract competitively to the design VL software; the database and software is owned and maintained by the UEC. The UEC is required by law to create the voter registration lists by inputting the GAD (General Administration Department) and immigration logbooks. In order for citizens to have access to verify, edit or add data to the official voter database we built the Township Voter Registration (TVR), Centralized Voter Registration (CVR) Systems, and the ["Check My Name" app](https://checkvoterlist.uecmyanmar.org/). 

<!-- more -->

The UEC had local township offices where a lot of the on-the-ground voter registration work happened. The voter lists were printed and posted at these township offices, so that all citizens could check their voter registration information. If a citizen noticed that a correction to their voter information was necessary, with the help of UEC staff members on the ground, they could submit any corrections or edits through forms that were digitalized using the TVR system.

![TVR Lists in Yangon](https://wiredcraft.com/images/posts/tvr-lists-yangon.png)

*[Source](http://www.bbc.com/news/world-asia-33441000)* Man checks voter lists in Yangon

In Myanmar, edits to voter registrations have been traditionally done through forms that are outlined in the rules and regulation, and the electoral laws.  UEC staff members collected the data directly from the voters paper forms and then manually input the data from the form into the TVR. The purpose of digitalizing the forms was to help provide a transparent, accountable, traceable and reusable election system for the UEC.

Here is a list of the following forms and their purpose that the voters could submit through the TVR. 

- Form 3-A: Temporarily adds a registrant for one election only
- Form 3-B: Temporarily removes a registrant from the list
- Form 4: Objection/removing a registrant record (deceased, new nationality, etc.)
- Form4-A: Transfer of a registrant to a new address
- Form 4-C: Correction of a mistake in a registrant's details

The TVR system is a Windows app that runs locally at each township; every TVR has it's own unique encryption and logging settings to ensure security, accountability and traceability. All edits that were made to voter registration were additions that were clearly traced and logged; nothing was ever removed from the system. This provided transparency and made it easier to debug the system, as well as rollback if anything unexpected happened. Wiredcraft supported the [UEC staff members by working directly with the team members by providing on the ground training on the TVR software in Yangon](http://wiredcraft.com/blog/myanmar-township-voter-registration-pilot/).

![Wiredcraft team trains UEC Staff Members](https://wiredcraft.com/images/posts/Myanmar-TVR/working-with-team.jpeg)

Once the data was collected at the township level, the data needed to be sent to the Centralized Voter Registration (CVR) database for sanitization, this ensured that there were no duplicates, overwrites, or formatting errors. This was done by taking the data via secure encrypted USB keys to the central polling station in Naypyidaw, where it was then input into the CVR and went through the sanitization process. 

A lot of edge cases had to be supported. Myanmar is still a very rural country with places that are difficult to reach and others that can be subject to natural phenomenons. For example, some townships were devastated by flooding in August (right in the middle of voter registration) so the UEC made provisions for the voter registration and election processes for those affected by the flooding. The entire voter project, called the Voter List Update (encompassing the data entry in 2014 to the printing of the final voter list), saved a lot of work in the face of  the flooding and prevented the disenfranchisement of the populations affected by the flood. The UEC was able to save most of the laptops containing the voter lists, something the UEC staff would not have not been able to do with just paper voter lists alone.

In addition to the TVR and CVR, we built a public platform ["Check My Name"](https://checkvoterlist.uecmyanmar.org/)  that allowed citizens to check their voter status and information online. If they noticed an error, they could follow the same procedures as all other voters and visit their local UEC township office to make corrections in the TVR. Once any edits and additions were input into the TVR and sent to the CVR, the data was automatically updated to the "Check My Name" platform. Citizens could then access their updated information. 

[Myanmar citizens even showed Angelina Jolie how they were able to check their names online with the "Check My Name" platform.](http://www.people.com/article/angelina-jolie-humanitarian-trip-myanmar-rakhine-state) (true story).

!["Check My Name" Platform in Use](https://wiredcraft.com/images/posts/check-my-name-software.png)
*[Source](http://www.people.com/article/angelina-jolie-humanitarian-trip-myanmar-rakhine-state)*

The population actively participated in the election with the projected voter turnout of about 70%, official statistics should be released soon. (For some perspective, the last US presidential election had a turnout of 54.9%). Stay tuned to the [Wiredcraft Blog](https://wiredcraft.com/blog) for more details on the technology that went into building the voter registration for the Myanmar Elections.
