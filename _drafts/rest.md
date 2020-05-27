<abbr title="REpresentational State Transfer">REST</abbr> <abbr title="Application Programming Interface">API</abbr>s are fundamental to building distributed web applications. It has become an ubquitious way to distribute our code and data to web applications.

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
