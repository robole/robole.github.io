---
layout: post
title: "Android Development - Fundamentals 👽☕"
category: android
tags: [mobile, Java]
published: true
---
# What do I need to install to get started?

You can read my previous post [Android Development - Getting Started]({{ site.baseurl }}{% post_url 2018-05-01-android-development1 %}) to do this.

# How do I make an app?

The core elements of an app are:
- A *layout* defines the appearance of a screen. It is defined in a XML file. Android Studio has a "text view" to show
the XML source.

![android studio text view](/assets/img/blog/2017-11-13-android2/text-view.png)

- A *view* is an UI element such as a button that can be added to a *layout*. Android Studio provides a "design view" to create a layout in a visual way so you can add the view elements directly onto a screen, it provides a palette
of view elements to choose from.

![android studio design view](/assets/img/blog/2017-11-13-android2/design-view-example.png)

- An *activity* represents a single user screen. Activities are usually associated with one *layout*, and they’re written in Java. We have a main activity that is the starting point of our app.
- *AndroidManifest.xml* contains all the essential application data.
- *Resources* provide external content for our app such as images,
styles, string values, and so on.
- *Intents* are used to launch activities.
- *Services* are background processes that can run for a long time.

The rest can be discussed in more detail as we focus on each aspect.

# How does an app do stuff?

The main *activity* is launched when a user clicks on the app icon.

A task is when two or more *activities* are chained together. We use an *intent* to pass a message between *activities* to achieve this.

# How is our project organised?

Typically, assets are organized into different directories based on their purpose.

![android directory structure](/assets/img/blog/2017-11-13-android2/android-directory-structure.png)

- java files (*app/src/main/java*): our activities and classes
that we define go here.
- generated files (*app/build/generated*): contains files generated
by the build process. We don't change these manually. *R.java* contains the IDs that keep track of all resources in the app, and is in *app/build/generated/source/r/[build flavor/]{release|debug}/{app package}*.
- static resources (*app/src/main/res*): The additional files for static content such as images. Explained further later.
- *AndroidManifest.xml*: Every app must have an *AndroidManifest.xml* file at the root of the project. It describes essential information about your app such as: the list of it's components, the permissions required, and the hardware and software features required.

# Activity

An activity represents a single user screen. You extend ```android.app.Activity``` or a subclass.

## Configure the manifest

Each activity you create must have an entry in *AndroidManifest.xml*.
Android Studio does this for you when you create a new activity using it's wizard (as below).

![new wizard](/assets/img/blog/2017-11-13-android2/new-wizard.png)

The only required attribute for the activity element is ```android:name```, which specifies the class name of the activity.

```xml
<manifest ... >
  <application ... >
    <activity android:name="design.roboleary.conversion.ConversionActivity">
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
      </activity>
  </application ... >
  ...
</manifest >
```

One *activity* needs to be marked as a main activity, so you can launch your app. We use an *intent filter* to do this. We will speak about this in more detail when we discuss *intents*.

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
|color/| Defines a list of colors. |
|drawable/ | Bitmap files (.png, .9.png, .jpg, .gif) or XML files that are compiled into drawable resources.|        
| mipmap/ | Drawable files for different launcher icon densities.|
| layout/| XML files that define a user interface layout.|
|menu/| XML files that define app menus. |
|raw/ | Arbitrary files to save in their raw form. To open these resources with a raw InputStream, call ```Resources.openRawResource()``` with the resource ID.|
|values/| XML files that contain simple values such as: strings, integers, and arrays. By convention, each type is stored in a separate file.|
| font/| Font files with extensions such as .ttf, .otf, or .ttc, or XML files that include a <font-family> element. |
| xml/| Arbitrary XML files that can be read at runtime by calling ```Resources.getXML()```. |

# Exercise: Make a temperature conversion app

We want to make an app that will convert the temperatures from celsius to farenheit.

## Create a new project

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 75%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><p>Application Name</p></td>
<td ><p>Temperature Converter</p></td>
</tr>
<tr>
<td ><p>Package name</p></td>
<td ><p>design.roboleary.conversion</p></td>
</tr>
<tr>
<td><p>Minimum SDK</p></td>
<td><p >Latest Android release</p></td>
</tr>
<tr>
<td ><p >Template</p></td>
<td ><p >Empty Activity</p></td>
</tr>
<tr>
<td ><p >Activity</p></td>
<td ><p >MainActivity</p></td>
</tr>
<tr>
<td ><p >Layout</p></td>
<td ><p >activity_main</p></td>
</tr>
<tr>
<td ><p >Backwards Compatibility (AppCompat)</p></td>
<td ><p >false (not selected)</p></td>
</tr>
</tbody>
</table>

## Create our strings in static resources

Open *res/values/strings.xml*, and add the String definitions to the file as described as below. These are the values that we will we use for labels in our layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Temperature Converter</string>
    <string name="celsius">Celsius</string>
    <string name="fahrenheit">Fahrenheit</string>
    <string name="calc">Calculate</string>
