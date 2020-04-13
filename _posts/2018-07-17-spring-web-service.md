---
layout: scrollable_post
title: Master the Web - Build a REST API with Spring for Beginners ☕
category: programming
tags: [rest, Java, Spring]
published: true
---
<img src="/assets/img/blog/2018-07-17-restful-service/spiderman.png" alt="web city!"/>

- [What is REST?](#what-is-rest)
  - [Twitter REST API Example](#twitter-rest-api-example)
- [What we will build](#what-we-will-build)
- [Understanding REST in Spring](#Understanding-REST-in-Spring)
  - [Design Patterns](#design-patterns)
- [What you need](#what-you-need)
- [How to set your project up](#how-to-set-your-project-up)
- [Get All Users](#get-all-users)
- [Get User by ID](#get-user-by-id)
- [Get User by Name](#get-user-by-name)
- [Add a new User](#add-a-new-user)
- [Update a User](#update-a-user)
- [Partial Update of a User](#partial-update-of-a-user)
- [Delete a User](#delete-a-user)
- [How to verify your application](#how-to-verify-your-application)
- [Source code](#source-code)
- [Next Steps](#next-steps)

<abbr title="REpresentational State Transfer">REST</abbr> <abbr title="Application Programming Interface">API</abbr>s are fundamental to building distributed web applications. It has become an ubquitious way to distribute our code and data to web applications. 

 I want to go a bit beyond the trivial [Hello World example from the Spring website](http://spring.io/guides/gs/rest-service/), and build a simple REST API, which is closer to what you would realistically build. 

 > You can probably do a copy-and-paste-edit code collage and make a web application, but it is better to understand what you are doing, and why you are doing it that way.

I have seen other tutorials that can overwhelm beginners with some concepts that are not explained well, or are not explained at all. You can probably do a copy-and-paste-edit code collage and make a web application, but it is better to understand what you are doing, and why you are doing it that way. I will go through it from start to finish. You can skip the bits you know.

## What is REST?

- REST stands for REpresentational State Transfer.
- REST is one of the underlying principles of the design of the internet: resources are exposed in an uniform way. 
- A client (web browser, mobile app, etc.) interacts with a server (a remote computer) over a network in complex ways without knowing what resources are on that server. When you browse the internet, you know the address of a homepage of a website, then you interact with the website to find out what information it has, and what functions it offers. It is similar with a REST API but we are concerned with data, rather than pages.
- You request a webpage by using it's web address, which is known as Uniform Resource Location (URL). The address you write in is probably it's base URL e.g. `http://www.google.com`, all other pages (resources) are related to that. 

  <img src="/assets/img/blog/2018-07-17-restful-service/address.png" alt="picture of web address in browser" style="display:block"/>

- The client and server agree on what media is transferred. This is the Application Type. The Application Type is HTML for web pages, and usually JSON or XML for data.
- The transfer is done by making a request using HTTP (Hypertext Transfer Protocol) specifying a HTTP Method. You use the GET method to retrieve data. This is the method you use every time you request a webpage in your browser.
- The server returns a response with the results.
  <img src="/assets/img/blog/2018-07-17-restful-service/req-res.png" alt="request response model for internet diagram" style="display:block"/>
- The differnt HTTP methods allow us to perform different actions to interact with a resource. These are commonly know as CRUD actions (Create, Read, Update, Delete).
 <img src="/assets/img/blog/2018-07-17-restful-service/rest-methods.png" alt="request response model for internet diagram" style="display:block"/>
  <br/>
- That's it in a nutshell really! You can see the answers to ["what is restful programming?"](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming) on Stack Overflow if you want to see the differing interpretations. 
<img src="/assets/img/blog/2018-07-17-restful-service/rest-basic.png" alt="basic rest api architecture" style="display:block"/>
- Restful Services follow the concepts of REST Architecture loosely or closely, there are different maturity levels of how well they conform to the architecture. We conform to level 3, more or less, which is typical. If you want to understand more behind that, you can read about the [4 Maturity Levels of REST API Design](https://blog.restcase.com/4-maturity-levels-of-rest-api-design/).
<br/>

If you're still a bit confused, don't worry. Let's look at an example of an API to clarify what we want to emulate, and then we can!

### Twitter REST API Example

It is common now for companies to share access some of their data to the public through Rest APIs. API stands for Application Programming Interface, which is just a list of public methods we can use to interact with the company data. 

Let’s look at the [Twitter API](https://developer.twitter.com/en/docs/api-reference-index). I'm guessing you know what Twitter is already!

The API reference gives you a long categorized list of methods. You can do anything with tweets, direct messages, account settings, all of the things you do through the website is possible to do through the API.

<img src="/assets/img/blog/2018-07-17-restful-service/twitter-api-reference.png" alt="twitter api reference" style="display:block;border:1px black solid"/>

Let's look at getting all of the tweets from the timeline of @spiderman. Looking through the list, [GET statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline) seems to be the method that matches what we want. This is the method description:

<img src="/assets/img/blog/2018-07-17-restful-service/twitter-user-timeline-endpoint.png" alt="Twitter API user timeline request and response" style="display:block;border:1px black solid"/>

We need to have a REST client to use the API. I like to use [Insomnia](https://insomnia.rest/). 

Based on the method description we need to provide 1 parameter in our request to get what we want, `screen_name`. 

You need to do some configuration in your Twitter account settings to get the developer keys for authentication,  we need to provide this in our REST request so that it is accepted by the Twitter server. It's a bit tedious to get this done! I wont show you how, the focus is on showing what the API is and how it can be used. This is what our request looks like on the left, and the response received is on the right.

![Twitter API user timeline request and response](/assets/img/blog/2018-07-17-restful-service/twitter-req.png)

You can see that our `screen_name` parameter is appended to the URL (highlighted in yellow). We use a question mark to mark the beginning of our parameters, then we provide the parameter name and value. You can provide a list of parameters if you need to, you separate each parameter by an ampersand.

As you can see the latest Tweet from Spiderman is telling everyone that you should "Be a Hero. Stay at Home.". 🕸️🙌 

## What we will build

We’ll build a service for a *User*. We want someone to use our App, dont we? 😅 

We will not use a database like a real application would. We will have some dummy data to mimic this functionality.

The table below summarises our *User* API.

When we run our App. The default local address for your Spring Boot application should be: `http://localhost:8080`, so the address
to get all users would be `http://localhost:8080/users` for example.

<table>
  <tr>
    <th>HTTP Method</th>
    <th>Address</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users</td>
    <td><a href="#get-all-users">Get all users</a></td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users/{id}</td>
    <td><a href="#get-user-by-id">Get users by id</a></td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users?name=rob+oleary</td>
    <td><a href="#get-user-by-name">Get user by name</a></td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/users</td>
    <td><a href="#add-a-new-user">Add a new user</a></td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/users</td>
    <td><a href="#update-a-user">Update a user</a></td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/users/{id}</td>
    <td><a href="#delete-a-user">Delete a user</a></td>
  </tr>
</table>

## Understanding REST in Spring

Spring is evolving version by version, so its worth noting that you may see some differences between examples, and this can be a bit confusing. I would always suggest looking at the most recent tutorial that you can find if you want to know more, or find a tutorial that is in the right style for you!

A common issue when beginning to learn REST with Spring is that tutorials expect you to know something about the [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) that are being implicitly used. So, I will tell you enough to know what you're doing!

### Design Patterns

- A design pattern is a general, reusable solution to a commonly occurring problem.
- Design patterns can speed up the development process by providing tested, proven solutions.
- Reusing design patterns helps to prevent small mistakes that can cause major problems later on.

Bigger applications are divided into layers with particular responsibilities, this makes it easier to maintain
them. Spring uses the [Model-View-Controller (MVC)](https://blog.codinghorror.com/understanding-model-view-controller/)
design pattern for building restful services.

Don't be daunted by what I just mentioned, it is more straightforward than you think!

## What you need

- About 1 hour
- A favorite text editor or IDE
- JDK 1.8 or later
- Gradle 4+ or Maven 3.2+. You skip this depending on your IDE, IntelliJ has maven built-in.

## How to set your project up

You can use [Spring Initializr](https://start.spring.io/) to create your project. The Initializr offers a fast way to pull in all the dependencies you need for an application and does a lot of the setup for you. Only one Spring Dependency is required for this project and that's *Spring Web*. Fill in fields. Choose Maven or Gradle, then click generate. You can then download your project in a zip file. 

![Spring Initializr configuration](/assets/img/blog/2018-07-17-restful-service/spring-initializr.png)

Unzip the file and open it in the IDE of your choice. 

The dependencies should be downloaded automatically to `C:\Users\<username>\.m2\repository` if you are a Windows user. You may have to trigger the downloading of the dependencies for you. In IntelliJ, you go to `File > Synchronise` in the menu.

**pom.xml** 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.2.6.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.spiderman</groupId>
	<artifactId>user</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>user</name>
	<description>My first REST API</description>
	<properties>
		<java.version>1.8</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
```

You can download the complete code from github: [https://github.com/robole/user-spring-rest](https://github.com/robole/user-spring-rest).

## Get All Users

### Create the model class

The *model* is what we want our program to be about. We want to create a `User` class that has the attributes: *id*, *name*, and *age*.

We add the typical methods to make a regular java class.

```java
public class User {
    private long id;
    private String name;
    private int age;

    //you must include a no-args constructor when you have a POST or PUT
    public User(){ }

    public User(long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    //getters and setters, equals() and hashCode()
}
```

## Create a Controller

The Controller is responsible for matching a HTTP request with a java method that provides a response.

We annotate our Controller with `@RestController`, and we add methods to handle the different requests. Spring is going to transform the data into JSON for us before it is returned as a reponse.

I have created an `ArrayList` of users to have some data to return. `getUsers()` returns all of the users
for the address [http://localhost:8080/users](http://localhost:8080/users). We specify this in the `@RequestMapping`.

```java
import com.roboleary.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
public class UserController {
    List<User> users = new ArrayList<User>();

    public UserController(){
        users.add(new User(1, "Rob OLeary", 21));
        users.add(new User(2, "Angela Merkel", 20));
        users.add(new User(3, "Tamer Osman", 20));
    }

    //for GET to http://localhost:8080/users
    @RequestMapping(method=GET, value="/users")
    public List<User> getUsers(){
        return users;
    }
  }
```

#### @RequestMapping Variants

Spring 4.3 introduced shortcut annotations, which serve the same purpose as `@RequestMapping` but have the HTTP method as part it's name.

You may seen them used also. They are:
- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`
- `@PatchMapping`

So, to annotate your  method you could use this:

```java
@GetMapping(value="/users")
```

or this:

```java
@RequestMapping(method=GET, value="/users")
```

### Create a class to start a Spring Boot application

Spring Initialzr already made this class for us `UserApplication`! This class initiates the packagaging of the application and then starts an embedded web server to run our restful service for us.

```java
package com.spiderman.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}

}
```

That's everything the hard bit done!

#### Run the application

You can run the `DemoApplication` class, and test the it in the browser.

![get request](/assets/img/blog/2018-07-17-restful-service/get.png)

## Get user by id

To get the user by id, we want to be able to specify the id inside the address path, this is called a __path variable__.

For example, we navigate to [http://localhost:8080/users/2](http://localhost:8080/users/2) to get
the user with an id of 2, and we expect to get this response:

```javascript
[{"id":2,"name":"Angela Merkel","age":20}]
```

We put the variable name within curly brackets as part of our `@RequestMapping` annotation, and we declare it using the `@PathVariable` annotation in our method signature. We search through our `ArrayList` to find the first user with that id.

```java
@RequestMapping(method=GET, value="/users/{id}")
public User getUsersById(@PathVariable("id") Long id){
    User found = null;

    for(User user: users){
        if(user.getId() == id){
            found = user;
            break;
        }
    }

    return found;
}
```

## Get user by name

To get the user by name, we want to be able to specify a parameter at the end of the address. For example, we navigate to
[http://localhost:8080/users?name=rob oleary](http://localhost:8080/users?name=rob oleary)
to get the user with a name of "rob oleary".

A browser may add "+" for the space in the address like this: http://localhost:8080/user?name=rob+oleary,
spaces in web addresses are considered [unsafe](https://stackoverflow.com/questions/497908/is-a-url-allowed-to-contain-a-space). You don't need to do anything
differently, it will work either way! We expect to get this response:

```javascript
[{"id":1,"name":"Rob OLeary","age":21}]
```

We need to add `params` to our `@RequestMapping` to specify the parameter name. We need this to define an unique path, so Spring can map the request to the correct method with certainty. We specify `@RequestParam` in our method signature, and we can use this variable inside our method to search for the user with that name. We use
`equalsIgnoreCase()` to accept whatever mix of big and small letters we get from the client.

```java
//for GET to http://localhost:8080/user?name=rob oleary
@RequestMapping(method=GET, value="/users", params = "name")
public List<User> getUsersByName(@RequestParam(value="name") String name){
    List<User> filteredUsers = new ArrayList<User>();

    for(User user: users){
        if(user.getName().equalsIgnoreCase(name)) {
            filteredUsers.add(user);
        }
    }

    return filteredUsers;
}
```

## Add a new user

- HTTP POST

We add the user to our `ArrayList`. We use `ResponseEntity` as our method return type, it is a wrapper class where we can optionally include things such as: the status code (outcome of action), and headers to give the client some information about the action.

We return a status code of HttpStatus.CREATED, which is HTTP code of 201. There is no opportunity for there to be a failure to add a new user to our `ArrayList`, but you should consider this if you use a database.

```java
@PostMapping(value="users")
public ResponseEntity add(@RequestBody User u) {
       users.add(u);
       return new ResponseEntity(u, HttpStatus.CREATED);
}
```

## Update a user

- HTTP PUT

Updates a user; or add a new user if there is no user found. It is idempotent, which means if you run the operation multiple times, the result
is the same.

We return different status codes depending on whether we updated or added a user.

```java
@PutMapping(value="users")
public ResponseEntity addOrUpdate(@RequestBody User u) {
    ResponseEntity response;

    if(users.contains(u)){
        //update by setting it at the specified position
        int index = users.indexOf(u);
        users.set(index, u);
        response = new ResponseEntity(u, HttpStatus.OK);
    }
    else{
        users.add(u);
        response = new ResponseEntity(u, HttpStatus.CREATED);
    }

    return response;
}
```

## Partial update of a user

- HTTP PATCH

PATCH is used when we update some fields of an object. This can be important when we use a database as it is more efficient to only update what has changed, rather than replacing an entire object. As we are doing everything in memory with an `ArrayList`, there is no benefit to this, so __I have not included a method__.

## Delete a user

- HTTP DELETE

We remove the user from our `ArrayList`, and  return a status code to
indicate if the user was found or not.

```java
@DeleteMapping(value="users/{id}")
public ResponseEntity delete(@PathVariable("id") Long id) {
    boolean found = false;

    for(User user: users){
        if(user.getId() == id){
            users.remove(user);
            found = true;
            break;
        }
    }

    if (found == false) {
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //found
    return new ResponseEntity(HttpStatus.OK);
}
```

## How to verify your application

This is just to verify your code works really. If you want to unit test your code, this is a separate topic.

As mentioned previously, GET methods can be tested in your browser.

To test the other methods, you need a rest client like [Insomnia](https://insomnia.rest/), or a command-line tool like
[cURL](https://curl.haxx.se/).

I will show you one example using Insomnia here. To add a new user, we make a POST request like below, we put the JSON of the new user in the request body, and set the header *Content-Type* to "application/json" (you can see it chosen as "JSON(application/json)" in orange text in the picture).

![post request](/assets/img/blog/2018-07-17-restful-service/post.png)

## Source code

You can download the complete code from github: [https://github.com/robole/user-spring-rest](https://github.com/robole/user-spring-rest).

## Next steps

You probably want to have a database to store long-term data. You can use Spring Data Rest for this. You can look at [this javacodegeeks tutorial](https://www.javacodegeeks.com/2018/08/restful-api-spring-rest-data-jpa-h2.html) to guide you with that. 

In more **advanced examples**, you will also see the use of the following design patterns:
- [Data Access Object layer](https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm) / [Repository layer](http://blog.sapiensworks.com/post/2014/06/02/The-Repository-Pattern-For-Dummies.aspx) : This layer controls access to the stored data, so that
other parts of the application do not know about the source of the data. You will create repositories when you have a database in Spring.
- [Service layer](https://martinfowler.com/eaaCatalog/serviceLayer.html): This layer is where our common business logic lives, it may use multiple repositories to perform tasks. For example, a Book Service might use the User repository and Book repository to offer functionality such as "search for my books",  validating if the user is logged in before it will return a list of the User's books.

If you are interested in a follow-up article to make a more complete app, let me know! Happy coding!