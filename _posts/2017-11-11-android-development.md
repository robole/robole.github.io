---
layout: scrollable_post
title: "Android Development - Getting Started :alien:☕"
category: programming
tags: [android, mobile app, Java]
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

# Pick a tutorial/book and try other people's code

I started with [Head First Android](http://shop.oreilly.com/product/0636920029045.do) to get a fundamental grasp of the Android way of doing things. The
 code samples from the book can be found in [this github repo](https://github.com/dogriffiths/HeadFirstAndroid) organized by chapter.  

You need to have the version of the Android SDK installed on your computer that is contained in the build.gradle file of a sample project ("project folder\app\build.gradle"). I didn't want to download more versions of the Android SDK and gobble up my disk space, so I tried to update the version numbers through Android Studio to use the most recent version that I had installed on my PC (version 27), but it wouldn't save the updates in build.gradle!

So, I changed the version numbers manually in build.gradle (highlighted fields) and synchronised the project. Then it ran!

![android gradle build update](/assets/img/blog/2017-11-11-android/android-gradle-build.png)

You can also download code samples directly in Android Studio on various different features.

![android studio import code sample](/assets/img/blog/2017-11-11-android/import-code-samples.png)
![android studio import code sample options](/assets/img/blog/2017-11-11-android/import-code-samples-options.png)


# How to run the app on my phone

1. You need to enable the Settings>Developer Options>USB Debugging option on your phone. I have Android 5.1.1 on my phone and I couldn't find the Developer Options in Settings. After a bit of [research](https://www.androidcentral.com/android-50-lollipop-basics-how-turn-developer-settings), I discovered that you must go to Settings>About phone and hit the build number 7 times to unlock Developer Options. Like a cheat code on a computer game! :-D

2. Run the app as usual, just choose your phone from the list of AVDs and Android Studio will  install the app on your device and launch it! The app is installed on your phone, so when you disconnect, it is still there!

# To directly install the app on your phone

- The apk is the packaged app and should be in "project folder\app\build\outputs\apk\debug"
- Transfer this file onto your phone (you can email it to yourself) and open it, the installer will do the rest :-)
