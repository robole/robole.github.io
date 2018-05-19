---
layout: post
title: "Android Development - X 👽☕"
category: android
tags: [mobile, Java]
---


## Localization of strings

The default resource file used to hold name/value pairs of strings that can be referenced throughout your app is *res/values/strings.xml*. These are great for creating multi-lingual version of app (localization). You can put your default English strings resource file in the *res/values* folder as normal, and your French resource file in a new folder called *res/values-fr*. If the device is set to French, it will use the strings in this folder then! If the device is set to any other language, it will use the strings in *app/src/main/res/values*.
