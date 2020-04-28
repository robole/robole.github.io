---
layout: scrollable_post
title: "Dates in Java 8 📆🙏"
category: java
tags: [Java, "date-time api", dates]
published: true
---

Using Dates in programming languages makes many people sweat at the thought, they can be tricky to understand and use. In Java, they were  badly realised in the core library, and that led to a lot people to use external libraries such as [Joda Time](http://www.joda.org/joda-time/). 😥⏰

It was only in Java 8, that it was addressed in the <code>java.time</code> package, and a lot of the pain has been removed. 🙏 

## Key temporal classes

These classes are immutable, which means you can't change values of an instance. Why? We want to ensure thread-safety. If you have different threads updating a date, you will get funky results when you want to lookup the value.

### Instant 💻⚡

An [Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html) is a moment on the timeline in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). It is the count in nanoseconds since the first moment of 1970 UTC (unix epoch time). It is essentially a timestamp (often referred to as "machine time").

```java
Instant a = Instant.now();
System.out.println(a); //2018-02-10T17:06:04.194Z
```

## ZoneId 🌎🌍
A [ZoneId](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html) is a time zone.

```java
ZoneId z = ZoneId.of( “Africa/Johannesburg”) ;
```

A time zone is a set of rules for handling adjustments and anomalies as practiced by a country or region. The most common rule applied is Daylight Saving Time (DST). A time zone has the history of past rules, present rules, and rules confirmed for the near future. 📏

These rules change more often than you might expect. Be sure to keep your date-time library's rules, usually a copy of the 'tz' database, up to date. Keeping up-to-date is easier than ever now in Java 8 with Oracle releasing a [Timezone Updater Tool](http://www.oracle.com/technetwork/java/javase/tzupdater-readme-136440.html).

