---
layout: post
title: "Android Development - Fundamentals 👽☕"
category: programming
tags: [android, mobile app, Java]
published: true
---
# How do I make an app?

The core elements of an app are:
- A *layout* defines the appearance of a screen. It is defined in a XML file.

![android studio text view](/assets/img/blog/2017-11-13-android2/text-view.png)

- A *view* is an UI element such as a button that can be added to
a *layout*. Android Studio provides a "design view" to create a layout in a visual way so you can add the view elements to a screen, it provides a palette of view elements to choose from. Here, we have added a button view and a spinner view (dropdown list) to our *layout*.

![android studio design view](/assets/img/blog/2017-11-13-android2/design-view.png)

- An *activity* represents a single user screen. Activities are usually associated with one *layout*, and they’re written in Java. We have a main activity that is the starting point of our app. Each activity you create must have an entry in *AndroidManifest.xml*.
- *AndroidManifest.xml* contains all the essential application data.
- *Resources* provide external content for our app such as images,
styles, string values, and so on.
- *Intents* are used to launch activities.
- *Services* are background processes that can run for a long time.

The rest can be discussed in more detail as we focus on each aspect.

# How does an app do stuff?

The main *activity* is launched when a user clicks on the app icon.

A task is when two or more *activities* are chained together. We use an *intent* to pass a message between *activities* to chain them together.

# How is our project organised?

Typically, assets are organized into different directories based on
their purpose.

![android directory structure](/assets/img/blog/2017-11-13-android2/android-directory-structure.png)

- java files (*app/src/main/java*): our activities and classes
that we define go here.
- generated files (*app/build/generated*): contains files generated
by the build process. We don't change these manually. *R.java* contains the IDs that keep track of all resources in the app, and is in *app/build/generated/source/r/[build flavor/]{release|debug}/{app package}*.
- static resources (*app/src/main/res*): The additional files for static content such as images. Explained further later.
- *AndroidManifest.xml*: Every app must have an *AndroidManifest.xml* file at the root of the project. It describes essential information about your app such as: the list of it's components, the permissions required, and the hardware and software features required.

# Activity

An Activity represents a single user screen. You extend ```android.app.Activity``` or a subclass.

## Configure the manifest

*Activities* need to be added to *AndroidMainfest.xml*. Android Studio does this for you when you create a new *activity* when you use it's wizard.

![new wizard](/assets/img/blog/2017-11-13-android2/new-wizard.png)

The only required attribute for this element is ```android:name```, which specifies the class name of the *activity*.

```xml
<manifest ... >
  <application ... >
      <activity android:name=".MainActivity" />
      ...
  </application ... >
  ...
</manifest >
```

One *activity* needs to be marked as a main activity here. We use an intent filter to do this.

### Intent filters

Intent filters provide the ability to launch an activity based on a request. For example, an explicit request might tell the system to “Start the Send Email activity in the Gmail app". By contrast, an implicit request tells the system to “Start a Send Email screen in any activity that can do the job." When the system UI asks a user which app to use in performing a task, that’s an intent filter at work.

## Lifecycle events

Skillfully managing activities allows you to ensure that:
- Orientation changes take place smoothly without disrupting the user experience.
- User data is not lost during activity transitions.
- The system kills processes when it's appropriate to do so.

So, an activity has callback methods that are called at different stages of it's existence to enable us to manage it appropriately. Below is a diagram outlining when the methods are called depending on the state of the activity.

![activity states](https://i.stack.imgur.com/UHVsR.png)


# Static resources

You should always externalize app resources such as images and strings from your code, so that you can maintain them independently.

You should also provide alternative resources for specific device configurations, such as different screen resolutions, and group them in specially-named resource directories. At runtime, Android chooses the appropriate resource based on the current configuration.

Once you externalize your app resources, you can access them using resource IDs that are generated in your project's *R.java*.

## Grouping resources

|Directory| Resource Type |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| animator/| XML files that define property animations.|
|anim/ | XML files that define tween animations. (Property animations can also be saved in this directory, but the animator/ directory is preferred for property animations to distinguish between the two types.) |
|color/| Defines a state list of colors. |
|drawable/ | Bitmap files (.png, .9.png, .jpg, .gif) or XML files that are compiled into the following drawable resources.|        
| mipmap/ | Drawable files for different launcher icon densities.|
| layout/| XML files that define a user interface layout.|
|menu/| XML files that define app menus, such as an Options Menu, Context Menu, or Sub Menu. |
|raw/ | Arbitrary files to save in their raw form. To open these resources with a raw InputStream, call Resources.openRawResource() with the resource ID, which is R.raw.filename. However, if you need access to original file names and file hierarchy, you might consider saving some resources in the assets/ directory (instead of res/raw/). Files in assets/ aren't given a resource ID, so you can read them only using AssetManager.|
|values/| XML files that contain simple values such as: strings, integers, and colours. By convention, each type is stored in a separate file.|
| font/| Font files with extensions such as .ttf, .otf, or .ttc, or XML files that include a <font-family> element. |
| xml/| Arbitrary XML files that can be read at runtime by calling ```Resources.getXML()```. |

## Localization of strings

The default resource file used to hold name/value pairs of strings that can be referenced throughout your app is *res/values/strings.xml*. These are great for creating multi-lingual version of app (localization). You can put your default English strings resource file in the *res/values* folder as normal, and your French resource file in a new folder called *res/values-fr*. If the device is set to French, it will use the strings in this folder then! If the device is set to any other language, it will use the strings in *app/src/main/res/values*.

# Layouts

Relative
