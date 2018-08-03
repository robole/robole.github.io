---
layout: post
title: Testing a RESTful Web Service in Spring for beginners ☕
category: testing
tags: [rest, Java, Spring, unit testing, integration testing, testing]
published: true
---
Spring MVC provides good support for testing your RESTful web services. The ```spring-boot-starter-test``` dependency is very convenient to use, it imports a compatible collection of testing libraries that work together well and offer different capabilities:
- JUnit: The de-facto standard for unit testing Java applications.
- Spring Test & Spring Boot Test: Utilities and integration test support for Spring Boot applications.
- AssertJ: A library to write fluent style of assertions.
- Hamcrest: For checking conditions in your code via matchers classes.
- Mockito: Mocking framework.
- JSONassert: An assertion library for JSON.
- JsonPath: You can select data from JSON.

## Maven dependency
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

Don't be intimidated by the list, they offer the power to write short tests without needing to know a lot about each library.

I should mention that everyone has a slight variation on how they use these libraries, and have some different preferences on how they like to test. So, you may see some different approaches, and contradictory opinions!

The goal is to find a way that you understand, and are comfortable with. So, I hope this is it!

# What am I testing?

We can define 2 broad levels of testing for our application:
1. Unit tests: we want to test each class/unit in isolation by excluding the surrounding infrastructure, and mocking dependencies. True unit tests typically run extremely quickly.
2. Integration testing: we test everything working together, no mocking. You may also see this referred to as end-to-end testing, but some testing strategies consider end-to-end testing as a more complete testing stage.

I summarised how I define them in more detail below:

<table and="" class="zebra" width="100%" border="0">
<tbody><tr>
<th>Unit test</th>
<th>Integration test</th>
</tr>
<tr>
<td>A single class/unit is tested in isolation</td>
<td>We test everything together.</td>
</tr>
<tr>
<td>Easy to write and verify.</td>
<td>Setup of integration test might be complicated.</td>
</tr>
<tr>
<td>All dependencies are mocked if needed.</td>
<td>No mocking is used (or only unrelated components are mocked).</td>
</tr>
<tr>
<td>Uses JUnit, a mocking framework, and maybe additional libraries for testing assertions.</td>
<td>Can use same libraries as unit testing, but also may use a dedicated integration testing framework such as <a href="http://arquillian.org">Arquillian</a> or <a href="http://www.dbunit.org">DbUnit</a>.</td>
</tr>
<tr>
<td>Mostly used by developers.</td>
<td>Useful to QA, DevOps, and Help Desk employees.</td>
</tr>
<tr>
<td>A failed unit test is always a regression (undesirable change in our code) if the business has not changed.</td>
<td>A failed integration test can mean that the code is still correct, but the environment has changed.</td>
</tr>
<tr>
<td>Unit tests in an enterprise application should last about 5 minutes</td>
<td>Integration tests in an enterprise application can last for hours.</td>
</tr>
</tbody></table>

# Example Application

We will re-use our simplified User example from [this previous post]({{ site.baseurl }}{% post_url 2018-07-17-restful-service %}). It has a *model* and a *controller* only, and has some default data inside the controller, which is there just for the purpose of demonstration, and wouldn't be in a complete application.

# How do I test?

Every test case should have following three steps:
 - Preparation: We set all data required to execute a method under test. You can include preparation that is common to every test method in a "setUp" method annotated with ```@Before``` (JUnit4) or ```@BeforeClass```(JUnit5). Our test data is already inside the controller, so we skip this!
 - Execution: Execute the actual method under test. In our example, we will create a request which will cause a method in our controller class to be executed.
 - Verification: We check the expected behaviour of the method under test. For example, check if the response returned from the controller has the correct status code.

 Often overlooked points for test cases are:
 - Independence: We want a test case to be self-contained. If data is modified in one test, it should not impact another test case. So, all test cases should begin in a known state. This means that it is probably necessary to write test initialization code that ensures that the external resource is in a known state.
 - Configuration should be minimal: Specific to integration tests. If a database is used, we should only require that it is installed on the machine it is being tested on, we should not go too far with custom properties.

# Unit testing

You can organize your test code in different ways.

Typically, in a maven project, your tests are put into *src/test/java*. Each test is named to follow a convention such as: *class name* + *Test* e.g. *UserControllerTest*.

## Test class configuration

We need to do 2 things to set-up our test class:
- add ```@RunWith(SpringRunner.class)``` to class : this adds JUnit4 support for the test runner.
- Create a [StandaloneMockMVCBuilder](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/setup/StandaloneMockMvcBuilder.html) in ```setUp()```: This builder creates the minimum infrastructure required to serve requests with the controllers we provide to. Before each test, this is run and creates a new ```UserController```, so we a consistent state each time.

