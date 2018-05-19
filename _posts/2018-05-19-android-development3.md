---
layout: post
title: "Android Development - Intents 👽☕"
category: android
tags: [mobile, Java]
published: true
---

# Intents

An intent is an "intention" to perform an action. It is basically a message that allows us to request functionality
from other components.

Intents allow us to chain independent components to accomplish
different *tasks*.

Intents are objects of ```android.content.Intent```.

## Explicit Intents

Are used to call a __specific component__. If we want
```ActivityOne``` to launch ```ActivityTwo``` when a button is
clicked, this is an explicit intent.

![explicit intent](https://www.tutorialspoint.com/android/images/intent1.jpg)

```java
Intent i = new Intent(this, ActivityTwo.class);
startActivity(i);
```

## Implicit Intents

Are used when you know what you want to do, but you do not
want to specify exactly which component should be used. Android evaluates the request at runtime to choose a component.

Implicit intents can give the user an option to choose between a list of apps. This is a common scenario when you need to do something like open a hyperlink for a webpage, a list of external apps are shown to the user.

<img src="http://media02.hongkiat.com/push-content-android-pushbullet/link-complete-action.jpg" height="400px"/>

## Intent filters

In the previous example, how does Android know which apps can display a webpage?

Intent filters provide the ability to evaluate if an activity can satisfy an intent. This process is known as intent resolution.

To make sure it’s the right activity for the intent, the intent filter provides three criteria:
- Action: This is what the intent needs to do, such as dialling a phone number. An action is simply a string constant describing what is being accomplished.
  - ```ACTION_VIEW```: When we want to show something to the user, such as view a photo in a gallery app.
  - ```ACTION_SEND```: Also known as the share intent, you should use this when you have some data that the user can share with another app.
  - ```ACTION_DIAL```: Dial a number.
  - ```ACTION_WEB_SEARCH```: Web search.
- Data: The type of data the intent can accept. This ranges from specific file paths, to ports, to MIME types such as images and video. You can set one or more attributes to control how strict or lenient you are with the data from an intent that your app can handle.
- Category: This is an additional criterion to specify which actions can respond to an implicit intent. An intent filter must include a category of ```android.intent.category.DEFAULT``` if it’s to receive implicit intents. Any number of categories can be placed in an intent. Common categories:
  - ```CATEGORY_LAUNCHER```: The activity is the initial activity of a task and is listed in the system's application launcher.
  - ```CATEGORY_BROWSABLE```: The target activity allows itself to be started by a web browser to display data referenced by a link, such as an image or an e-mail message.

If Android finds a single match for an implicit intent, it starts the component, and passes it the intent. If it finds multiple matches, it asks the user to pick one.

## What if you want the user to choose every time?

If multiple apps can respond to an intent and the user might want to use a different app each time, you should explicitly show a chooser dialog. The chooser dialog asks the user to select which app to use for the action (the user cannot select a default app for the action).

For example, when your app performs "share" with the ```ACTION_SEND```, users may want to share using a different app depending on their current situation.

To show the chooser, create an intent using ```createChooser()``` and pass it to ```startActivity()```, as shown in the following example.

```java
Intent sendIntent = new Intent(Intent.ACTION_SEND);
...

// Always use string resources for UI text.
// This says something like "Share this photo with"
String title = getResources().getString(R.string.chooser_title);

//if no activities are resolved for this intent, a
//message will be shown informing the user
Intent chooser = Intent.createChooser(sendIntent, title);

startActivity(chooser);
```
## Example: Main Activity

We have seen this already. This is the entry point to our app.

```xml
<activity android:name="MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

## Example: Open a webpage

```xml
<activity android:name=".BrowserActivitiy"
          android:label="@string/app_name">
  <intent-filter>
     <action android:name="android.intent.action.VIEW" />
     <data android:scheme="http"/>
     <category android:name="android.intent.category.DEFAULT"/>
  </intent-filter>
</activity>
```
## Example: Get an image

- Restrict to images only using the *mimeType*.

```xml
<activity
    android:name=".GetImageActivity"
    android:label="@string/app_name" >
    <intent-filter>
      <action android:name="android.intent.action.SEND" />
      <data android:mimeType="image/*" />
      <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```

# Passing data between Activities

An intent can have data that is stored in a ```Bundle```. You add data directly to the ```Bundle``` via the overloaded ```putExtra()``` methods of an intent.

Data is stored as key/value pairs. The key is always of type String. As value, you can use the primitive data types (int, float, …​), and objects of type ```String```, ```Bundle```, ```Parcelable``` and ```Serializable```. You can read [this](http://alexzh.com/uncategorized/passing-object-by-intent/) to know how to pass a custom object of ```Parcelable``` and ```Serializable```.

```
Intent i = new Intent(this, ActivityTwo.class);
i.putExtra("Value1", "This value one for ActivityTwo ");
i.putExtra("Value2", 2.0);
```

The data in an intent can be used by the receiving component. You use ```getExtras()``` to retrieve values.

```
Bundle extras = getIntent().getExtras();

// get data via the key
String value1 = extras.getString("Value1");
if (value1 != null) {
    // do something with the data
}
```

There is also some convenience methods to retrieve a single
pair such as ```getStringExtra(..) ```.

```
// get data via the key
String value1 = getIntent().getStringExtra("Value1");
```

# Exercise: Login

Create a basic login.
- *LoginActivity*: Typical login screen. If the *username* and *password* are correct, it will which will show the *HomeActivity*. If they are incorrect, a ```Toast``` will tell the user. Can have a single username of "admin" with a password of "password".

<img src="/assets/img/blog/2018-05-20-android3/login1.png" height="400px"/>

- *HomeActivity*: Has a ```TextView``` saying "Welcome [username]!", where *[username]* is the value passed from *LoginActivity*.

<img src="/assets/img/blog/2018-05-20-android3//login2.png" height="400px"/>

The completed code is [here](https://github.com/robole/login-basic).


```java
public class LoginActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

     public void onClick(View view){
         EditText username = (EditText) findViewById(R.id.username_input);
         EditText pass = (EditText) findViewById(R.id.password_input);

         String username_text = username.getText().toString();
         String pass_text = pass.getText().toString();

         if(username_text.equals("admin") && pass_text.equals("password")){
             Intent i = new Intent(this, HomeActivity.class);
             i.putExtra("username", username_text);
             startActivity(i);
         }
         else{
             Toast.makeText(this, "Incorrect username and password combination",
                     Toast.LENGTH_LONG).show();
         }

     }
}
```

```java
public class HomeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        TextView welcome = (TextView) findViewById(R.id.welcome);

        String username = this.getIntent().getStringExtra("username");
        welcome.setText("Welcome " + username + "!");
    }
}
```

# References
- [Vogella: Android Intents](http://www.vogella.com/tutorials/AndroidIntent/article.html)
- [Ray Wenderlich: Intents Tutorial - May 2017](https://www.raywenderlich.com/160019/android-intents-tutorial-2)
- [Google Guides: Intents and Intent Filters](https://developer.android.com/guide/components/intents-filters)
