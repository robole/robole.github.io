---
layout: post
title: "Dates in Java"
category: java
tags: [Java, dates]
published: true
---

Dates were so badly realised in Java that a lot people started to use
external libraries such as [Joda Time](http://www.joda.org/joda-time/).

It was only in Java 8, that this has been addressed in the <code>java.time</code> package.

[LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html), [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) and [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html) provide date representations without timezones. These are immutable classes to provide thread-safety, so we use static methods and get new
objects when there is a manipulation of a value.

# Dates

## Creating a date
We use these static methods to get an instance.

 ```
 LocalDate now = LocalDate.now();
 System.out.println(now.toString()); //current date

 LocalDate date = LocalDate.of(2017, 12, 25 );
 System.out.println(date.toString()); //2017-11-25
 ```
## Comparing dates

## Difference between 2 dates
Use the time units in [java.time.temporal.ChronoUnit](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoUnit.html) and <code>between(..)</code> method.

For example, to get the logical calendar days between 2 dates, you can use <code>DAYS.between(Temporal temporal1Inclusive, Temporal temporal2Exclusive)</code>.

```
import java.time.LocalDate;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.time.temporal.ChronoUnit.MONTHS;
import static java.time.temporal.ChronoUnit.YEARS;

public class Test {
    public static void main(String[] args){
        LocalDate now = LocalDate.now();
        System.out.println(now.toString()); //2017-11-26
        LocalDate christmas = LocalDate.of(2017, 12, 25 );
        System.out.println(christmas.toString()); //2017-11-25
        LocalDate christmas2018 = LocalDate.of(2018, 12, 25 );

        long daysBetween = DAYS.between(now, christmas);
        System.out.println("Days to christmas: " + daysBetween); //Days to christmas: 29
        long monthsBetween = MONTHS.between(now, christmas2018);
        System.out.println("Months to christmas 2018: " + monthsBetween); //Months to christmas 2018: 12
        long yearsBetween = YEARS.between(now, christmas2018);
        System.out.println("Years to christmas 2018: " + yearsBetween); //Years to christmas 2018: 1
    }
}
 ```

## Adding to/taking from dates and times

## Parsing and formatting dates and timezones

 ```
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;

public class ExampleFormatter {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d yyyy");
        // use this format to get always two digits for the day
        DateTimeFormatter f1 = DateTimeFormatter.ofPattern("MMM dd yyyy");
        LocalDate date = LocalDate.of(2015, Month.JULY, 1);
        System.out.println(date.format(formatter));
        System.out.println(date.format(f1));
        LocalDate d2 = LocalDate.of(2015, Month.JULY, 15);
        System.out.println(d2.format(formatter));
    }
}
 ```
# Time
 ```
LocalTime myTrain = LocalTime.of(17, 18); // the train I took home today
System.out.print(myTrain.toString());
 ```

# Time duration

 ```
import java.time.Duration;

public class ExampleDuration {
public static void main(String[] args) {
    Duration duration = Duration.ofHours(5); //duration of 5 hours
    Duration plusMinutes = duration.plusMinutes(20);
  }
}
 ```

# Java 7 and below

In short, don't waste your time doing it this way!

Some of the issues are:
 -  Some of the classes have poor API design. For example, years in <code>java.util.Date</code> start at 1900, months start at 1, and days start at 0, not very intuitive.
 - Classes such as <code>java.util.Date</code> and
 <code>SimpleDateFormatter</code> aren’t thread-safe, leading to potential concurrency issues for users, not something you would expect to deal with when writing date-handling code.

But for completeness, lets show a little of the way it was done.

The [Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html) class
is the raw form of a date, it is the number of milliseconds
since January 1, 1970. Most of it's methods are deprecated, we are encouraged to
use [Calendar](https://docs.oracle.com/javase/7/docs/api/java/util/Calendar.html) [GregorianCalendar](https://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html) for creating a specific date.

You can create a Date using <code>java.util.Date</code> in 2 forms:

```
Date now = Date(); //this moment
Date someDate = Date(1511563121308); //ms since 1970 = 24.11.2017 23:39
```
You would probably not use the second version, and you may want a date other
than now! So..

Really, Date is used as the type to transfer a date between Calendar
and [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html):
- Calendar is an abstract class for creating and manipulating a specific date. There is a static method for creating an instance:
```
Calendar rightNow = Calendar.getInstance();
```
- GregorianCalendar is a concrete class for creating and manipulating a specific date, in the Gregorian standard that is followed by most countries in the world.
- SimpleDateFormat is to format and parse a dates e.g. dd.mm.yyyy for German dates.

```
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Test {
    public static void main(String[] args){
        GregorianCalendar now = new GregorianCalendar();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MMM-dd");
        System.out.println("Today is: " + formatter.format(now.getTime()));

        GregorianCalendar christmas = new GregorianCalendar(2017,Calendar.DECEMBER, 25);

        System.out.println("Christmas day is:" + formatter.format(christmas.getTime()));
    }
}
```
