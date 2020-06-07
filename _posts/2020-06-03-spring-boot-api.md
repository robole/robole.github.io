---
layout: scrollable_post
title: "From 'A' to 'Web App': Build an API in Java 🕸☕"
description: "Understand the core concepts behind a building an API, and build a realistic API in Java with Spring Boot"
category: java
image: /assets/img/blog/2020-06-03-spring-boot-api/web-city.png
tags: [API, Java, Spring]
published: true
---

<img src="/assets/img/blog/2020-06-03-spring-boot-api/web-city.png" alt="web city!"/>

- [What is an API?](#what-is-an-api)
- [Twitter API Example](#twitter-api-example)
- [What is Spring and Spring Boot?](#what-is-spring-and-spring-boot)
- [What we will build](#what-we-will-build)
- [Is this the latest way?](#is-this-the-latest-way)
- [Is there anything I should know before I start?](#is-there-anything-i-should-know-before-i-start)
  - [A little bit about Design Patterns](#a-little-bit-about-design-patterns)
    - [Model View Controller (MVC)](#model-view-controller-mvc)
    - [Other patterns that are used in more advanced examples](#other-patterns-that-are-used-in-more-advanced-examples)
  - [HTTP Basics](#http-basics)
    - [Uniform Resource Locator (URL)](#uniform-resource-locator-url)
    - [HTTP Request](#http-request)
    - [HTTP Response](#http-response)
    - [Further Reading on HTTP](#further-reading-on-http)
  - [A little bit about JSON](#a-little-bit-about-json)
    - [Further Reading on JSON](#further-reading-on-json)
  - [A little bit about REST](#a-little-bit-about-rest)
- [What you need to complete this tutorial](#what-you-need-to-complete-this-tutorial)
- [How to set your project up](#how-to-set-your-project-up)
- [Write the code](#write-the-code)
  - [Get All Users](#get-all-users)
  - [Get User by ID](#get-user-by-id)
  - [Get User by Name](#get-user-by-name)
  - [Add a new User](#add-a-new-user)
  - [Update a User](#update-a-user)
  - [Delete a User](#delete-a-user)
- [How to test your application](#how-to-test-your-application)
- [Source code](#source-code)
- [Next Steps](#next-steps)

I'm writing this tutorial to fill a void that I have noticed. Building web applications is a top priority for people learning backend development, but I haven't seen any Java/Spring Boot tutorials that provide a clear path to get you there quickly with the least amount of friction. Tutorials are either too trivial ([Hello World API](http://spring.io/guides/gs/rest-service/)) to help you understand what you need to know; or they overwhelm beginners and assume too much about what you already know!

The only thing you should know already is Java, to an intermediate level, everything else I will cover along the way. If you are familiar with a topic already, you can skip ahead. This way, you know that there are no gaps in your knowledge, or blindspots in your learning path.

I will build a simple Web API with Spring Boot, which is a big step towards what you would build for an enterprise-grade application.

## What is an API?

It is common now for companies to give access to their data through APIs. API stands for Application Programming Interface, it is a list of methods we can use to interact with a company's backend systems over the internet. These methods are often referred to as web services.

<img src="/assets/img/blog/2020-06-03-spring-boot-api/api.png" alt="api diagram" style="display:block;width:100%;max-width:1250px;" loading="lazy"/>

Let's look at an example of an API to clarify what it is exactly!

### Twitter API Example

I'm guessing you know what Twitter is already, but let's state what it is regardless, Twitter is a social micro-blogging website. It's become more than that over time, now it's where Donald Trump goes to vent! ✍😡

[Twitter's API reference](https://developer.twitter.com/en/docs/api-reference-index) gives you a long categorized list of methods. You can perform a wide range of actions on: tweets, direct messages, your personal account settings, and more. Almost everything you can do on the website is possible to do through the API. If you wanted to, you could use the API to build an entirely different front-end for Twitter, or a TwitterBot.

<img src="/assets/img/blog/2020-06-03-spring-boot-api/twitter-api-reference.png" alt="twitter api reference" style="display:block;border:1px black solid;max-width:1250px;width:100%;" loading="lazy"/>

Let's take an example of using the API, say we want to get all of the tweets from the timeline of **@spiderman**.

<img src="/assets/img/blog/2020-06-03-spring-boot-api/twitter-api.png" alt="twitter api diagram" style="display:block;width:100%;max-width:1250px;" loading="lazy"/>

Looking through the list of methods, [GET statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline) appears to be the method that matches what we want. This is the method description:

<img src="/assets/img/blog/2020-06-03-spring-boot-api/twitter-user-timeline-endpoint.png" alt="Twitter API user timeline request and response" style="display:block;border:1px black solid" loading="lazy"/>

We need to have a client application to execute the methods. I like to use [Insomnia](https://insomnia.rest/), but other popular applications are: [cURL](https://curl.haxx.se/) (a command-line tool), [Postman](https://www.postman.com/) (a collaboration platform for API Development), and [Postwoman](https://postwoman.io/) (a minimal open-source alternative to Postman).

If you are totally unfamiliar with HTTP, you can jump to the [HTTP Basics](#html-basics) section to get yourself up to speed. Looking at the method description, we need to provide 1 parameter in our HTTP request to get the data we want, this parameter is `screen_name`.

To use Twitter's API, you have to have a Twitter account, and register an application to obtain developer keys. When you interact with the API, you provide these developer keys to authenticate your identity. This ensures that only you can only perform actions on your own account data, and generally that you use the platform in a fair way.

You need to do some configuration in your Twitter account settings to get the developer keys. It's not obvious to locate the place in the settings for this! I wont show you how here, the focus is to show you what an API is. Below is the request (on the left) and the response received (on the right).

<img src="/assets/img/blog/2020-06-03-spring-boot-api/twitter-req.jpg" alt="\Twitter API user timeline request and response" style="display:block;width:100%;max-width:1353px;margin:0 auto;" loading="lazy"/>

You can see that our `screen_name` parameter is appended to the URL in our request. We use a question mark to mark the beginning of our parameters, then we provide the parameter name and value. You can provide a list of parameters if you need to, you separate each parameter with an ampersand.

The response returns a JSON array of tweets. The content of a tweet is contained in the `text` field. As you can see the latest Tweet from Spiderman is: "_Learn how to draw Miles Morales, AKA Spider-Man, in this special Spanish-speaking lesson with artist @MikeHawthorne… https:\/\/t.co\/RdvzWVzJ4o._". 🕸️🎨

## What is Spring and Spring Boot?

Spring is an open-source application framework. You can think of it a swiss-army knife for creating enterprise applications, it has different modules that provide a range of functions such as: authentication, data access, inversion of control, messaging, web services, and so on.

<img src="/assets/img/blog/2020-06-03-spring-boot-api/swiss-army-knife.svg" alt="swiss army knife" style="display:block;width:100%;max-width:400px;margin:0 auto;" loading="lazy"/>

Spring’s philosophy is:

- Good design is more important than the underlying technology.
- Classes that are loosely coupled through interfaces is a good model.
- Code should be easy to test.

Spring follows convention-over-configuration. By following certain conventions such as naming things in a certain way, and implementing certain interfaces, it saves you writing a lot of repetitive code (boilerplate). It takes care of some of the cumbersome work for you, some things happen in the background magically!

Spring Boot makes life easier to create stand-alone, Spring-based applications. It is preconfigured with the Spring team's "opinionated view" of the best configuration of the Spring platform and third-party libraries, so you can get started with minimum fuss. It has an embedded web server, so no need to manually deploy your application, you can just run your application.

## What we will build

We’ll build a web service for a _User_. We want someone to use our app, don't we? 😅🙏

We will not use a database like a real application would. We will have some dummy data to mimic this.

The table below summarises our User API.

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

When we run our App. The default local address for your Spring Boot application should be: `http://localhost:8080`, so the address to get all users would be `http://localhost:8080/users` for example.

## Is this the latest way?

Spring is evolving version by version, so its worth noting that you may see some differences between examples, and this can be a bit confusing. Most choices are stylistic, and some are based on changes to the framework over time. The current stable version of Spring is 5.25, and 2.3.0 for Spring Boot.

If you use _Spring Data Rest_ rather than the _Spring Web_ starter dependency, you can do things differently. With _Spring Data Rest_, default controllers will be built by Spring for you, so if you are happy with the defaults in the convention, you do not have to define your own.

I would always suggest looking at the most recent tutorial that you can find, and choose a tutorial style that matches your learning preferences.

## Is there anything I should know before I start?

A common issue when beginning to learn how to build APIs with Spring Boot is that tutorials expect you to know something about the [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) that are being implicitly used by Spring; or they treat it as a mechanical process to follow: put this here, write a method like this, add this annotation, and on and on. This isn't a great way to learn. I will help you to understand why you're doing things in a particular way.

### A little bit about Design Patterns

A design pattern is a _general, reusable solution to a commonly occurring problem_.

Design patterns can speed up the development process by providing tested, proven solutions. Reusing design patterns helps to prevent small mistakes that can cause major problems later on.

Bigger applications are divided into layers with particular responsibilities, this makes it easier to maintain
them. Spring uses the [Model-View-Controller (MVC) ](https://blog.codinghorror.com/understanding-model-view-controller/) design pattern for building web applications.

#### Model View Controller (MVC)

The big idea behind MVC is that each _layer_ of your code has a specific purpose.

What is the purpose of each layer:

- **Model**: The Model captures the real-world things your application is concerned with. It _models_ the real world. The classes in the model are used to store and manipulate the state of your application.
- **View**: The View is the user interface. It renders the model to the user. In a web application, this is the web pages we write in HTML. It is covers the "front-end" of your application. <u>**We don't write this in our example application.**</u>
- **Controller**: The Controller layer is the liaison between the Model and the View layers, it receives the user input and decides what to do with it. A Controller in a web application has two parts. The first part is the web server that matches incoming HTTP Requests to a particular handler method, this is built-in part of Spring Boot. The second part is the handler methods themselves, which can be confusingly called "controllers" also, this is the bit that we write. The handler methods are responsible for returning data from the model.

<img src="/assets/img/blog/2020-06-03-spring-boot-api\mvc.svg" alt="MVC diagram" style="display:block;margin:0 auto;" loading="lazy"/>

The advantage of this approach is that our application is more [loosely-coupled](https://en.wikipedia.org/wiki/Loose_coupling). You can change the view, but the model can remain the same. This separation of responsibility is what makes our application more maintainable.

If you would like a more in-depth explanation, you can read this [MVC article](https://blog.codinghorror.com/understanding-model-view-controller/).

#### Other patterns that are used in more advanced examples

In our example, we only use the MVC pattern implicitly.

In more **advanced examples**, you may also encounter or need to use the following design patterns:

- [Data Access Object layer](https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm) / [Repository layer](http://blog.sapiensworks.com/post/2014/06/02/The-Repository-Pattern-For-Dummies.aspx) : When you use a database, you will probably use one of these patterns. This layer controls access to the stored data, it isolates other parts of the application from knowing about the source of the data, they don't know if it is a database or spreadsheet or text file! Spring has a number of [Spring Data libraries](https://spring.io/projects/spring-data) to support data repositories.
- [Service layer](https://martinfowler.com/eaaCatalog/serviceLayer.html): This layer is where our common business logic lives. A service uses repositories to perform tasks. For example, a Book Service might use the User repository and Book repository to offer functionality such as "search for my books".

### HTTP Basics

Hypertext Transfer Protocol (**HTTP**) is the foundation of data communication for the World Wide Web. It is a protocol that controls data transfer between a client application (such as a Web Browser) and a web server. Clients and servers communicate by exchanging individual messages. The messages sent by the client are called _requests_ and the messages sent by the server in reply are called _responses_.

The target of an HTTP request is called a _resource_. Generally a web resource is a file on web server such as a document or a photo; but it has evolved to encompass any "thing" that is uniquely identifiable. Now it can encompass abstract resources such as classes and properties. Each resource is identified by a Uniform Resource Identifier (URI).

#### Uniform Resource Locator (URL)

The most common form of URI is the Uniform Resource Locator ([URL](https://developer.mozilla.org/en-US/docs/Glossary/URL)), which is known as the _web address_. This is what you type into your Web Browser to load a page. A

A URL is composed of different parts, some are mandatory and others are optional.

<img src="/assets/img/blog/2020-06-03-spring-boot-api/url.png" alt="url syntax" loading="lazy"/>

1. **Scheme or protocol**: It indicates which protocol must be used. Usually it is the HTTP or its secured version, HTTPS. This is _required_.
2. **Authority or domain name**: This indicates the name of the Web Server being requested. Alternatively, it is possible to directly use an IP address, but because it is less convenient, it is not often used on the Web. This is _required_.
3. **Port**: A port is a logical identifier to locate a specific process or service on the Web Server. It is usually omitted if the web server uses the standard ports of the HTTP protocol (80 for HTTP and 443 for HTTPS) to grant access to its resources. This is _optional_.
4. **Path**: Is the path to the resource on the Web server. The path can represent a physical file location on the Web Server, or can be an abstraction handled by Web servers to find the resource.
5. **Query**: It is a list of parameters. The parameters are a list of key-value pairs separated with an ampersand (`&` ). The Web server can use the parameters to do some conditional logic. This is _optional_.
6. **Fragment**: It is an anchor to a part of the resource itself. An anchor is like a "bookmark" inside the resource, giving the browser the directions to show the content located at that spot. In an HTML document, for example, the browser will scroll to the point where the anchor is defined; for a video, the browser will try to go to the time the anchor represents. This is _optional_.

#### HTTP Request

A **HTTP request** consists of the following:

- a request line. For example, `GET http://localhost:8080/users/1 HTTP/1.1`, which wants to retrieve a resource identified by the path `/users/1` from the server,
- request header fields,
- an empty line,
- and an optional message body.

```
GET http://localhost:8080/users/1 HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
DNT: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
```

HTTP defines a set of **request methods** that define the action to be performed on a given resource. They are sometimes referred to a HTTP verbs. The following HTTP request methods are used in web applications:

- **GET**: Retrieve data of a resource.
- **POST**: Create a new resource.
- **PUT**: Update or replace a resource.
- **PATCH**: Update or modify a resource.
- **DELETE**: Delete a resource.

You will often see the core functions of a web application referred to as CRUD, which stands for: Create, Read, Update, Delete.

#### HTTP Response

The **HTTP Response** consists of the following:

- a status line which includes the status code and reason message,
- response header fields,
- an empty line,
- an optional message body.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Mon, 01 Jun 2020 15:16:54 GMT
Keep-Alive:	timeout=60
Transfer-Encoding: chunkedtes
Connection: close

{"id":1,"name":"Rob OLeary","age":21}
```

Below is a **summary of the typical content in a Response for the methods**.

<table class="table table-striped table-bordered">
						<thead>
							<tr>
								<th>HTTP Method</th>
                                <th>CRUD</th>
								<th>Response for an entire collection (e.g. /users)</th>
								<th>Response for a specific item (e.g. /users/{id})</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>POST</td>
								<td>Create</td>
								<td>Status Code: 201 (Created) if successful, 404 (Not Found) or 409 (Conflict) if the resource already exists. <br><br>'Location' header with link to /users/{id} where {id} is the new ID.</td>
								<td>Status Code: 201 (Created) if successful, 404 (Not Found) or 409 (Conflict) if the resource already exists.</td>
							</tr>
							<tr>
								<td>GET</td>
								<td>Read</td>
								<td>Status Code: 200 (OK). <br><br>A list of users contained in the body. <br><br>Pagination, sorting and filtering is used to enable navigation of big lists.</td>
								<td>Status Codes: 200 (OK) if successful, 404 (Not Found) if the ID is not found or invalid.<br><br>Return the customer data in the body if it is successful.</td>
							</tr>
							<tr>
								<td>PUT</td>
								<td>Update/Replace</td>
								<td>Status Code: 405 (Method Not Allowed), unless you want to update/replace every resource in the entire collection.</td>
								<td>Status Codes: 200 (OK) or 204 (No Content) if successful. 404 (Not Found), if the ID is not found or invalid.</td>
							</tr>
							<tr>
								<td>PATCH</td>
								<td>Update/Modify</td>
								<td>Status Code: 405 (Method Not Allowed), unless you want to modify the collection itself.</td>
								<td>Status Codes: 200 (OK) or 204 (No Content) if successful. 404 (Not Found), if the ID not found or invalid.</td>
							</tr>
							<tr>
								<td>DELETE</td>
								<td>Delete</td>
								<td>Status Code: 405 (Method Not Allowed), unless you want to delete the whole collection, which is rarely desirable.</td>
								<td>Status Codes: 200 (OK) if successful,  404 (Not Found), if the ID is not found or invalid.</td>
							</tr>
						</tbody>
					</table>

#### Further Reading on HTTP

For a more complete guide to HTTP, you can read [Mozilla's HTTP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP)

### A little bit about JSON

JSON stands for JavaScript Object Notation, and is a syntax for storing and exchanging data. JSON has become the favoured data format for web services, with [XML](https://www.w3schools.com/xml/) being used less nowadays.

One of the reasons JSON is popular is that we can convert any JSON received from the server into JavaScript objects without any complicated parsing and translations, and since JavaScript is the language of the Web Browser, this makes building web applications simpler.

The syntax rules are simple:

- Data is in name-value pairs,
- Strings are contained in quotations,
- Data is separated by commas,
- Curly braces hold objects,
- Square brackets hold arrays.

For example, a user object would be written as:

```json
{ "name": "John", "age": 31 }
```

An array of users would be written as:

```json
[
  { "name": "John", "age": 31 },
  { "name": "Mary", "age": 30 }
]
```

#### Further Reading on JSON

This should be enough for you to know when dealing with web services, but for further information, [W3schools has a short tutorial series on JSON](https://www.w3schools.com/js/js_json_intro.asp).

### A little bit about REST

You may have noticed I barely speak about REST in this article, and that's because I think it is a term misused too often.

Representational state transfer (REST) is an architectural style that defines a set of constraints that can be followed when creating web services, which recommends using many of the conventions of the web. It was proposed by Roy Fielding in his doctoral dissertation in 2000.

I recommend reading [this Stack Overflow thread on "What is Restful Programming"](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming) to understand more about it, and you can see some of the diversity of opinions on what a REST API is "in the wild".

If you build web services with a framework like Spring Boot, you follow some of the conventions of restful API design by default, but some would consider it a HTTP-based web service, rather than a restful web service. It gets murky quickly when people talk about how restful a web application is by comparing it to the academic definition, I don't think it is a productive endeavour to do so.

One of the constraints of REST is to use [Hypermedia as the Engine of Application State (HATEOS)](http://restcookbook.com/Basics/hateoas/), which can be done in Spring Boot if you use the _Spring Data Rest_ starter dependency. In practice, most APIs do not follow this constraint, and this leads some people to say, "well, it is not a rest API then". 😅 There is merit in following this constraint, but for a clients to use HATEOAS properly takes more work, and I guess that's why people tend to avoid it.

For me, the key part is to be pragmatic when making web services, make them intuitive to use, and easy to extend. What most people tend to agree on, and follow, is to arrange an application into _resources_, we do this in our Model, and leverage HTTP methods to implement functionality on a resource. The convention is to use an uniform path for a resource such as `/users`, which is the pluralized version of the name of the resource. This is an exceptional post about [pragmatic restful API design](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api), if you want to understand the conventions well.

## What you need to complete this tutorial

- About 1 hour.
- Your favourite text editor or IDE.
- JDK 1.8 or later.
- Gradle or Maven. You can skip this depending on your IDE, for example IntelliJ has maven built-in. I use maven.

## How to set your project up

You can use [Spring Initializr](https://start.spring.io/) to create your project. It offers a fast way to create a skeleton project.

<strong>Only one dependency is required for this project and that is <i>Spring Web</i></strong>.

To use [Spring Initializr](https://start.spring.io/), fill in fields, and click generate. You can then download your project in a zip file.

![Spring Initializr configuration](/assets/img/blog/2020-06-03-spring-boot-api/spring-initializr.jpg)

Unzip the file and open it in your IDE of choice.

The dependencies may be downloaded automatically by your IDE when you import/open the project, or you may need to trigger the download yourself:

- In IntelliJ, you can go to `File > Synchronise` in the menu to trigger the download.
- On the command-line:
  - For maven, run the command `mvn install`.
  - For gradle, run the command `gradle build`.

Spring Initializr creates a default class to run you web application called **_UserApplication.java_**. You can run this to verify you are set-up correctly. It will run a web server for you, nothing more than that because we have written any code yet! You should see something like this on the command-line if it is set-up correctly:

![Spring Initializr configuration](/assets/img/blog/2020-06-03-spring-boot-api/spring-boot-verify.jpg)

You can follow along and write the code with me, or you can download [the complete code from github](https://github.com/robole/spring-boot-api-for-beginners).

## Write the code

### Get All Users

Let's begin by writing the code to get all of our users.

#### Create the model class

Our application is all about the user, which every application should be! 😉

We want to create a `User` class that has the attributes: _id_, _name_, and _age_.

Behind the scenes, Spring may need to create empty objects when creating or updating users (responding to POST and PUT requests). So, you always need to include a no-args constructor if you want to support these actions.

We add the typical methods to make a regular java class. Setter and getters are required for retrieving and modifying the attributes. We must include `equals` and `hashCode` methods to support the comparison of _User_ objects. I used IntelliJ to generate all of these methods.

```java
public class User {
    private long id;
    private String name;
    private int age;

    //you must include a no-args constructor when you have a POST or PUT method
    public User(){ }

    public User(long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    //getters and setters, equals() and hashCode() generated by IDE
}
```

#### Create a Controller

Remember, the controller is responsible for matching the HTTP request with a java method that returns a response.

We add annotations to our Controller to implement functionality. `@RestController` marks the class as a Rest Controller, so Spring can link some functionality. We specify that the Controller should interpet all requests for the path `/users` with `@RequestMapping ("/users")`.

We add methods to handle different requests and annotate them to indicate the HTTP method they are responding to. We return data from the method and Spring is going to transform the data into JSON for us and return it in a response.

I have created an `ArrayList` of users to have some data to return.

The `getUsers` method (you can call it whatever you want) returns all of the users for the URL [http://localhost:8080/users](http://localhost:8080/users). We tie the URL with our method using an annotation of `@RequestMapping` or `@GetMapping`. We return the `ArrayList` from our method.

```java
import com.roboleary.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping ("/users")
public class UserController {
    List<User> users = new ArrayList<User>();

    public UserController(){
        users.add(new User(1, "Rob OLeary", 21));
        users.add(new User(2, "Angela Merkel", 20));
        users.add(new User(3, "Tamer Osman", 20));
    }

    //for GET to http://localhost:8080/users
    @GetMapping
    public List<User> getUsers(){
        return users;
    }
  }
```

##### @RequestMapping Variants

Spring 4.3 introduced shortcut annotations, which serve the same purpose as `@RequestMapping` but have the HTTP method as part it's name.

You may seen them used also. They are:

- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`
- `@PatchMapping`

So, to annotate your method you could use this:

```java
@GetMapping
```

or this:

```java
@RequestMapping(method=GET)
```

#### Create a class to start the application

If you used Spring Initialzr, then this class is already created for you!

This is the main class which initiates the packaging of your web application, and then starts an embedded web server to run our web service for us.

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

That's the hard bit done!

##### Run the application

Does it work? Run the `UserApplication` class, you can test the `GET` method in your Web Browser.

![get request](/assets/img/blog/2020-06-03-spring-boot-api/get.jpg)

### Get user by ID

To get the user by ID, we want to be able to specify the ID in the URL.

For example, we navigate to [http://localhost:8080/users/2](http://localhost:8080/users/2) to get the user with an ID of 2, and we expect to get this response:

```javascript
[{ id: 2, name: "Angela Merkel", age: 20 }];
```

We put the variable name within curly brackets as part of our `@GetMapping` annotation, and we declare it using the `@PathVariable` annotation in our method signature. We search through our `ArrayList` to find the first user with that id.

If an user is found, we return an *OK* status (200). If the user is not found, we return a *Not Found* Status (404).

```java
@GetMapping(value="/{id}")
public ResponseEntity getUsersById(@PathVariable("id") long id){
    User userFound = null;

    for(User user: users){
        if(user.getId() == id){
            userFound = user;
            break;
        }
    }

    if (userFound == null) {
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //found
    return new ResponseEntity(userFound, HttpStatus.OK);
}
```

### Get user by name

To get the user by name, we want to be able to specify a parameter at the end of the URL.

For example, we navigate to [http://localhost:8080/users?name=rob oleary](http://localhost:8080/users?name=rob oleary)
to get the user with a name of "rob oleary".

A browser may add "+" for the space in the address like this: http://localhost:8080/user?name=rob+oleary,
spaces in URLs are considered [unsafe](https://stackoverflow.com/questions/497908/is-a-url-allowed-to-contain-a-space). You don't need to do anything differently, it will work either way! We expect to get this response:

```javascript
[{ id: 1, name: "Rob OLeary", age: 21 }];
```

We need to add `params` to our `@GetMapping` annotation to specify the parameter name. We need this to define an unique path, so Spring can map the request to the correct method with certainty.

We specify `@RequestParam` in our method signature, so we can use this variable inside our method to search for the user with that name. We use `equalsIgnoreCase()` to accept whatever mix of big and small letters we get from the client.

We return a status depending on if the user was found or not.

```java
@GetMapping(params = "name")
public ResponseEntity getUsersByName(@RequestParam(value="name") String name){
    List<User> filteredUsers = new ArrayList<User>();

    for(User user: users){
        if(user.getName().equalsIgnoreCase(name)) {
            filteredUsers.add(user);
        }
    }

    if (filteredUsers.isEmpty() == true) {
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //found
    return new ResponseEntity(filteredUsers, HttpStatus.OK);
}
```

### Add a new user

We add the user to our `ArrayList`. We use `ResponseEntity` as our method return type, it is a wrapper class where we can optionally include things such as: the status code (outcome of action), and headers to give the client information about the outcome.

This time our parameter is annotated with `@RequestBody`, this is because the data is provided in the body of the HTTP Request.

We return a status code of _HttpStatus.CREATED_, which is HTTP code of 201. There is no opportunity for there to be a failure to add a new user to our `ArrayList`, but you should consider this if you use a database.

```java
@PostMapping
public ResponseEntity add(@RequestBody User u) {
       users.add(u);
       return new ResponseEntity(u, HttpStatus.CREATED);
}
```

### Update a user

Updates a user, or add a new user if there is no user found.

A PUT method is idempotent, which means if you run the operation multiple times, the result is the same.

Our parameter is annotated with `@RequestBody` again.

We return different status codes depending on whether we updated or added a user.

```java
@PutMapping
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

We don't use PATCH in our web application. PATCH is used for partial update.

This may be used when you use a database as it is more efficient to only update specifically what has changed, rather than replacing an entire object. As we are doing everything in memory with an `ArrayList`, there is no benefit to this.

### Delete a user

We remove the user from our `ArrayList`, and return a status code to indicate if the user was found or not.

```java
@DeleteMapping(value="/{id}")
public ResponseEntity delete(@PathVariable("id") long id) {
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

## How to test your application

If you want to create automated tests for your code, this is a separate topic that deserves more time.

For now, as a sanity check, you can execute GET methods in your browser. You can use a client application like [Insomonia](https://insomnia.rest/) to execute other methods.

Here is a quick example to add a new user using Insomonia. We make a POST request like below, we put a JSON object of our new user in the request body, and set the body type to JSON (this usually sets the _Content-Type_ header to "application/json"). A status code of 201 indicates the user was created successfully.

![post request](/assets/img/blog/2020-06-03-spring-boot-api/post.jpg)

## Source code

You can download [the complete code from github](https://github.com/robole/spring-boot-api-for-beginners).

## Next steps

1. Learn to write (integration) tests for your web application.
1. Add a database to store your data long-term.
1. Build a complete API of something you are interested in.
1. Learn how to add authentication to control access to data.
1. Learn how to document your API. You can use libraries such as AsciiDoctor and Swagger to automate some of this.

Let me know if you are interested in a follow-up article regarding one of the topics above! 🙂

Happy coding! 👩‍💻🙌

<p style="font-size:.5em">Icons for diagrams are from the Noun Project: Mobile by Rainbow Designs, Cloud by James Kopina, Database by Kimmi Studios, User by Adrian Coquet, Twitter by Acid Beast.</p>
