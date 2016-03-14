---
published: true
title: "A Practise of Method Swizzling in iOS Development"
author: leo
tags:
  - Method Swizzling
  - iOS Development
preview: https://wiredcraft.com/images/posts/method-swizzling.jpeg
---

![Method Swizzling](https://wiredcraft.com/images/posts/method-swizzling.jpeg)

As many iOS developers know the `Method Swizzling` is a 'black magic' technique of the [Objective-C Runtime](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008048), and perhaps it is the most contentious of runtime hackery techniques. 

Many people don't like using the `Method Swizzling` because they think it changes the default function and may impact a class that you don't want to change. On the contrary, supporters think it is a good feature because of its ability to do complex tasks conveniently.

You can see how I came to using the `Method Swizzling` and my practise and experience with it for some UI elements in my latest side iOS project, an app that focuses on all things comedy: especially jokes.

<!-- more -->

## Demand

I needed to set a unified background color for all of views in the project. At the beginning, I wrote the following code in every view controller's' `viewDidLoad` method: 

```
// setup global background color
self.view.backgroundColor = WXGGlobalBackgroundColor;
```

## Analysis

In this project, there were tons of views and controllers, so I found myself writing this code again and again. It was stupid and inefficient! I knew I needed to find a better solution for this. So, I began to think about `Inheritance` and `Method Swizzling`.

### Why didn't I use `Inheritance`?

1. As we know, the UIKit framework has its own inherited hierarchy and Objective-C doesn't support `Multiple Inheritance`, so if you want to set all views in the project, you cannot just create a subclass of `UIViewController`, maybe you need do more on `UITableViewController` and `UINavigationController` which is already a subclass of `UIViewController`. The result is that you increase the complexity of the inheritance structure and get no additional benefits.

2. There are a lot of challenges in making sure everyone on a project knows how to use the custom subclass, because you need to provide documentation for each person on the project and must ensure the documentation is understood and clear when new team members enter the project.

### Why did `Method Swizzling` work better for me?

With `Method Swizzling` you can change the default implement of UIViewController’s viewDidLoad method, all views in the project will change whatever it belongs to a `UINavigationController` or a `UITableViewController`. It is amazing! You just need to change one place and the whole project will be changed.

So, I began my experiment with `Method Swizzling`.

## Program

To solve the background color issue, I found an easy way to implement `Method Swizzling`. You can check out the code below. 

```
//  UIViewController+Extension.h
#import <UIKit/UIKit.h>
@interface UIViewController (Extension)
@end
//  UIViewController+Extension.m
#import "UIViewController+Extension.h"
#import <objc/runtime.h>
@implementation UIViewController (Extension)
+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method originalMethod = class_getInstanceMethod([self class], @selector(viewDidLoad));
        Method swizzledMethod = class_getInstanceMethod([self class], @selector(swizzled_viewDidLoad));
        BOOL didAddMethod = class_addMethod([self class], @selector(viewDidLoad), method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        if (didAddMethod) {
            class_replaceMethod([self class], @selector(swizzled_viewDidLoad), method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
    });
}
- (void)swizzled_viewDidLoad {
//    WXGLog(@"%@ loaded", self);
    if (![self isKindOfClass:NSClassFromString(@"UIInputWindowController")]) {
        self.view.backgroundColor = WXGGlobalBackgroundColor;
    }
    [self swizzled_viewDidLoad];
}
@end
```

I tried to keep the above code friendly for beginners of `Method Swizzling`, and if needed, you can find some great resources to help you [here](http://nshipster.com/method-swizzling/).

## Problem

<img src="https://wiredcraft.com/images/posts/test-success.jpeg" alt="Method Swizzling Solution" style="margin: 0 auto; display: block;">

 After I finished implementing my solution using the `Method Swizzling`, I began testing my code. Success, it worked like magic. I saw the right background color. A few days later, I wanted to add a textfield and a pop up keyboard, but this is where I found a bug. The whole screen was filled with the background and all the views disappeared.

![Bug after usingMethod Swizzling](https://wiredcraft.com/images/posts/find-a-bug.jpeg) 

When I debugged the view hierarchy, I saw the views there. Additionally, there was another view named `UIInputSetContainerView` in front of all my views, it blocked the other views.

I added a line of debug code in the swizzled method, to try and find what the problem was. Then, I saw that a controller named `UIInputWindowController` was called last. The issue was a private API managed by Apple. Developers are unable to use this API, despite this it was impacting the `Method Swizzling` so my solution was to remove the private controller in the swizzled method. After that, no problems occurred again in my project.

## Conclusion

`Method Swizzling` is a dynamic feature that can exchange the implementations of two methods in runtime. This means it can implement some complex functions conveniently, however, it can also be dangerous to use because its scope can change the class of the project and can cause fatal errors for the project if done wrong.

Here are some pitfalls of `Method Swizzling`. Pay attention to these when you use `Method Swizzling` in your projects.

* Method swizzling is not atomic
* Changes behavior of un-owned code
* Possible naming conflicts
* Swizzling changes the method's arguments
* The order of swizzles matters
* Difficult to understand (looks recursive)
* Difficult to debug

We can't give up eating for fear of choking, so the best choice is to keep trying with the `Method Swizzling` until you understand what’s going on and know how to fix it when it has bugs. Don’t give up. Then you will find that it's a very useful technique for you to develop iOS apps.

## Bonus Tip for UILabel

Change the default display of UILabel from “” to “-" is as same as this page, so you can do it yourself if you are interested.

## Read More about `Method Swizzling`

If you want to use `Method Swizzling` with Swift, you can get help from [here](http://swifter.tips/swizzle/) or [here](http://nshipster.com/method-swizzling/)

Have fun!

