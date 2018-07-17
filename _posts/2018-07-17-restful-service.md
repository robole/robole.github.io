---
layout: post
title: Make a basic restful service in Spring ☕
category: programming
tags: [rest, Java, Spring]
published: true
---
I want to go a bit beyond the trivial [Hello World example](http://spring.io/guides/gs/rest-service/) from the Spring website to build
a simple [restful service](http://spring.io/understanding/REST) that is closer
to something you would realistically build.

# What you’ll build

You’ll build a service that will accept HTTP GET requests at:

```
http://localhost:8080/users
```

and respond with a JSON representation of a User:

```javascript
{"id":1,"name":"rob oleary", "age" : 21}
```

You can get users by id (hopefully just 1 user!):
```
http://localhost:8080/users/{id}
```

You can get all users by name:
```
http://localhost:8080/users?name=rob+oleary
```

You can get users by age:
```
http://localhost:8080/users?age=21
```

# Getting Started

You can read the "How to complete this guide" section in the [Hello World example](http://spring.io/guides/gs/rest-service/) if you need guidance on how to set-up your project.

Only one dependency is necessary and that's the *Spring Boot Starter Web*.
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
[Model-View-Controller design pattern (MVC)](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm).

We want to create a ```User``` class that has the attributes: *id*, *name*, and *age*.
The *model* is what our program is about, the subject of our program.

We add a constructor where we can provide the default values for all of the
attributes.

```java
public class User {
    private long id;
    private String name;
    private int age;

    public User(long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    //getters and setters
}
```

## Create a Controller

The Controller is responsible for matching a HTTP request with a java method that
provides a response.

We annotate our Controller with ```@RestController```, and we add methods to
handle the responses. Spring is going to transform the data into JSON before it is
returned.

I have created an ```ArrayList``` of users to have
some data to return. The ```getUsers()``` method returns all of the users when
the address [http://localhost:8080/users](http://localhost:8080/users) is navigated to. This is specified in ```@RequestMapping```.

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

## Create a class with a main()

Spring Boot simplifies the creation of an application. We only need to annotate
a class with ```@SpringBootApplication```, and in ```main()```
we call the static method  ```SpringApplication.run()``` to launch the application.
Spring Boot will package the application and run it in an embedded web server to
create our web services for us.

```
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

When we run our project, we get the following result when we navigate to
[http://localhost:8080/users](http://localhost:8080/users):

```javascript
[{"id":1,"name":"Rob OLeary","age":21},{"id":2,"name":"Angela Merkel","age":20},{"id":3,"name":"Tamer Osman","age":20}]
```

# Method using a path variable

To get the user by id, we want to be able to specify the id inside the address path.
For example, we navigate to [http://localhost:8080/users/2](http://localhost:8080/users/2) to get the user with
an id of 2. This is a common convention, and is favoured in designing a rest API.

We put the variable name within curly brackets in our ```@RequestMapping``` annotation, and
we declare it using the ```@PathVariable``` annotation in our method signature. We
search through our ```ArrayList``` to find any matches, there should only be one, but
somebody you be naughty and add  more than one user with the same id as it is!

```java
//for GET to http://localhost:8080/users
   @RequestMapping(method=GET, value="/users/{id}")
   public List<User> getUsersById(@PathVariable("id") Long id){
       List<User> filteredUsers = new ArrayList<User>();

       for(User user: users){
           if(user.getId() == id){
               filteredUsers.add(user);
           }
       }

       return filteredUsers;
   }
```

```javascript
[{"id":2,"name":"Angela Merkel","age":20}]
```

# Method using a parameter

To get the user by name, we want to be able to specify a parameter at the end of
the address. For example, we navigate to
[http://localhost:8080/users?name=rob oleary](http://localhost:8080/users?name=rob oleary)
to get the user with a name of "rob oleary". A browser may add "%20" or "+" for the
space in the address like this: http://localhost:8080/user?name=rob+oleary,
spaces in web addresses are considered [unsafe](https://stackoverflow.com/questions/497908/is-a-url-allowed-to-contain-a-space). Usually, it is "+" for a parameter value. It is just to note this, you don't need to
do anything differently, it will work either way!

We add a ```params``` to our ```@RequestMapping``` to speficy the parameter name. We need to indicate an unique path, so Spring can map the request to the correct method,
that is why we need to include that here. We specify ```@RequestParam``` in our method
signature, and we can use this variable inside our method.

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

```javascript
[{"id":1,"name":"Rob OLeary","age":21}]
```

# Next step

This example uses fake data created. You would probably add methods for POST, PUT,
PATCH, and DELETE as well to support creation, modification, and deletion of data.

And you could use Spring Data Rest to have a database stored the values. You can
look at my [library example](https://github.com/robole/library-rest-minimum) to
explore this.
