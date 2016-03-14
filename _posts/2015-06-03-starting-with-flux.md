---
title: Starting with Flux
author: chopper
tags:
  - Flux
  - MVC
  - Demo
preview: /images/posts/2015-06-03-start-flux/Header.png
---

![header](http://wiredcraft.com/images/posts/2015-06-03-start-flux/Header.png)

We have been using Flux for months now and we are genuinely impressed with its predictable data flow, scalability and accessibility compared to MVC architectures. We know that it might appear a bit complicated to get started with, but we will explain some of the reasons that make Flux our go-to architecture. If you are already sold on Flux and need some help getting started feel free to skim down to our quick example below.

<!--more-->

## About Flux

Flux is an architecture developed by Facebook which consists of the following components: Dispatcher, Action, Store, View. There are many implementations currently in use such as flux/facebook, reflux or fluxxor. We believe Flux is the go-to resource for applications with multiple events to manage.

Let's explain briefly each of the architecture.

* MVC is based on a simple process: the Controller updates the Model and then tells the View to get the new data from the Model. Let's take the example of multiple views associated with one model. The controller becomes quickly overcomplicated and the logic will be unnecessarily complex to extend to new views.
* Flux, on the other hand, is similar to a pub-sub pattern: the View adds the Listener to the Store, if the Store changes then the View will be notified automatically and update itself.

Furthermore Flux is not only a data binding solution, it is also known for its event bus dispatcher capabilities. Data is changed by the Actions, and then all the web Actions go to the Dispatcher, making your application more predictable and easier to follow. That leads us to believe that compared to MVC, in certain case, Flux can be considered as more **scalable.**

If you are thinking *just shut up and show me* here is a diagram on how Flux works:

![illustration](http://wiredcraft.com/images/posts/2015-06-03-start-flux/illustration.png)

<sub>[**Resource**]( https://github.com/facebook/flux/blob/master/docs/img/flux-diagram-white-background.png)

## Quick example

You can find the code of our example on Github: https://github.com/ChopperLee2011/flux-github. We will create together a lightweight app around Github which will allow you to:

* login to Github
* display user name and organizations
* display user/org repositories
* display repo issues

Let's get started!

### Step 1:  Create Project

Create your app structure and install libs or you can use https://github.com/kriasoft/react-starter-kit to setup you environment fast:

    .
    ├── index.html
    ├── package.json
    └── src
        └── js
            ├── actions
            ├── components
            ├── API
            ├── constants
            ├── dispatcher
            ├── stores
            └── utils

Create a package.json file by cloning and then use `npm install` to install the libraries needed for this demo.

### Step 2: Action

Action can triggered by UI actions such as getting details from a click to the master branch, submitting a form or some changes or sending a message by clicking on a button. Note that you can call API utils in an action to help handling your application logic. All of these actions are send to the Dispatcher but only one can pass through the dispatcher at a time.

    ServerActionCreators.js:
    handleRepoSuccess(userName, response) {
       AppDispatcher.handleServerAction({
           type: ActionTypes.GET_REPO_SUCCESS,
           userName,
           response
       });
    }

### Step 3: Dispatcher

The dispatcher is the central hub of the data flow in Flux, it gets the payload data/messages from the actions and sends them to their registered stores. The dispatcher utilizes a ‘waitfor()’ method to make a sequence for the Store processing the data. It is singleton by design and acts as an event bus. One single dispatch makes a simple flow to figure out what exactly happens after the action trigger.

    AppDispatcher.js:
    let AppDispatcher = assign(new Dispatcher(), {
        handleServerAction(action) {
           let payload = {
               source: PayloadSources.SERVER_ACTION,
               action
           };
           this.dispatch(payload);
        }
    });

### Step 4: Store

The store contains the state of application dat, and handle dispatched actions (note that it has no direct setter methods). The Store uses a similar feature to ‘action.type’ to find which dispatched action it can handle. If the Store is changed, it will emit a change event which will update the subscribed view.

    IssueStore.js:
    let IssueStore = createStore({
        get() {
                return _issues;
            }
        });
    IssueStore.dispatcherToken = AppDispatcher.register((payload) => {
        let action = payload.action;
        switch (action.type) {
            case ActionTypes.GET_ISSUE_SUCCESS:
                _issues = action.response.body;
                IssueStore.emitChange();
                break;
            default:
            // do nothing
        }
    });

### Step 5: View

On the front-end side of things, the View has the same role than in a MVC. There could be a listener in the View for getting store changes, which should be removed when the component unmount.

    userPage.js:
    ComponentWillMount() {
        this._onInit();
        UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    },
    render() {
        let {user,repos} = this.state;
        if (_.isEmpty(user)) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="user">
                    <div className="userList">
                        <a onClick={this._getUserRepo}>{user.me}</a>
                        <p> Organizations </p>
                    </div>
                    <div className="orgList">
                        <ul>
            {user.orgs.map(org =>
                    <li key={org.id}>
                        <a onClick={this._getOrgRepo} data-tag={org.login}>
                        {org.login}
                        </a>
                    </li>
            )}
                        </ul>
                    </div>
                    <div className="repoList">
                        <p>Repositories</p>
                        <Repo repos={repos}/>
                    </div>
                </div>
            );
        }
    }

## Thoughts

**Simplicity** and **predictability**: Flux's one direction data flow makes the app's logic easier to handle in your code. Flux's architecture makes the structure easy to comprehend even as you scale and add more complex components to your code. Although we still find use for MVC, we find ourselves saving time and resources by using Flux.

We hope this helped you get started with Flux and you can see the benefits of using Flux yourself. Feel free to let us know what you think of Flux on [Twitter](https://twitter.com/wiredcraft).

## Helpful Resources:

* [Official flux overview]( http://facebook.github.io/flux/docs/overview.html#content)
* [Which Flux implementation should be used?](https://github.com/kriasoft/react-starter-kit/issues/22)
* [What is the Flux Application Architecture?](https://medium.com/brigade-engineering/what-is-the-flux-application-architecture-b57ebca85b9e)
