---
layout: scrollable_post
title: "Android Development - Getting Started 👽☕"
category: android
tags: [mobile, Java]
---
# Setting up the environment and making a "Hello World" program

Android Studio is the official IDE for Android, so I obediently decided to use it!

1. [Install Android Studio](https://developer.android.com/studio/index.html) (Java is already installed, of course!).
2. Create a new project with an "Empty Activity". By default, this should give a screen with "Hello World".
3. Build the project.
4. Install anything additional if prompted.
5. Run the project and select an AVD (Android Virtual Device). I selected the default AVD and got an error. It stated that Vtx needed to be enabled in the BIOS. Vtx is to permit hardware acceleration for virtualization to run AVDs. I enabled this in the BIOS and rebooted.
6. The AVD loaded this time but it didn't display the program properly.
7. I created a new AVD with a smaller screen size and it worked, but it gave a warning that there can be stability issues with my graphics device driver.

![android hello world](/assets/img/blog/2017-11-11-android/android-hello-world.png) ![device driver warning](/assets/img/blog/2017-11-11-android/android-avd-driver-warning.png)

# Pick a tutorial or book

I started with [Head First Android](http://shop.oreilly.com/product/0636920029045.do) to get a fundamental grasp of the Android way of doing things. The code samples from the book can be found in [this github repo](https://github.com/dogriffiths/HeadFirstAndroid) organized by chapter.  

# Using someone else's project

It's good to be clear on what android version number you need installed, and how to set it in the build process.

## Android Version Numbers

In the gradle file (usually in *project folder\app\build.gradle*), there are a few different version numbers that you can specify:
- *compileSdkVersion* : Version that your app is compiled against during development. This means you can use Android API features included in that version (and lower).
- *minSdkVersion* : Lowest version that can run the app. Generally, it is recommended to try to pick the lowest version that satisfies all of the features you need!
- *targetSdkVersion* : Highest version that can be used run the app. This is usually the version you test the app against. If you do not specify the *targetSdkVersion*, it defaults to the *minSdkVersion*.

Generally, this is followed:
> minSdkVersion = targetSdkVersion <= compileSdkVersion

If you want to offer different features based on the android version used at runtime, you can do this:

> minSdkVersion <= targetSdkVersion <= compiledSdkVersion (highest possible)

You need to have a version of the Android SDK installed on your computer that supports the *compileSdkVersion* in build.gradle (equal to or higher than this version number). I changed the version numbers (highlighted fields) and synchronised the project to compile and run the project I downloaded.

![android gradle build update](/assets/img/blog/2017-11-11-android/android-gradle-build.png)

You can also download code samples directly in Android Studio on various different features.

![android studio import code sample](/assets/img/blog/2017-11-11-android/import-code-samples.png)
![android studio import code sample options](/assets/img/blog/2017-11-11-android/import-code-samples-options.png)

# How to run the app on my phone

1. You need to enable the Settings>Developer Options>USB Debugging option on your phone. I have Android 5.1.1 on my phone and I couldn't find the Developer Options in Settings. After a bit of [research](https://www.androidcentral.com/android-50-lollipop-basics-how-turn-developer-settings), I discovered that you must go to Settings>About phone and hit the build number 7 times to unlock Developer Options. Like a cheat code on a computer game! 😀

2. Run the app as usual, just choose your phone from the list of AVDs and Android Studio will  install the app on your device and launch it! The app is installed on your phone, so when you disconnect, it is still there!

# To directly install the app on your phone

- The apk is the packaged app and should be in "project folder\app\build\outputs\apk\debug".
- Transfer this file onto your phone and open it, the installer will do the rest. 😀
