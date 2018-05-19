---
layout: post
title: "Android Development - Intents 👽☕"
category: android
tags: [mobile, Java]
published: false
---

# Intents

An intent is an "intention" to perform an action. It is basically a message that is passed between components to say you want to do something, or that something was done. Its most significant use is in the launching of activities.

## Explicit Intents

Are used to call a __specific component__. If we want Activity 1 to launch Activity 2 when a button is clicked, this is an explicit intent.

![explicit intent](https://www.tutorialspoint.com/android/images/intent1.jpg)

## Implicit Intent

Are used when you have an idea of what you want to do, but you do not want to specify exactly which component should be launched.

You can give the user an option to choose between a list of components also. This is a common scenario when you need to take a photo inside an app, a list of apps that can use the camera are shown to the user.

<img src="https://koenig-media.raywenderlich.com/uploads/2015/04/7.-Intent-Chooser.png" height="400px"/>

## Intent filters

Intent filters provide the ability to launch an activity based on a request. For example, an explicit request might tell the system to “Start the Send Email activity in the Gmail app".

By contrast, an implicit request tells the system to “Start a Send Email screen in any activity that can do the job." When the system UI asks a user which app to use in performing a task, that’s an intent filter at work.

# References & Further Reading
[Vogella: Android Intents](http://www.vogella.com/tutorials/AndroidIntent/article.html)
[Ray Wenderlich: Intents Tutorial - May 2017](https://www.raywenderlich.com/160019/android-intents-tutorial-2)
