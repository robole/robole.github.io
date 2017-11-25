---
layout: post
title: "Dates in Java"
category: java
tags: [Java, dates]
published: true
---
# Dates

Dates were so badly realised in Java 1 that most people started to use
external libraries such as [Joda Time](http://www.joda.org/joda-time/).

In Java 8, this has been addressed in the <code>java.time</code> package.

[LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html), [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) and [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)
 provide date representations without timezones.

## Creating a date or time

 ```
 LocalDate now = LocalDate.now();
 System.out.println(now.toString()); //2017-11-25

 LocalDate date = LocalDate.of(2017, 12, 25 );
 System.out.println(date.toString()); //2017-11-25

 LocalTime myTrain = LocalTime.of(17, 18); // the train I took home today
 System.out.print(myTrain.toString());
 ```
## Comparing date or time

### Days between 2 dates

For logical calendar days between 2 dates, use <code>DAYS.between()</code>
 method from <code>java.time.temporal.ChronoUnit</code>
 
 ```
LocalDate now = LocalDate.now();
System.out.println(now.toString()); //2017-11-25
LocalDate date = LocalDate.of(2017, 12, 25 );
System.out.println(date.toString()); //2017-11-25

long daysBetween = DAYS.between(now, christmas);
System.out.println("Days to: " + daysBetween);
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
## Time duration

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
 -  Some of the date and time classes have quite poor API design. For example, years in <code>java.util.Date</code> start at 1900, months start at 1, and days start at 0, not very intuitive.
 - Classes such as <code>java.util.Date</code> and
 <code>SimpleDateFormatter</code> aren’t thread-safe, leading to potential concurrency issues for users, not something you would expect to deal with when writing date-handling code.

But for completeness, lets show a little of the way it was done.

The [Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html) class
is the raw form of a date, it is the number of milliseconds
since January 1, 1970. Most of it's methods are deprecated, we are encouraged to
use [GregorianCalendar](https://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html) for creating a specific date.

You can create a Date in 2 forms:

```
Date now = Date(); //this moment
Date someDate = Date(1511563121308); //ms since 1970 = 24.11.2017 23:39
```
You would probably not use the second version, and you may want a date other
than now! So..

Really, Date is used as the type to transfer a date between GregorianCalendar
and [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html):
- GregorianCalendar is for creating a specific date, and for manipulating
the date, for example, adding a month to a date.
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