</resources>
```

## Create the layout

This is roughly what we want.

![layout](/assets/img/blog/2017-11-13-android2/layout-design.png)

Open our layout file *res/layout/activity_main.xml* in
the Text view, and delete everything.

We want a simple layout, so we add a ```LinearLayout``` element, which organizes everything in a horizontal or
vertical line. We can want everything to be organized vertically, so we set this property ```android:orientation="vertical"```. You
can switch to the "design view" to add the views to layout
then.

A simple way of organizing the view components is to drag
and drop them onto the "Component Tree view".  So you can
see the order we want them arranged in. The radio buttons
are children of the radio button group.

![component tree](/assets/img/blog/2017-11-13-android2/component-tree.png)

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">


    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/editText1" />

    <RadioGroup
        android:id="@+id/radioGroup1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/editText1"
        android:layout_below="@+id/editText1">

        <RadioButton
            android:id="@+id/radio0"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"
            android:text="RadioButton" />

        <RadioButton
            android:id="@+id/radio1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="RadioButton" />
    </RadioGroup>

    <TextView
        android:id="@+id/textView1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/radioGroup1"
        android:layout_below="@+id/radioGroup1"
        android:layout_marginTop="22dp"
        />

    <Button
        android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/textView1"
        android:layout_below="@+id/textView1"
        android:layout_marginTop="22dp"
        android:text="Button" />
</LinearLayout>
```

## Edit view properties

For the radio buttons:
1. We can change them to have more meaningful ids, *celsius* and *farenheit* are good.
2. We can use the string values from our static resources by making a reference like this ```android:text="@string/celsius"``` for the first radio button (highlighted below), and do similar for the second radio button.
3. Make the first radio button checked with ```android:checked ="true"```

![edit properties](/assets/img/blog/2017-11-13-android2/edit-properties.png)

For our ```EditText```:
1. We set ```android:inputType="numberSigned|numberDecimal"```. This changes the keyboard that is used to input the value.
2. We can also change the ID
```android:id="@+id/inputValue"```.

```xml
<EditText
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:id="@+id/inputValue"
       android:inputType="numberSigned|numberDecimal" />
```
For the button:
1. We assign the string value ```android:text="@string/calc"```.
2. Change the ID to ```calcButton```.
3. Add ```android:onClick="onClick"``` to reference
the onClick method, which we will create in our
```MainActivity``` to respond to the user clicking the button.

```xml
<Button
        android:id="@+id/calcButton"
        android:onClick="onClick"
        ...
        android:text="@string/calc" />
```
This is what the complete layout looks like.

![edit properties](/assets/img/blog/2017-11-13-android2/complete-layout.png)

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">


    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/inputValue"
        android:inputType="numberSigned|numberDecimal" />

    <RadioGroup
        android:id="@+id/radioGroup1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/editText1"
        android:layout_below="@+id/editText1">

        <RadioButton
            android:id="@+id/celsius"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"
            android:text="@string/celsius" />

        <RadioButton
            android:id="@+id/farenheit"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/farenheit" />
    </RadioGroup>

    <TextView
        android:id="@+id/outputValue"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/radioGroup1"
        android:layout_below="@+id/radioGroup1"
        android:layout_marginTop="22dp"
        />

    <Button
        android:id="@+id/calcButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/textView1"
        android:layout_below="@+id/textView1"
        android:onClick="onClick"
        android:layout_marginTop="22dp"
        android:text="@string/calc" />

</LinearLayout>
```
## Create an utility class

To do the conversion.

```java
package design.roboleary.conversion;

public class ConvertUtil {
    // converts to celsius
    public static float convertFahrenheitToCelsius(float fahrenheit) {
        return ((fahrenheit - 32) * 5 / 9);
    }

    // converts to fahrenheit
    public static float convertCelsiusToFahrenheit(float celsius) {
        return ((celsius * 9) / 5) + 32;
    }
}
```

## Update the MainActivity

We need to define the ```onClick``` method to handle the user
interaction:
- We check if the user has entered in some text to
```inputValue```, if they haven't a Toast (a small popup)
 will tell them that nothing is entered.
- If there is text
 entered, we check which radio button is selected, and
 then we decide which method from our utility class we
 need to call to do the conversion.
 - The result is displayed in ```outputValue```, our ```TextView```.

```java
package design.roboleary.conversion;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class ConversionActivity extends Activity {
    private EditText text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        text = (EditText) findViewById(R.id.inputValue);
    }

    // this method is called at button click because we assigned the name to the
    // "OnClick" property of the button
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.calcButton:
                RadioButton celsiusButton = (RadioButton) findViewById(R.id.celsius);
                RadioButton fahrenheitButton = (RadioButton) findViewById(R.id.farenheit);
                TextView output = (TextView) findViewById(R.id.outputValue);
                if (text.getText().length() == 0) {
                    Toast.makeText(this, "Please enter a valid number",
                            Toast.LENGTH_LONG).show();
                    return;
                }

                float inputValue = Float.parseFloat(text.getText().toString());
                if (celsiusButton.isChecked()) {
                    String result = String.valueOf(ConvertUtil.convertCelsiusToFahrenheit(inputValue));
                    output.setText("= " + result + " farenheit");
                } else {
                    String result = String.valueOf(ConvertUtil.convertFahrenheitToCelsius(inputValue));
                    output.setText("= " + result + " celsius");
                }
                break;
        }
    }
}
```
# Code

You can find the completed code in [this github repository](https://github.com/robole/temperature-conversion).

# References

[Vogella: Getting started with Android development - Tutorial](http://www.vogella.com/tutorials/Android/article.html)
