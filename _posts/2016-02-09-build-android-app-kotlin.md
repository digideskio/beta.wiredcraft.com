---
published: false
title: "How to Build an Android App with Kotlin"
author: kuno
tags:
  - Kotlin
  - Android
preview: 
---

Android development has been changing a lot over the past few years, but still people complain that when compared to iOS "Android development still sucks." Fortunately, there are a lot of people donating their time and efforts to make development Android suck a lot less and dare I say, become a pleasure. A new programming language, Kotlin, is helping with this. 

At Wiredcraft we've been researching using Kotlin for our redesign and build of a mobile application for a major food and beverage player in the Chinese market, specifically for Activity/Fragment in Android. The goal of the project is to provide a better mobile user experience for our client's growing business in China.

## What is Kotlin ?

Kotlin is a new language designed by JetBrain, the same name that brought you Intellij and Android Studio and some of the best IDE in industry. Essentially, Kotlin is an evolution based on Java in the syntax aspect. Its source code can be compiled to JVM bytecode, it has 100% interoperationality with Java. That's why it can be used to develop Android applications. But recently, JetBrain has added the ability to compile Kotlin source code into JavaScript experimentally; making it reach an even broader usage space.

## Who should use Kotlin?

So, whom are the potential users Kotlin is targeting? Is it the newbie to Android or an experienced developer? 

I would argue both.

For the newbie, they can enjoy the cleaner and more concise of syntax of Kotlin; at same time, avoid a lot of common mistakes that easily happen when coding in Java.
For the experienced developers, they can also benefit from the cleaner syntax, and can increase productivity, as well.

## What makes Kotlin different? 

Well, if you are one of those people that hates Java, then Kotlin maybe a cure for you. In many ways, it "fixed" Java - especially on Android. The next major release of Java (Java 8) looks pretty promising - bringing a lot of modern language features, including lambda and functional programming. But, unfortunately there are no official schedule for when Java 8 will be available on the Android platform. With this background, Kotlin allows Android developers to try out some modern languages.

Let have a quick look what Kotlin brings:

1.**Cleaner syntax**

This is the Hello world example for Kotlin...

```
fun main(args: Array<String>) {
  println("Hello, World!")
}
```

compared to Java's. 

```
public class HelloWorld {
    public static void main(String[] args) {        // Prints "Hello, World" to the terminal window.        System.out.println("Hello, World");    }
}
```

I think you will agree that Kotlin is much cleaner and more concise.

2. **Null safety**

As an Android developer, how many times do you encounter a Null Pointer Exception during development/testing? One of the most import changes for Kotlin compared to Java, is it takes all null value(s) checks from runtime to compile time. By doing so, Kotlin makes sure the null safety for any code that passes the compilation. 

For example, below Java code can be compiled, but will throw a Null Pointer Exception at run time.

```
String a  = null;
System.out.println(a.length());
```

On the other hand, in the Kotlin world, variables are not nullable by default. For example, this piece of Kotlin code is not valid, it can not even be compiled. 

```
val a:String = null
```

But if you really want to allow some variable to have null value, you can add a question mark.

```
val a: String? = null
println(a?.length())
```

In the above example, the first `?` used to make variable `a` nullable, the second `?` is just to check if the value of `a` is null.

3. **Functional programming***

One of the most import changes in Java 8 was lambda. But, there is not a way to access Java 8 on Android in the near future (this isn't a viable option for Andriod development). Kotlin came to rescue - Kotlin, also, added a lot of high order functional programming features on top the Java 6.

By "high order", I mean a function that can take another function as a parameter or return a function. For example, many programming languages have the `filter` function, which can take a Collection-like data structure and a function to filter the elements in the Collection that do not meet certain criteria. Then return a subset of the original Collection.

This is how you might implement `filter` function in Kotlin

```
fun <T> filter(items: Collection<T>, f: (T) -> Boolean): List<T> {
  val newItems = arrayListOf<T>()
  for (item in items) if (f(item)) newItems.add(item)
  return newItems
}
```

Then you can use it on a Collection data structure

```
filter(numbers, { value ->
  value >= 5
})
```

Pretty clean implementation right？Wait, it can be even cleaner by using the special `it` keyword that represents each item inside the collection.
filter(numbers) { it >= 5 }

### Minimum overhead

Besides adding many features, the Kotlin language itself is actually very small. As the latest version of Kotlin at this moment (1.0.0-beta-4584), its runtime and stand library are just several kilobytes in size. So you wouldn't need to worry about it will dramatically increasing the size of your project as whole. 

The features we mention here are just a very small part of Kotlin, for the full specs of Kotlin, please refer to the [official reference page](https://kotlinlang.org/docs/reference/).

## How to use Kotlin on Android Studio

The author of Kotlin is also the author of some of the most popular IDE out there, so it is almost guaranteed to have excellent support and very good tool chains. Currently, there are official plugins for Eclipse, IntelliJ IDEA, and standalone command line compiler, as well. But since we are focusing on Android development, here I will just introduce how to use Kotlin on Android Studio.

1. You will need to download and install Intellij IDEA/Android Studio plugin, you can install it through the IDE preference panel or download if from JetBrain site.



2. Once you have the plugin installed, you can start to use it. If you are trying  to convert your existing Java project to use Kotiln, that's straightforward -Just click `Code` -> `Convert Java File to Kotlin File`in the menu bar, Kotlin will convert the source Java code into Kotlin code.

Alternatively, if you want to start a Kotlin project from scratch, unlike the situation on IDEA, there is not a way you can start a fresh Kotlin project at the moment. Instead, what you can do is to create a new Java project first, then convert all `.java` files into `.kt` files. Yes, this way is counterintuitive and a bit stupid. I hope google and JetBrain can working together to fix it in the future version of Android Studio.



Once you have all the foundations sets up, you can enjoy coding with Kotlin in your Android project. Additionally, since Kotlin for Android will be interoperable with Java 6, and Kotlin came from JetBrain, it's very likely we won't need to worry about the long term support of Kotlin; making it a valuable long term investment.

## Conclusion

Currently, Kotlin is not as hot as Swift is on the iOSplatform. But the number of libraries is growing. With those new features that Kotlin bring to us,  as Android developers, I think you will hopefully have the same experience that I had. I encourage all of you guys to give Kotlin a try in you next Android project. With more people involved, the language and its community and eventually Android development will just keep getting better and better.