```java
@RunWith(SpringRunner.class)
public class UserControllerTest {
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        //create new controller for each test
        mockMvc = MockMvcBuilders
                .standaloneSetup(new UserController())
                .build();
    }

    //test methods
```
Other examples that you may have seen use a ```WebApplicationContext``` or other annotations that may load a complete application context, which uses more resources and gets further away from being a unit test.

You can see that it runs quickly. However, for some reason, it is a bit slow to return when something is not found!

![unit tst](/assets/img/blog/2018-08-01-test-restful-service/unit-test.png)

## Test methods

The slightly longer version is this, but may be clearer to understand the steps:

```java
@Test
public void getAllUsers() throws Exception {
  //data already set up

  // execute
  MvcResult result = mockMvc
          .perform(MockMvcRequestBuilders.get("/users")
                  .accept(MediaType.APPLICATION_JSON_UTF8))
          .andReturn();

  // verify
  int status = result.getResponse().getStatus();
  assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
  //more statements here to test JSON in response body
}
```

But you're more likely to see this shortened syntax with methods chained together.

```java
@Test
public void getAllUsers() throws Exception {
    mockMvc.perform(get("/users"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(jsonPath("$", hasSize(3)))
            .andExpect(jsonPath("$[0].id").exists())
            .andExpect(jsonPath("$[0].name").exists())
            .andExpect(jsonPath("$[0].age").exists());
}
```

Static imports are used to allow us to call methods without an object. For example, ```static import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;``` enables us to create a mock GET request through ```get()```.

Some of the assertions use ```jsonPath()``` to validate the structure and contents of the JSON in the response body. *$* is the root of the JSON and you can select fields with the dot notation.

The other test methods are similar to this and can be found in the source code.

# Integration Testing

Each test can be named to follow a convention such as: *class name* + *IT* e.g. *UserControllerIT*. You can put them in the same folder as unit test if you want, or keep them separate.

Most integration tests are written for the top layer, in our case our controller. In enterprise applications, the top layer tends to be the service layer.

Some tutorials such as [this one](http://www.baeldung.com/integration-testing-in-spring) on Baeldung.com use a ```WebApplicationContext``` and ````MockMVC```, and exclude the web server. I will include an embedded web server, because my interpretation of integration testing is that you are testing how everything works together in the *real environment*. It's a small difference in the code, so you can decide for yourself!

## Test class configuration

To perform integration tests for this application, we will create the following environment:
- Deploy the application on Embedded Tomcat Server on a random port
- Use [TestRestTemplate](https://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/api/org/springframework/boot/test/web/client/TestRestTemplate.html) from Spring Boot to call the Restful Web Services.

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) //start web sever on random port
@TestPropertySource(locations = "classpath:test.properties") //if you want to include properties for database,logging..etc
public class UserControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    private static final String URL = "/users/";

    //test methods
}
```

```@TestPropertySource(locations = "classpath:test.properties")``` is optional. It loads the application properties for testing from the specified location. Here you can set logging, database settings, and so on.

## Test methods

```java
@Test
public void getUserById() throws Exception {
    // execute
    ResponseEntity<User> responseEntity = restTemplate.getForEntity("users/{id}", User.class, 1);

    // collect response
    int status = responseEntity.getStatusCodeValue();
    User resultUser= responseEntity.getBody();

    // verify
    assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);

    assertNotNull(resultUser);
    assertEquals(1, resultUser.getId());
}
```

The test case is very similar to the equivalent unit test, we are just using ```TestRestTemplate``` instead of ```MockMvc```. Because we do not have other layers in our application, the additional part we are testing is the environment. But when you have an enterprise application there is usually: a repository layer; a database; and maybe a service layer, then you get more benefit from integration testing to see if they work together.

# Source code

Available [here](https://github.com/robole/user-spring-rest) on github.  

# References

- [Bytestree - RESTful Web Services Unit Testing with Spring Boot](http://www.bytestree.com/spring/restful-web-services-unit-testing-spring-boot/): A decent example but it does not use a standalone MockMVC setup, and each test method is not independent! :-O
- [Baeldung - Integration Testing in Spring](http://www.baeldung.com/integration-testing-in-spring): If you do not want to use an embedded web server for your integration test you can follow this.
- [Bytestree - RESTful Web Services Integration Testing with Spring Boot](http://www.bytestree.com/spring/restful-web-services-integration-testing-spring-boot/): Additional example. Test methods are not independent here also! :-O
