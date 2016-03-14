---
published: true
title: "How to Create a Unique Constraint on a LoopBack Model with a NoSQL Database"
author: chopper
tags:
  - Loopback
  - mixin
preview: https://wiredcraft.com/images/posts/loopback-model.jpg
---

![LoopBack Mixin with NoSQL Database](https://wiredcraft.com/images/posts/loopback-model.jpg)

[Wiredcraft](https://wiredcraft.com) is currently working on the mobile app for one of our clients. I was tasked to build the private AMS; this is needed to build restful APIs for the card and customer relationships. I used LoopBack as the backend framework for implementing some restful APIs, and NoSQL database like couchbase for storing persistent data. 

<!-- more -->

I encountered a problem - how to create unique constraints on the model.  Many NoSQL databases do not have a unique constraint feature on the non-key properties of the document, for example: a model like customer: {id,name,email,address}, id is the key property but what if I want the email property to be unique, too. I found a simple way to create a LoopBack mixin, which is a hook on the operation `create data` for achieving this function.

## Init the Project and Install LoopBack

- mkdir LoopBack-NoSql-unique-mixin && cd $_
- npm init

## Define Mixin

```
module.exports = (Model, options) => {
 'use strict';
 Model.observe('before save', (ctx, next) => {
   if (ctx.instance && ctx.isNewInstance) {
     Model.app.models.unique.createKey(ctx.instance[options.column], Model.modelName).then(next());
   } else {
     next();
   }
 });
Model.observe('before delete', (ctx, next) => {
  next('delete the unique doc');
 });
}
```

LoopBack applies many [operation hooks](https://docs.strongloop.com/display/public/LB/Operation+hooks) which are triggered on the CRUD operation on the model. `before save` means this hook is used before the create and update method invoke. `ctx` parma is the target model instance, because I only wanted to trigger invoke before the model was created. Therefore, the handle logic is in the `ctx.instance && ctx.isNewInstance` block. ctx.isNewInstance only has support for memory, MongoDB and MySQL connectors officially. The next thing I should do is check whether the couchbase connector supports this syntax or not. I ran a few tests locally and discovered that, couchbase connector does support `ctx.instance && ctx.isNewInstance`  syntax.  

## create unique model

```
module.exports = Unique=> {
 'use strict';
 Unique.createKey = (key, type) => {
   return Unique.create({id: `${type}:${key}`});
 };
};
```

This will add a method createKey to the model, you even can add some restful APIs use `remoteMethod` to the model when the trigger is on. I use the format like : email:example@gmail.com as the key of my unique constraint document.

## Register mMixin

- Add the mixin root directory to the middleware.json.
- Add the model directory to the model-config.json.
- Update the target model which you want put the hook on, add this to the last of the configure file 

```
"mixins": {
 "UniqueConstraint": {
   "column": "email"
 }
}
```

## Conclusion

Although we didn’t use this method in the final iteration of our project, LoopBack mixin can be used for injecting logic on models. You can apply it on any model you want, without editing the code inside the model.js. This feature helped me to  build the`reference document` for enforcing unique constraints in the NoSQL database. The best part is that, loopback already supports many operation hooks, which can make the project more clear and simple, ultimately helping save time on the project.
