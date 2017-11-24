---
layout: post
title: "Dates in Java - Old way and new way (Java 8)"
category: java
tags: [Java, dates]
---

# Java 7 and below

It was such a badly realised implementation of Dates in Java 1, and was
not address until Java 8, that most people were using an external library
called Joda Time.

But for completeness, lets show the way it's done.

The Date class is the raw form of a date, the number of milliseconds since
January 1, 1970. Most of it's methods are deprecated, we are encouraged to
use Calendar or GregorianCalendar for creating a specific date.

You can create a Date in 2 forms:

```
Date now = Date(); //this moment
Date someDate = Date(230100100); //milliseconds since 1970
```
You would probably not use the second version.

Really, Date is used as a go-between when you want to use Calendar
and DateFormat.
