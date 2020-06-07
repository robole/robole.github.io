---
layout: post
title: Testing a Web Service in Spring  ☕
category: unit testing
tags: [rest, Java, Spring, unit testing]
published: false
---

## Annotations

- `@SpringBootTest`: Creates the `ApplicationContext` used in your tests. By default, it will not start a server. You can use the attributes:
	- `webEnvironment` with values:
		- `WebEnvironment.MOCK`: This is the default value. Loads a web ApplicationContext and provides a mock web environment. Embedded servers are not started when using this annotation. If a web environment is not available on your classpath, this mode transparently falls back to creating a regular non-web ApplicationContext. It can be used in conjunction with `@AutoConfigureMockMvc` or `@AutoConfigureWebTestClient` for mock-based testing of your web application.
		- `WebEnvironment.RANDOM_PORT`: Loads a `WebServerApplicationContext` and provides a real web environment. Embedded servers are started and listen on a random port.
		- `WebEnvironment.DEFINED_PORT`: Loads a `WebServerApplicationContext` and provides a real web environment. Embedded servers are started and listen on a defined port (from your application.properties) or on the default port of 8080.
		- `WebEnvironment.NONE`: Loads an `ApplicationContext` but does not provide any web environment (mock or otherwise).
- `@RunWith(SpringRunner.class)`: If you are using JUnit 4, you should add this so the test annotations will be inspected.
- `@ExtendWith(SpringExtension.class)`: This is if you are using JUnit 5. There’s no need to add the add it to your test class as `@SpringBootTest` and the other `@…Test` annotations are already annotated with it. 
- `@TestConfiguration`:



## References

[Spring Boot testing docs](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html)
[Different methods for testing endpoints](https://blog.marcnuri.com/mockmvc-spring-mvc-framework/)
[Spring Boot 3 Unit Testing](https://gigsterous.github.io/engineering/2016/10/18/spring-boot-3.html)
[Testing improvements in Spring Boot 1.4](https://spring.io/blog/2016/04/15/testing-improvements-in-spring-boot-1-4)
