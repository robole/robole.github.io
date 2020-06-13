---
layout: post
title: "From 'A' to 'Web App': Test an API in Java 🕸☕"
category: testing
description: "There are different strategies and tools you can employ for testing web applications, I will break these down for you, and test the application from my previous post."
tags: [Java, Spring, testing]
image: /assets/img/blog/2020-06-14-api-testing/banner.svg
published: true
---

<img src="/assets/img/blog/2020-06-14-api-testing/banner.svg" alt="a spider dropping onto someone's head">

Bugs are an inevitable, unwelcome part of programming. By testing and code in tandem, you can eradicate a lot of bugs, and have more confidence in your code.

There are different strategies and tools you can employ for testing web applications, I will break these down for you, and test the application from my previous post. Although, I am testing a Spring Boot application, a lot of what I discuss can be applied to any web application written in Java, which you wish to test.

- [What should we test?](#what-should-we-test)
- [Unit tests](#unit-tests)
  - [What is a unit?](#what-is-a-unit)
  - [Sociable or Solitary?](#sociable-or-solitary)
- [Integration Tests](#integration-tests)
- [How many tests are enough?](#how-many-tests-are-enough)
- [Test libraries that you can use](#test-libraries-that-you-can-use)
- [Testing the application](#testing-the-application)
  - [How to Write Test Cases](#how-to-write-test-cases)
  - [Unit Test for User](#unit-test-for-user)
    - [Should I test POJOs](#should-i-test-pojos)
    - [Writing the Test Class](#writing-the-test-class)
    - [Execution Time for UserTest](#execution-time-for-usertest)
  - [Unit Test for UserController](#unit-test-for-usercontroller)
    - [Test Cases for UserController](#test-cases-for-usercontroller)
      - [getUsers (happy path)](#getusers-happy-path)
      - [getUsers (unhappy path)](#getusers-unhappy-path)
    - [Execution Time for UserControllerTest](#execution-time-for-usercontrollertest)
  - [Integration Test for UserController](#integration-test-for-usercontroller)
    - [Writing the Integration Test with a real server](#writing-the-integration-test-with-a-real-server)
    - [Test Cases for UserControllerIT](#test-cases-for-usercontrollerit)
      - [getUsers (happy path)](#getusers-happy-path-it)
      - [getUsers (unhappy path)](#getusers-unhappy-path-it)
    - [Execution Time for UserControllerIT](#execution-time-for-usercontrollerit)
  - [Write a Test Suite](#write-a-test-suite)
- [Source Code](#source-code)
- [Final Words](#final-words)
- [References](#references)

## What should we test?

The focus of this article is writing tests as a developer.

As developers, we write tests while writing code, so we can make more assured progress. Tests give us feedback that we haven't broken something along the way, and that our code works reasonably well. Tests also serve as invaluable "documents" to other developers, and to your future self, to understand what the application does.

Developers typically write unit tests and integration tests. Beyond that, it is typically in the responsibility of Test or Quality Assurance.

Before we go further, let's define what unit tests and integration tests are, so we don't get confused. The terms are open to interpretation! Then, we can touch on what tests you "should" write.

## Unit Tests

What most people agree on is that unit tests:

1. Focus on a small part of the application.
1. Are typically automated and written by developers.
1. Are expected to be significantly faster than other kinds of tests.

### What is a unit?

Object-oriented programs tend to treat a class as the unit, but not always. It is your decision to define what a unit is. It is not necessary to define a single atomic unit for your entire application, you can encounter situations with different demands.

### Sociable or Solitary?

One way to define what your unit of choice is, is to decide if your tests are solitary or sociable.

Sociable tests test a unit and its collaborating units together. Often, for an unit to fulfil its behaviour, it requires collaboration with other units, so this group can serve as "your logical unit" if you wish.

<img src="/assets/img/blog/2020-06-14-api-testing/sociable-test.svg" alt="sociable test diagram" style="max-width:600px">

Solitary tests focus on an isolated unit and exclude its collaborating units. This is done by using _test doubles_ (Dummy objects, Stubs, Spies, Mocks, and similar) instead of the collaborating units.

<img src="/assets/img/blog/2020-06-14-api-testing/solitary-test.svg" alt="sociable test diagram" style="max-width:600px">

If you want to test your system only using sociable tests, it is not always be pragmatic to do so, you may encounter situations such as asynchronous collaborations (HTTP requests) or concurrent actions (threads), which may require you use a solitary test.

## Integration Tests

The line between integration tests and unit tests is [debatable](https://stackoverflow.com/questions/10752/what-is-the-difference-between-integration-and-unit-tests). I consider integration testing to be concerned with testing how a group of system units work together with minimal _test doubles_.

The term integration test gets applied to a variety of scenarios. Below is the spectrum of what an integration test is considered by some people:

1. A test that covers multiple “units”. It tests the interaction between these units.
2. A test that covers multiple layers of an application. This is a special case of the first case really. For example, in a web application, it might cover the interaction between the service layer and the persistence layer.
3. A test that covers a complete path through the application. For example, in a web application, it might cover all types of requests to a specific endpoint such as `/users`.
4. The integration of your entire application.

I consider the maximum scope of integration tests to be scenario 3 above.

Something you should consider with your integration tests is configuration, you may disable or change some options to simplify tests, or to improve the running time of your tests. It is common to create configuration profiles for testing. You need to strike a balance between making quick tests that support your development process, and making realistic tests that are closer to the production environment.

## How many tests are enough?

Conventional wisdom was to write mostly unit tests and fewer integration tests. Generally, the more tests you have, the better the chances you have of catching bugs, but it is a case of diminishing returns as you get towards 100% code coverage.

You have to decide how much of your code you will cover with tests based on the various constraints of the project, weighting up the costs and benefits. Steve Sanderson <a href="#ref3">[^3]</a> advocates selective unit testing based on the complexity of the code and the cost of testing it, which is summarised in the diagram below.

<img src="/assets/img/blog/2020-06-14-api-testing/cost-benefit-analysis-diagram.svg" alt="cost and benefits of selective unit testing"/>

Kent Beck advocates writing not too many tests, and for most test to be integration tests <a href="#ref4">[^4]</a>.

I tend to agree with Kent Beck, and try to write more integration tests, but I prioritise features, and look to make the right trade-offs between speed and accuracy when deciding to write unit tests or integration tests.

## Test libraries that you can use

You can use whatever libraries you want for testing. In the previous post, I spoke about using [Spring Initializr](https://start.spring.io/) to create the project skeleton, by default it includes the spring boot starter test dependency, and excludes the _vintage engine_ module, which is used to support test written in JUnit 3 and 4.

In Maven, the dependency looks like this:

```xml
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
```

This starter dependency combines a compatible collection of testing libraries. It includes:

1. [JUnit 5](https://junit.org/junit5/docs/current/user-guide/): The most popular library for unit testing. This is what most people use to run their tests. JUnit 5 has made some significant changes from previous versions, most notably the annotations have changed. It offers support for the JUnit 3 and JUnit 4 syntaxes through its _vintage engine_ module, include this if you want to use one of those syntaxes. The [docs](https://junit.org/junit5/docs/current/user-guide/#overview) are pretty good, I suggest you read through them to get more familiar with the basics.
2. [Mockito](https://site.mockito.org/): Is used for creating mock objects. It offers a simply API. You can use annotations such as `@Mock` for variables and it will create a mock object for you.
3. [Hamcrest](https://www.petrikainulainen.net/programming/testing/junit-5-tutorial-writing-assertions-with-hamcrest/): Is used to declare "matcher" rules, which are easier to read e.g. `assertThat(Math.sqrt(-1), is(notANumber()));`.
4. [JsonPath](https://www.baeldung.com/guide-to-jayway-jsonpath): Is used to query JSON objects using path expressions e.g. `$.name` would reference _name_ in `{name: "rob oleary, age :20}`.
5. [JSONAssert](http://jsonassert.skyscreamer.org/): Enables you to execute assertions with JSON data in less code e.g. `JSONAssert.<wbr>assertEquals( expectedJSON, actualJSON, strictMode);`.
6. [JacksonTester](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/json/JacksonTester.html): Create an object mapper to transform objects to and from JSON.

You will see that different people prefer some libraries and styles over another, or they may mix and match them. So, don't be intimidated if you see test cases that look quite different from what you already are accustomed to, the objectives are the same.

## Testing the application

I have made one change to the code from the previous post, I have removed the dummy data from `UserController`. The code we discuss in this post is available in a [new branch in the same github repository called `with-tests`](https://github.com/robole/spring-boot-api-for-beginners/tree/with-tests).

### How to Write Test Cases

Every test case should have some form of the following three steps:

1.  Preparation: Set up all data required to execute a method under test.
2.  Execution: Execute the actual method under test.
3.  Verification: Compare the actual behaviour of the method under test to the expected behaviour.

Try to write a test case for every method, covering the [happy path](https://en.wikipedia.org/wiki/Happy_path) (the most common, error-free scenario), and some exceptional scenarios.

### Unit Test for User

Testing model classes is generally straightforward.

#### Should I Test POJOs?

You may have heard of the reference to [Plain Old Java Objects (POJOs)](https://www.martinfowler.com/bliki/POJO.html) before, it usually refers to a very basic class structure, usually a class that just has some attributes, getters, and setters.

Opinions vary on whether you should test POJOs. The argument against testing them is usually that the behaviour is trivial and is unlikely to break. [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin)'s personal rule is:

> The rule in TDD (Test Driven Development) is ["Test everything that could possibly break"](http://www.xprogramming.com/xpmag/PracticesForaReason.htm) Can a getter break? Generally not, so I don't bother to test it. Besides, the code I _do_ test will certainly call the getter so it _will_ be tested.
>
> My personal rule is that I'll write a test for any function that makes a decision, or makes more than a trivial calculation. I won't write a test for `i+1`, but I probably will for `if (i<0)...` and definitely will for `(-b + Math.sqrt(b*b - 4*a*c))/(2*a)`

The argument for testing POJOs is that you should test the interface; not the implementation. You shouldn't base tests on what the decisions are made within a test, and writing tests for them are a way to ensure [method contracts](https://en.wikipedia.org/wiki/Design_by_contract) are fulfilled. <a href="#ref1">^1</a> Some people want to have high test coverage, so they will test almost everything.

You can decide for yourself whether you want to unit test POJOs.

#### Writing the Test Class

Using JUnit is sufficient for unit testing, I will only use JUnit 5 for testing `User`.

- In a maven project, the default location for tests is _src/test/java_.
- The convention is to name our test classes as "*className*Test", our test class for `User` would be called `UserTest`. You can call it whatever you like! The advantage is when you create a test suite to group together tests, you just include a package, and the default behaviour is that the test runner will include only the tests that have "Test" in the name.
- You can include preparation that is common to every test case, and run before each test case, in a "setUp" method annotated with `@Before` (JUnit 4) or `@BeforeClass` (JUnit 5).
- You annotate a test case with `@Test` , so the test runner will run it.
- The most common JUnit 5 assertions are `assertEquals`, `assertNotEquals`, `assertTrue`, and `assertNull`. You find these in the `org.junit.jupiter.api.Assertions` package.
- You can include common clean-up tasks run after each test case in a "tearDown" method annotated with `@After` (Junit 4) or `@AfterClass` (JUnit 5).

It is the `org.junit.jupiter.api` package that you use for testing.

In the `setUp` method, we create a new `User` object each time, this ensures that our test cases start with the same default state, and can remain independent of each other. You should not rely on tests being run in a particular order.

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;

public class UserTest {

    User testUser1 = null;

    @BeforeEach
    void setUp() {
        testUser1 = createNewUser();
    }

    @AfterEach
    void tearDown() {
        testUser1 = null;
    }

    User createNewUser(){
        return new User(1,"Rob OLeary", 33);
    }

    //naming convention I follow is: MethodName_StateUnderTest_ExpectedBehavior
    @Test
    void getId_1_ReturnValue(){
        Assertions.assertEquals(1, testUser1.getId());
    }

	//more test cases

}

```

The test cases are quite simple and shouldn't require explanation. You can choose a [naming convention for your methods](https://dzone.com/articles/7-popular-unit-test-naming) if you want to, I loosely follow the convention of _MethodName<wbr>\_StateUnderTest<wbr>\_ExpectedBehavior_.

In most IDEs you can run your tests in the same way as you run a class, and it will show a test runner which shows the execution of the various test.

#### Execution Time for UserTest

**The execution time is 371ms for 9 tests.** The picture below is what the tester runner looks like in IntelliJ.

<img src="/assets/img/blog/2020-06-14-api-testing/test-runner-intellij.jpg" alt="intellij test runner" style="max-width:100%">

### Unit test for UserController

To get as close as we can to a solitary unit test, we want to mock the MVC environment, and exclude the embedded server. In our `setUp` method, we create a [Standalone MockMVC](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/setup/StandaloneMockMvcBuilder.html) and register our controller with it. Think of standalone mode as the minimum environment setup.

For each test, we use our `MockMVC` instance to perform the mock requests we require, we receive a `MockHttpServletResponse` in response, which we can use for assertions.

Implicitly, `UserController` uses the Jackson library for transforming `User` objects to and from JSON. Because it is a minimum environment, we have to transform our `User` objects to JSON when required. We use `JackonTester` for this.

```java
public class UserControllerTest {
    private MockMvc mvc;
    private JacksonTester<User> jsonUser;

    private String basePath = "/users";

    private final User TEST_USER = new User(1, "Rob OLeary", 21);
    private final User TEST_USER_2 = new User(2, "Angela Merkel", 20);

    @BeforeEach
    public void setup() {
        JacksonTester.initFields(this, new ObjectMapper());
        // MockMvc standalone approach
        mvc = MockMvcBuilders.standaloneSetup(new UserController()).build();
    }

    //test cases
}
```

#### Test Cases for UserController

For the test assertions, I am using Hamcrest matchers and JacksonTester.

I will explain the test cases for `getUser`, to give you the gist of how to test yourself.

##### getUsers (happy path)

This is the happy path for `getUsers`. In the response, we expect to get all the users as a JSON array, and an OK HTTP Status.

```java
@Test
public void getUsers_2UsersExist_ReturnOK() throws Exception{
    //data prep
    addUsers();

    // execute
    MockHttpServletResponse response = mvc.perform(
            get(basePath).accept(MediaType.APPLICATION_JSON))
            .andReturn().getResponse();

    // verify
    assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());

    String jsonUser1 = jsonUser.write(TEST_USER).getJson();
    String jsonUser2=  jsonUser.write(TEST_USER_2).getJson();
    String jsonUserArray = "[" + jsonUser1 + "," + jsonUser2 + "]";

    assertThat(response.getContentAsString()).isEqualTo(jsonUserArray);
}
```

- Preparation: We write a helper method `addUsers` to create Users to setup data.
- Execution: Static imports are used to allow us to call the static methods for making requests. For example, `static import org.<wbr>springframework.test.<wbr>web.servlet<wbr>.request.<wbr>MockMvcRequestBuilders.<wbr>get;` enables us to create a mock GET request using `get()`. We chain methods to shorten our code.
- Verify: I use the Hamcrest matchers for the assertions. I build the expected result string using `JacksonTester`.

Alternatively, some people using `JsonPath` for assertions when dealing with JSON, I use `JacksonTester` because Spring uses Jackson for the transformation functionality, so it a bit closer to the real functionality.

This is the same test case using `JsonPath`.

```java
/*
These are the related import statements:
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.hasSize;
*/

@Test
public void getUsers_2UsersExist_ReturnOK() throws Exception{
    //data prep
    addUsers();

    //execute and verify
    mvc.perform(get(basePath))
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$", hasSize(2)))
        .andExpect(jsonPath("$[0].id").exists())
        .andExpect(jsonPath("$[0].name").exists())
        .andExpect(jsonPath("$[0].age").exists());
}
```

##### getUsers (unhappy path)

We also want to test the opposite scenario, when have no users. We expect an empty array, and an OK Http Status in our Response.

```java
@Test
public void getUsers_NoUsers_ReturnOKEmptyArray() throws Exception{
    // no data prep required

    // execute
    MockHttpServletResponse response = mvc.perform(
            get(basePath).accept(MediaType.APPLICATION_JSON))
            .andReturn().getResponse();

    // verify
    assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(response.getContentAsString()).isEqualTo("[]");
}
```

We cover each method under test with similar test cases.

### Execution Time for UserControllerTest

**The execution time for the 14 test cases in `UserControllerTest` is 12 seconds**. As you can see below most of the time is taken on the first test case, subsequent test cases benefit from caching, which makes them run in 100ms or so.

<img src="/assets/img/blog/2020-06-14-api-testing/test-runner-usercontrollertest.jpg" alt="test usercontrollertest" style="max-width:100%">

### Integration Test for UserController

There are a few strategies for creating integration tests depending on how you define the scope of an integration test.

1. If you use the annotation `@ExtendWith(SpringExtension.class)`, **you can use use an application context**. It is similar to the unit test, but you have the option of _autowiring_ objects.
2. If you use the annotation `@SpringBootTest` without parameters, or `@SpringBootTest(webEnvironment = WebEnvironment.MOCK)`, **you can use an application context **. It is similar to the unit test, but you have the option of _autowiring_ objects. This is a tricky approach to get right and is not advisable.
3. You can use the annotations `@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)` or `@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)` **to use a real HTTP server**. In this case, you need to use a `RestTemplate` or `TestRestTemplate` to execute requests as it is an external test.

You can read the Guide to Testing Controllers in Spring Boot <a href="#ref2">[^2]</a> for a more in-depth look at these strategies. I will use strategy 3.

#### Writing the Integration Test with a real server

I named my integration test class as `UserControllerIT`. It has the same test cases as `UserControllerTest`.

The annotation `@ExtendWith(SpringExtension.class)` uses a JUnit 5 extension named `SpringExtension`, which initializes the Spring context. The annotation `@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)` runs the server on a random port.

```java
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    private String basePath = "/users";
    private final User TEST_USER = new User(1, "Rob OLeary", 21);
    private final User TEST_USER_2 = new User(2, "Angela Merkel", 20);

    //test cases
}
```

#### Test Cases

In the tests cases, I use an instance of [`TestRestTemplate`](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/web/client/TestRestTemplate.html) which was made with integration tests in mind. It has convenience methods `getForEntity(URI url, Class<T> responseType)` and `postForEntity(URI url, Object request, Class responseType)`, which make it easy to execute GET and POST requests respectively, returning a response which converts the body to an object we define in the generic type `<T>`.

There are methods `put(URI url, Object request)` and `delete(URI url)` for executing PUT and DELETE requests, but they do return responses. If you want a response for assertions, you need to use one of the `exchange(..)` methods, and specify the HTTP method as one of the parameters.

For the test assertions, I use `JSONAssert` assertions. As an external test, it makes sense to me to test the response bodies as JSON, similar to an external consumer of the web service. You can use other assertion styles if you wish!

I will explain the same test cases as I did for `UserControllerTest` .

<h5 id="getusers-happy-path-it">getUsers (happy path)</h5>

```java
@Test
public void getUsers_2UsersExist_ReturnOK() throws Exception{
    //data prep
    postUsers();

    // execute
    ResponseEntity<String> response = restTemplate.getForEntity(basePath, String.class);

    // verify
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    String expected = "[{id:1,name:\"Rob OLeary\",age:21},{id:2,name:\"Angela Merkel\",age:20}]";
    JSONAssert.assertEquals(expected, response.getBody(), JSONCompareMode.STRICT);

    //cleanup
    deleteUser( 1);
    deleteUser( 2);
}
```

- Preparation: We write a helper method `postUsers` to create Users to setup data.
- Execution: We specify the type as String when using `getForEntity(URI url, Class<T> responseType)`, so we can use `JSONAssert` for assertions on the response body .
- Verify: Using `JSONAssert.assertEquals()` is quite simple, we can compare it directly to an expected JSON String we write. You can declare the comparison mode as strict or lenient.

<h5 id="getusers-unhappy-path-it">getUsers (unhappy path)</h5>

We also want to test the opposite scenario, when we have no users. We expect an empty array, and an OK Http Status in our Response.

```java
@Test
public void getUsers_NoUsers_ReturnOKEmptyArray() throws Exception{
    // no data prep required

    // execute
    ResponseEntity<String> response = restTemplate.getForEntity(basePath, String.class);

    // verify
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    JSONAssert.assertEquals("[]",response.getBody(),JSONCompareMode.STRICT);
}
```

#### Execution Time for UserControllerIT

**The total execution time for the server initialisation and the 14 test cases is 39 seconds (first time), and around 28 seconds on subsequent runs.** The equivalent unit test was 12 seconds in total!

### Write a Test Suite

You can group tests together to run together as a [test suite](https://junit.org/junit5/docs/current/user-guide/#running-tests-junit-platform-runner-test-suite). You can make any kind of group you wish, I will write a test suite to run our user-related <u>unit tests</u> together.

Unfortunately, the test runner in JUnit 5 is not able to run your test suite (yet). You need to add a separate JUnit 4 test runner called [JUnitPlatform](https://junit.org/junit5/docs/5.0.1/api/org/junit/platform/runner/JUnitPlatform.html) to run your test suites in an IDE, which means you must include the _vintage engine_ module of JUnit 5 also. Below is what test maven dependencies you should have.

```xml
<dependency>
 <groupId>org.springframework.boot</groupId>
 <artifactId>spring-boot-starter-test</artifactId>
 <scope>test</scope>
</dependency>

<dependency>
 <groupId>org.junit.platform</groupId>
 <artifactId>junit-platform-runner</artifactId>
 <scope>test</scope>
</dependency>
```

The `@selectPackages` annotation specifies the packages your tests are contained in, `JUnitPlatform` will discover and run all tests in the package and its subpackages. By default, it will only include test classes whose names either begin with `Test` or end with `Test` or `Tests`.

```java
import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.runner.RunWith;

@RunWith(JUnitPlatform.class)
@SelectPackages("net.roboleary.user")
public class UserTestSuite { }
```

There are more configuration options for discovering and filtering tests available in the [org.junit.platform.suite.api](https://junit.org/junit5/docs/current/api/org.junit.platform.suite.api/org/junit/platform/suite/api/package-summary.html) package.

You can run your test suite with Gradle, Maven, or the [console launcher](https://junit.org/junit5/docs/current/user-guide/#running-tests-console-launcher) if you prefer.

## Source Code

The code is available in a [branch of the orginal github repository called 'with-tests'](https://github.com/robole/spring-boot-api-for-beginners/tree/with-tests).

## Final Words

I hope this gives a more nuanced explanation of testing a web application. I found it a bit disorientating in the beginning, I couldn't find tutorials with clear distinctions between the syntaxes and libraries that they were using, and clear objectives about their testing methodology.

When you have a web application with more layers, such as a persistence layer and service layer, you need to do a bit more with your tests, but it is just variation on what we have done already mostly. Discussing it with a complete application is the most illuminating way to learn about it.

Happy coding! 👩‍💻🙌

<p style="font-size:0.75em">Two images were used to create the banner image, they were made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com/"> www.flaticon.com</a>.</p>

## References

<ol style="display:block;">
    <li><a id="ref1" href="https://dev.to/scottshipp/why-test-pojos-1lfb">Why test POJOs? by Scott Shipp</a>: Why test POJOs?</li>
    <li><a id="ref2" href="https://thepracticaldeveloper.com/2020/06/04/guide-spring-boot-controller-tests/">Guide to Testing Controllers in Spring Boot</a>: There are different ways to test your Controller (Web or API Layer) classes in Spring Boot, you can write unit tests and others are more useful for Integration Tests.</li>
    <li><a id="ref3" href="https://blog.stevensanderson.com/2009/11/04/selective-unit-testing-costs-and-benefits/">Selective Unit Testing – Costs and Benefits</a>: For certain types of code, unit testing works brilliantly, but for other types of code, writing unit tests consumes a huge amount of effort, doesn’t meaningfully aid design or reduce defects at all.</li>
    <li><a id="ref4" href="https://kentcdodds.com/blog/write-tests">Write tests. Not too many. Mostly integration by Kent Dodds</a>: Discusses testing strategy and advocates writing mostly integrations tests.</li>
</ol>