Use complete time zone names, as much as possible. These names take the form of continent, a SLASH, and a city or region. Avoid the 3-4 letter codes such as 'EST' or 'IST'. They are neither standardized, nor unique. They further confuse the messiness of DST. 'UTC' is the only one that can be used without issue as it is the [basis of DST](https://en.wikipedia.org/wiki/Coordinated_Universal_Time#Daylight_saving_time).

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Daylightsavings.svg" alt="Daylight saving, turning back time!" height="400px" width="100%" />

[Here](https://gist.githubusercontent.com/robole/9b28d3d5edc450f2c95aa94b152c79cb/raw/b796cbb01c15eea6e8983254cff808161736dd0f/ZoneIds) is a list of the long version of all the zone IDs. The code prints them all out, if you want to do it yourself!

```java
List<String> zoneList = new ArrayList<>(ZoneId.getAvailableZoneIds());
Collections.sort(zoneList);
for(int i = 0; i < zoneList.size(); i++){
    System.out.println(zoneList.get(i));
}
```

## ZoneOffset ➕➖🌎

[ZoneOffset](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneOffset.html) is an offset from UTC, such as +02:00.

For example, Paris is one hour ahead of Greenwich/UTC in winter and two hours ahead in summer. The ZoneId instance for Paris will reference two ZoneOffset instances - a +01:00 instance for winter, and a +02:00 instance for summer

You're unlikely to use this class directly or it's related classes: [OffsetDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/OffsetDateTime.html), and [OffsetTime](https://docs.oracle.com/javase/8/docs/api/java/time/OffsetTime.html).

## ZonedDateTime 🌎📅

[ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html) is a date-time with a time-zone. Think..

>ZonedDateTime = Instant + ZoneId


```java
ZonedDateTime now = ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("Europe/Dublin"));
System.out.print(now); //current time in Dublin
```

## Local representations 🏠️

These "local" date representations are *without timezones*.
- [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html) stores a date only ('2010-12-03'),
- [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) stores a time only ('18:00'),  
- [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html) stores a date and time ('2010-12-03T11:30').

## Amount of time ⌚

To specify an amount of time, we can use:
- [Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html) is time-based (seconds with nanosecond accuracy).
- [Period](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html) is date-based (years, months, days).

# Which class should I use? 😟😃

When choosing a temporal-based class, you first identify what aspects of time you need to represent:
- Do you need a time zone?
- Date and time?
- Date only? If you need a date, do you need month, day, and year, or a subset?

Nearly all of your backend, database, business logic, data persistence, data exchange should be in UTC, you will use <code>Instant</code> the most.

But for presentation to users you need to adjust into a time zone expected by the user. For this, you will probably use <code>ZonedDateTime</code>.

For recording something like a birthday, you might use a <code>LocalDate</code>, because most people observe their birthday on the same day, whether they are in their birth city or somewhere else.

Why would you use OffsetDateTime instead of ZonedDateTime? It would be for special cases. If you are writing complex software that models its own rules for date and time calculations based on geographic locations.

|Class/Enum|Year|Month|Day|Hours|Minutes|Seconds|Zone Offset|Zone ID|toString()|
|-----|--|--|--|--|--|--|--|--|------|
|Instant     | | | | | |X| | |2013-08-20T15:16:26.355Z|
|LocalDate   |X|X|X| | | | | |2013-08-20|
|LocalDateTime|X|X|X|X|X|X| | |2013-08-20T08:16:26.937|
|OffsetDateTime|X|X|X|X|X|X|X| |2013-08-20T08:16:26.954-07:00|
|ZonedDateTime|X|X|X|X|X|X|X|X|2013-08-20T08:16:26.937|
|LocalTime| | | |X|X|X| | |08:16:26.937|
|OffsetTime| | | |X|X|X|X| |08:16:26.954-07:00|
|MonthDay| |X|X| | | | | |--08-20|
|Year|X| | | | | | | |2013|
|YearMonth|X|X| | | | | | |2013-08|
|Month| |X| | | | | | |AUGUST|
|Duration| | |^|^|^|X| | |PT20H (20 hours)|
|Period|X|X|X| | | | ||P10D (10 days)|

^ does not store the value but has methods to access these values


# Using Dates 📅

## Creating a date 🐣📅

We use these static methods to get an instance. You can get the current date via <code>now()</code>; or a fixed date using <code>of()</code>.

 ```java
Instant now = Instant.now();
System.out.println(now.toString()); //current date

ZonedDateTime date = ZonedDateTime.of(2017, 12, 31, 23, 59, 59, 0,  ZoneId.systemDefault());
System.out.println(date.toString()); //2017-11-25
 ```

## Comparing dates 🔎📅
Use <code>int compareTo(ChronoLocalDate other)</code> to assert the equality of dates by returning a comparsion number, which can be: negative (before); zero (equal); or positive (after).

The self-explanatory <code>boolean isAfter(ChronoLocalDate other)</code>, <code>boolean isBefore(ChronoLocalDate other)</code>, and <code>boolean isBefore(ChronoLocalDate other)</code> could be more convenient if you want a more specific test.

These methods are available in <code>LocalDate</code>, <code>LocalTime</code>, <code>LocalDateTime</code>, and <code>ZonedDateTime</code> (but the datatype of the parameter is <code>ChronoZonedDateTime</code>).

```java
LocalDate christmas2017 = LocalDate.of(2017, 12, 25 );
LocalDate christmas2018 = LocalDate.of(2018, 12, 25 );
System.out.println(christmas2017.isBefore(christmas2018)); //true
```

## Difference between 2 dates 🕒..🕕
Use the time units in [java.time.temporal.ChronoUnit](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoUnit.html) and <code>between(..)</code>.

For example, to get the logical calendar days between 2 dates, you can use <code>DAYS.between(Temporal temporal1Inclusive, Temporal temporal2Exclusive)</code>.

```java
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

## Adding and subtracting time units from dates and times ➕➖📅
To add time units, you can:
- use the general form: <code> plus(long amountToAdd,TemporalUnit unit)</code>;
- Or specific forms that (predictably) vary for each class:
  - <code> plusDays(long days)</code>
  - <code>plusSeconds(long seconds]</code>

To subtract time units, you can:
- use the general form: <code> minus(long amountToTake,TemporalUnit unit)</code>;
- Or specific forms that (predictably) vary for each class:
  - <code>minusDays(long days)</code>
  - <code>minusSeconds(long seconds]</code>

```java
public class Test {

    public static void main(String[] args){
        LocalDate a = LocalDate.of(2012, 6, 30);
        System.out.println(a.minusDays(30)); //2012-05-31

        LocalTime b = LocalTime.of(20,00,00);
        System.out.println(b.plusHours(3)); //23:00
    }
}
```
Adding a <code>Duration</code> to a <code>ZonedDateTime</code>, time differences are *not* observed.

Adding a <code>Period</code> to a <code>ZonedDateTime</code>, the time differences are observed.

## Parsing dates 🔁📅️
Use <code>parse(CharSequence text)</code> for dates in the format of "yyyy-mm-dd".

```java
LocalDate a = LocalDate.parse("2018-02-01");
System.out.println(a.toString());
```
To parse a date in another format, use the second version, which requires a <code>DateTimeFormatter</code>, through which you can specify the format: <code>parse(CharSequence text, DateTimeFormatter formatter)</code>

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
LocalDate a = LocalDate.parse("01/02/2018", formatter);
System.out.println(a.toString()); //2018-02-01
```

## Formatting dates 📅️📁️

[DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) provides methods for parsing and printing dates using predefined constants (e.g. ISO_LOCAL_DATE), and [patterns](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#patterns) (e.g. yyyy-MMM-dd).

More complex formatting can be done with [DateTimeFormatterBuilder](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatterBuilder.html).

 ```java
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
## Get a particular day 🎣📅️

The [TemporalAdjusters](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAdjuster.html) class contains a standard set of adjusters, which are available as static methods. These include:

- finding the first or last day of the month
- finding the first day of next month
- finding the first or last day of the year
- finding the first day of next year
- finding the first or last day-of-week within a month, such as "first Wednesday in June"
- finding the next or previous day-of-week, such as "next Thursday"

```java
LocalDate date = LocalDate.of(2000, Month.OCTOBER, 15);
System.out.printf("first day of Month: %s%n", date.with(TemporalAdjusters.firstDayOfMonth()));
System.out.printf("first Monday of Month: %s%n", date.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY)));
```

# Java 7 and below 📅️👴👵

In short, don't waste your time doing it this way! But you may need to maintain code that uses these classes.

Some of the issues are:
 -  Some of the classes have poor API design. For example, years in <code>java.util.Date</code> start at 1900, months start at 1, and days start at 0. This is not very intuitive!
 - Classes such as <code>java.util.Date</code> and
 <code>SimpleDateFormatter</code> aren’t thread-safe, leading to potential concurrency issues for users, not something you would expect to deal with when writing date-handling code.

But for completeness, lets show a little of the way it was done.

The [Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html) class
is the raw form of a date, it is the number of milliseconds
since January 1, 1970. Most of it's methods are deprecated, we are encouraged to
use [Calendar](https://docs.oracle.com/javase/7/docs/api/java/util/Calendar.html) [GregorianCalendar](https://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html) for creating a specific date.

You can create a Date using <code>java.util.Date</code> in 2 forms:

```java
Date now = Date(); //this moment
Date someDate = Date(1511563121308); //ms since 1970 = 24.11.2017 23:39
```
You would probably not use the second version, and you may want a date other
than now! So..

Really, Date is used as the type to transfer a date between Calendar
and [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html):
- Calendar is an abstract class for creating and manipulating a specific date. There is a static method for creating an instance:
```java
Calendar rightNow = Calendar.getInstance();
```
- GregorianCalendar is a concrete class for creating and manipulating a specific date, in the Gregorian standard that is followed by most countries in the world.
- SimpleDateFormat is to format and parse a dates e.g. dd.mm.yyyy for German dates.

```java
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
# Example application 📅️💾

📚 [Library - overdue books](https://github.com/robole/library-redi)

For a loan of a book, we want to store when the book is loaned, and when it is returned. It is a better fit to use an <code>Instant</code> for these fields, and stick with UTC timezone implicitly. The user can decide how to record the value (timezone), and display it to the user.

To see if the book was returned late, in <code>getDaysLate()</code>, we want to use the beginning of the loan date (midnight) as the basis of the calculation, to include the full day. The easiest way (I could find) to do this, is to convert the <code>Instant</code> to a <code>ZonedDateTime</code> using the "UTC" <code>ZoneId</code>, and use <code>truncatedTo()</code> to only take the date portion, therefore resetting the time portion to 00:00:00. 😅

This is a good example of how to use temporal classes for storing dates, and making calculations based on them.

```java
public class Loan {
    private Book book;
    private Instant loanDate;
    private Instant returnDate;
    public static final int NUM_OF_DAYS_PER_LOAN = 10;

    public Loan(Book book) {
        this.book = book;
        book.setLoan(this);
        loanDate = Instant.now();
    }

    //getters and setters

    public Instant getDueDate() {
        return loanDate.plus(NUM_OF_DAYS_PER_LOAN, ChronoUnit.DAYS);
    }

    public int getDaysLate() {
        int days = 0;
        if (returnDate != null) {
            ZoneId utc = ZoneId.of("UTC");
            //resets time to midnight
            ZonedDateTime startOfLoanDate = ZonedDateTime.ofInstant(loanDate, utc).truncatedTo(ChronoUnit.DAYS);
            int daysOnLoan = (int) DAYS.between(startOfLoanDate.toInstant(), returnDate);

            if (daysOnLoan > NUM_OF_DAYS_PER_LOAN) {
                days = daysOnLoan - NUM_OF_DAYS_PER_LOAN;
            }
        }

        return days;
    }
}
```

# Additional Reading
- [Oracle Tutorial: Date-Time API](https://docs.oracle.com/javase/tutorial/datetime/iso/index.html)
