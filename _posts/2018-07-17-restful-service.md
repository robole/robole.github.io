---
layout: post
title: Building a RESTful Web Service in Spring for beginners ☕
category: programming
tags: [rest, Java, Spring]
published: true
---
I want to go a bit beyond the trivial [Hello World example](http://spring.io/guides/gs/rest-service/) from the Spring website to build a simple [restful service](http://spring.io/understanding/REST) that is closer to something you would realistically build. I have seen other tutorials that can overwhelm beginners with some aspects that are not explained, and could be excluded.

# What you’ll build

You’ll build a service for a *user*, something that is core thing in a lot of web applications. The table below summarises the actions we create for our *user*/

The default local address for your Spring Boot application should be: ```http://localhost:8080```, so the address
to get all users would be ```http://localhost:8080/users``` for example.

<table>
  <tr>
    <th>HTTP Method</th>
    <th>Address</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users</td>
    <td><a href="#create-a-controller">Get all users</a></td>
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

# Understanding REST in Spring

Spring is evolving version by version, so its worth noting that you may
see some differences between tutorials. I would always suggest looking at the most recent tutorial that you can find!

A more common issue when beginning to learn REST in Spring is that tutorials
expect you to know the [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) that are being implicitly used, even though this is a [good tutorial](). Bigger applications are divided into layers with particular responsibilities, this makes it easier to maintain
them. You can learn design patterns separately beyond this, but you need
to look at the [Model-View-Controller (MVC)](https://blog.codinghorror.com/understanding-model-view-controller/)
design pattern to understand what you're doing, because all implementations follow it, as far as I know!

You may also see the use of the following design patterns in an example,
you *should* skip learning them if your objective is just to understand REST,
but I mention them here if it is something you want to return to:
- [Data Access Object layer](https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm) / [Repository layer](http://blog.sapiensworks.com/post/2014/06/02/The-Repository-Pattern-For-Dummies.aspx) : controls access to the stored data, so
other parts of the application do not know about the source of the data.
- [Service layer](https://martinfowler.com/eaaCatalog/serviceLayer.html): business logic goes here, and it may use multiple repositories. For example, a Book Service might use the user repository and book repository to offer functionality such as "search for my books", and validate if the user is logged in.

Don't be daunted by what I just mentioned, it is more straightforward than you think!

# Getting Started

You can read the "How to complete this guide" section in the [Hello World example](http://spring.io/guides/gs/rest-service/) if you need guidance on how to set-up your project.

Only one dependency is required and that's the *Spring Boot Starter Web*.
I will use maven and include it as below. You can download my completed project from:
[https://github.com/robole/user-spring-rest](https://github.com/robole/user-spring-rest).

```xml
<dependencies>
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>
```

## Create the model class

Spring Web follows the
[Model-View-Controller design pattern (MVC)](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm) as mentioned already.

The *model* is what we want our program to be about. We want to create a ```User``` class that has the attributes: *id*, *name*, and *age*.

__You must include a no argument constructor when you have a POST
or PUT request, or Spring will give you an error.__

We add the typical methods to make a regular java class.

```java
public class User {
    private long id;
    private String name;
    private int age;

    //you must include this when you have a POST or PUT
    public User(){

    }

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

We annotate our Controller with ```@RestController```, and we add methods to
handle the different requests. Spring is going to transform the data into JSON for us before it is returned as a reponse.

I have created an ```ArrayList``` of users to have
some data to return. ```getUsers()``` returns all of the users
for the address [http://localhost:8080/users](http://localhost:8080/users). We specify this in the ```@RequestMapping```.

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

## @RequestMapping Variants

Spring 4.3 introduced shortcut annotations, which serve the same purpose as ```@RequestMapping``` but have the HTTP method as part it's name.

You may seen them used also. They are:
- ```@GetMapping```
- ```@PostMapping```
- ```@PutMapping```
- ```@DeleteMapping```
- ```@PatchMapping```

So, to annotate your  method you could use this:

```java
@GetMapping(value="/users")
```

or this:

```java
@RequestMapping(method=GET, value="/users")
```

## Create a class to start a Spring Boot application

Spring Boot simplifies the creation of an application. We only need to annotate a class with ```@SpringBootApplication```, and in ```main()```
we call the static method  ```SpringApplication.run()``` to launch the application. Spring Boot will package the application and run it in an embedded web server to create our web services for us.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
```

Easy peasy!

## Run the application

You can run the ```DemoApplication``` class, and test it in the browser.

![get request](/assets/img/blog/2018-07-17-restful-service/get.png)

# Get user by id

To get the user by id, we want to be able to specify the id inside the address path, this is called a __path variable__.

For example, we navigate to [http://localhost:8080/users/2](http://localhost:8080/users/2) to get
the user with an id of 2, and we expect to get this response:

```javascript
[{"id":2,"name":"Angela Merkel","age":20}]
```

We put the variable name within curly brackets as part of our ```@RequestMapping``` annotation, and we declare it using the ```@PathVariable``` annotation in our method signature. We search through our ```ArrayList``` to find the first user with that id.

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

# Get user by name

To get the user by name, we want to be able to specify a parameter at the end of the address. For example, we navigate to
[http://localhost:8080/users?name=rob oleary](http://localhost:8080/users?name=rob oleary)
to get the user with a name of "rob oleary".

A browser may add "+" for the space in the address like this: http://localhost:8080/user?name=rob+oleary,
spaces in web addresses are considered [unsafe](https://stackoverflow.com/questions/497908/is-a-url-allowed-to-contain-a-space). You don't need to do anything
differently, it will work either way! We expect to get this response:

```javascript
[{"id":1,"name":"Rob OLeary","age":21}]
```

We need to add ```params``` to our ```@RequestMapping``` to specify the parameter name. We need this to define an unique path, so Spring can map the request to the correct method with certainty. We specify ```@RequestParam``` in our method signature, and we can use this variable inside our method to search for the user with that name. We use
```equalsIgnoreCase()``` to accept whatever mix of big and small letters we get from the client.

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

# Add a new user

- HTTP POST

We add the user to our ```ArrayList```. We use ```ResponseEntity``` as our method return type, it is a wrapper class where we can optionally include things such as: the status code (outcome of action), and headers to give the client some information about the action.

We return a status code of HttpStatus.CREATED, which is HTTP code of 201. There is no opportunity for there to be a failure to add a new user to our ```ArrayList```, but you should consider this if you use a database.

```java
@PostMapping(value="users")
public ResponseEntity add(@RequestBody User u) {
       users.add(u);
       return new ResponseEntity(u, HttpStatus.CREATED);
}
```

# Update a user

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

# Partial update of a user

- HTTP PATCH

PATCH is used when we update some fields of an object. This can be important when we use a database as it is more efficient to only update what has changed, rather than replacing an entire object. As we are doing everything in memory with an ```ArrayList```, there is no benefit to this, so __I have not included a method__.

# Delete a user

- HTTP DELETE

We remove the user from our ```ArrayList```, and  return a status code to
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

# How to verify (test) your application

This is just to verify your code works really. If you want to unit test your code, this is a separate topic.

As mentioned previously, GET methods can be tested in your browser.

To test the other methods, you need a rest client like [Postman](https://www.getpostman.com/), or a command-line tool like
[cURL](https://curl.haxx.se/).

I will show you one example using Postman here. To add a new user, we
make a POST request like below, we put the JSON of the new user in the request body, and set the header *Content-Type* to "application/json" (you can see it chosen as "JSON(application/json)" in orange text in the picture).

![post request](/assets/img/blog/2018-07-17-restful-service/post.png)

# Source code

Available [here](https://github.com/robole/user-spring-rest) on github.  

# Next steps

If you want to learn about unit testing and intgeration of this application, you
can read [this post]({{ site.baseurl }}{% post_url 2018-08-01-test-restful-service %}).

You probably want to use a database to have long-term data.
You can use Spring Data Rest for this. You can look at my [library example](https://github.com/robole/library-rest-minimum) to explore this, or look at [this javacodegeeks tutorial](https://www.javacodegeeks.com/2018/08/restful-api-spring-rest-data-jpa-h2.html).

If you want a more comprehensive tutorial on building a complete RESTful service that includes: using a database with JPA; error handling; testing; building a HATEOAS REST service; and adding security, you can look at [this tutorial](https://spring.io/guides/tutorials/bookmarks/) from the Spring website. I found the testing section to be a bit poor, they are confusing unit testing with integration testing, so I would skip this section.
