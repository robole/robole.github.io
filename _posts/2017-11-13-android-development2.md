---
layout: post
title: "Android Development - Fundamentals :alien:☕"
category: programming
tags: [android, mobile app, Java]
published: false
---
# What is an app?

An app is a collection of activities, layouts, and other resources:
- A layout defines the appearance of a screen. It is defined in a XML file.
- An activity is a single, defined thing that your user can do. Activities are usually
associated with one layout, and they’re written in Java. We have a main activity
that is the starting point of our app. Each activity you create must have an entry in AndroidManifest.xml.
- Resources such as images and application data provide external content for our app.

# How does an app do stuff?

A task is two or more activities chained together. We use an intent to pass a message between activities to chain them together.

# How is our project organised?

They are put into particular directories.
  - strings (app/src/main/res/values/strings.xml): The default resource file used to hold name/value pairs of strings that can be referenced throughout your app. These are great for creating multi-lingual version of app (localization). You can put your default English
  strings resource file in the app/src/main/res/values folder as normal, and your French resource file in a new folder called app/src/main/res/values-fr. If the device is set to French, it will use the strings in the app/src/main/res/values-fr folder. If the device is set to any other language, it will use the strings in app/src/main/res/values.

This is the directory structure:
![android directory structure](/assets/img/blog/2017-11-11-android/android-directory-structure.png)

- java (app/src/main/java): our activities and classes go here.
- generated (app/build/generated): contains auto generated files. You can see R.java inside
this folder, R.java contains references to keep track of all resources in the app.
- res (app/src/main/res): our resources:
    - values: Used to define strings , colors, dimensions, styles and static arrays of strings or integers. By convention each type is stored in a separate file, e.g. strings are defined in the res/values/strings.xml file.
- AndroidManifest.xml :All the android applications will have an AndroidManifest.xml file in the root directory. This file will contain essential information about the application to the Android system, information the system must have before it can run any of the application's code. This control file describes the nature of the application and each of its components

# Layouts

Relative
