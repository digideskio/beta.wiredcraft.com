---
published: true
title: "High Security Electron.js Application with React.js and Golang for the Myanmar Election"
author: xeodou
tags:
  - JavaScript
  - High Security Application
  - excerpt: "How we used Electron.js, React and Golang to build a highly secured application used in the Myanmar Election. We describe our technical choices, their pros and cons."
preview: https://wiredcraft.com/images/posts/electron-js-high-security-application.jpg
---

![High Secruity Electron.js Application](https://wiredcraft.com/images/posts/electron-js-high-security-application.jpg)

Myanmar voted in monumental elections last month. What you might not know is that there was a lot of work that went in to making these elections possible, including the work [Wiredcraft](https://wiredcraft.com)  just completed on the Myanmar Election Project. We built the entire voter registration system for [IFES (International Foundation for Electoral Systems](http://www.ifes.org/) and the [Myanmar UEC (Union Election Commission)](http://uecmyanmar.org/); one of the most important parts of the project was the Windows Application, called the Township Voter Registration (TVR), that allowed UEC members on the ground to help collect voter registrant information and make corrections. We spent a lot of time working to make the TVR user friendly and secure and we were able to use some really cool technology to do it.

<!-- more -->

For the TVR some important points we considered during the build were:

- High security, data is very sensitive
- Running on Windows,  built on MacOSX 
- Totally offline

## JavaScript Or Native language

This project required high amounts of data security due to the sensitive nature of the voter registrants data. We needed to keep hackers out of the door, so choosing the technology stack we used was a very important step. We had two choices. 

- Use C#/C++ to build a Windows Native application
- Use cross-platform technology to build a cross-platform application that can run on Windows

Building with C++/C# looks like the most widely used method because it's a local native language, but we are JavaScript experts and have built many projects with cross platform technologies like [Electron.js](http://electron.atom.io/), [NW.js](http://nwjs.io/). One of the biggest considerations we had to have for the project was that unicode for the Myanmar language is not very uniform, they mostly use zwagyi. Here is a quick run down of the pros and cons of working with JavaScript versus working in C++/C# for our company. 

### JavaScript

**Pros**

- We don't need to learn something new and difficult.
- Easier and faster for us to build it, because we have lots of experience with building JavaScript Applications.
- We can use our rich website development experiences.
- We can have some cool UI/UX and it's much easier to  change them, because these are all CSS's work.

**Cons**

- JavaScript source code can be read directly, we still needed to find a way to solve the security issue.
- We haven't built a production application yet, we only played around with it.

<h3> Native languages C++/C# </h3>

**Pros**

- Microsoft made it, so at some points native languages may be good for development of a Windows Application.
- We can build the whole application with a single language.

**Cons**

- C++/C# are the official languages for building Windows Applications, but we still don't know if it's easier to work with.
- We need spend lots of time to learn and gain expertise in a new language, and we may not use it later on.
- C++/C#  is also a good choice, but C# is still easy decompiled by some tools like `RemoteSoft's Salamander `,`Lutz Roeder's Reflector`, so we may still need to build the encrypt/decrypt part with C++.
-Learning C++ is more difficult than some other languages (everyone knows that.) We may face lots of issues and it may not be easy to solve.

Electron.js and NW.js both are good open source projects, they make it easy to build a cross-platform application, but electron provides more features like multi-context, which allows us to do more in the generation of the PDF process. You can read more about how we built a [high performance PDF generator in Electron.js for the Myanmar election](https://wiredcraft.com/blog/pdf-generation-web/) and [here on GitHub](https://github.com/atom/electron/blob/master/docs/development/atom-shell-vs-node-webkit.md)

## Snapshot vs Golang

Once we confirmed the decision to use JavaScript, I began researching methods to make JavaScript more secure. The following are some ways I found to protect JavaScript code: 

- Use JavaScript minify tools to compress and minify your code, it is a way to protect your source code but this method didn't provide the highest security possible. 
- I found v8 [snapshot](https://github.com/nwjs/nw.js/wiki/Protect-JavaScript-source-code-with-v8-snapshot) later on, it provides some great benefits - it's good way to protect the source code, it will compile your source code to v8 engine snapshot file, then you can use it directly in your code. 
- Snapshot does have some limitations - you will get in to trouble when you snapshot a large piece of code, the snapshot file will increase when you use it over time, and it's not good to use for data storage within the code.  It will keep the state after you use it next time, sometimes this is a good thing, but you don't want keep the state forever, it will make things go crazy.
- We considered using some Node.js native modules, but we faced the same situation again; Node.js native module is written by C++ and this would require our team to spend excess time fine tuning C++ skills. 

We decided we could still use JavaScript, but use another language to replace C++/C#.  We chose Golang, because Golang is a cross-compile language and it has some advantages that we want:

- Golang is a compile language , all things will compile to the executable binary file, it will keep your source code safe.
- The cross-platform property allows us to build on Mac OSX and release it for a Windows machine, it will make the development process very easy.
- It's a modern language, we think learning Golang is much easy than learning C++ (Actually it is.).
- We may use it later on, maybe we will use it to build some of our future  web project.

## Data Entry Security

We separate the whole application in to different layers. On the top is the UI layer built by React.js and SASS, in the middle is the data layer built by Golang, and at the bottom is the database layer handled by Encrypted SQLite database which is a [SQLCipher](https://www.zetetic.net/sqlcipher/)

![Building the High Security Application](https://wiredcraft.com/images/posts/react-electron-high-security-app.jpg)

At the Golang layer, we provided several APIs for the front-end, we move all the complicated logic to the Golang layer so the front-end doesn't need to care for the data process. The front-end only needs to call the API through the Node.js`child_process` and then they have accessibility. For example, we have an API that exports some data entries to our central server (the Windows application is totally offline), the frond-end just needs to call the API and send a path where use want to store the package on his Windows machine, the Golang middleware will find all the data and do a PGP encryption, then write to the path. The only issue for us is Golang doesn't support the SQLCipher database officially, and there is no third-party library that can do that, so I built one to fit our specific needs and solve our problems: [https://github.com/xeodou/go-sqlcipher](https://github.com/xeodou/go-sqlcipher). 

## Conclusion

Electron.js and Golang helped us build the high level security used in the TVR, even though we didn't have too much experience building Windows Applications. We didn't have to worry about how the application worked with Windows, because Electron.js will do it for us.  React.js helped us move fast on the building of the UI part of the TVR: we were able to implement lots of cool User Interfaces and it was easy to implement; it was like we were just building a website.  We learned a lot about implementing high security features with cross-platforms with Golang, React.js, Electron.js and SQLCipher. 

### Referencess:

- [Electron.js](http://electron.atom.io/)
- [NW.js](http://nwjs.io/)
- [Facebook React](https://facebook.github.io/react/)
- [SASS](https://github.com/sass/sass)
- [Golang](https://golang.org/)
- [Go-SQLCipher](https://github.com/xeodou/go-sqlcipher)
- [Node.js](https://nodejs.org)
- [SQL Cipher](https://www.zetetic.net/sqlcipher/)
- [Protect JS Source Code with v8 snapshot](https://github.com/nwjs/nw.js/wiki/Protect-JavaScript-source-code-with-v8-snapshot)
- [Atom Shell Vs. Node.js Webkit](https://github.com/atom/electron/blob/master/docs/development/atom-shell-vs-node-webkit.md)
- [PDF Generation on the Web](https://wiredcraft.com/blog/pdf-generation-web/)
