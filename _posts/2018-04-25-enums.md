---
layout: post
title: "Enumerations in Java ☕"
category: programming
tags: [java, enumeration, enum]
published: true
---
An Enumeration is a list of closely related constants. You might use an enumeration for situations like:
-	cardinal directions - north, south, east, west
-	types of novels - mystery, classic, fantasy, romance, science-fiction.
-	flavours of ice cream - chocolate, vanilla, raspberry, maple.
- suits for playing cards - spades, clubs, diamonds, hearts.
- chess pieces - pawn, rook, knight, bishop, queen, king.
- status flag - open, development, test, closed.

```java
enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST;
}
```

We define an enumeration using the ```enum``` keyword, and make a list of constant values. We can then refer to a value by the *"enum.value"* such as ```Direction.NORTH```.

# Why should I use them?
It enables you to restrict the values that you can set for a variable. They are type-safe, so it increases compile-time checking and helps to avoid errors from passing in invalid values.

It serves as a clearer way to document what are the legal values for a type.

# The Facts
-	enums are implicitly final subclasses of ```java.lang.Enum```.
-	if an enum is a member of a class, it is implicitly ```static```.
-	enums can contain constructors, methods, variables, and constant class bodies.
-	```toString()``` may be overridden to provide any content, if desired.
-	for enum constants, ```equals()``` and ```==``` amount to the same thing, and can be used interchangeably.
-	enum constants are implicitly ```public static final```
- ```ordinal()``` returns the ordinal position of the enum, the same as an array position.
```java
Direction d1 = Direction.SOUTH;
System.out.println(d1.ordinal());	//prints: 1 (it's the second constant defined)
```
-	```valueOf()``` can be used to parse a String (case-sensitive) to an enum type.
```java
Direction d = Enum.valueOf(Direction.class, "NORTH");
System.out.println(d); //prints: NORTH
```
-	the order of appearance of enum constants is called their "natural order", and defines the order used by other items as well : ```compareTo()```, iteration order of values , ```EnumSet```, ```EnumSet.range```.

# Constructors

Constructors for an enum type should be declared as ```private```. The compiler allows constructors to be declared as public, but this can seem misleading, since new can never be used with enum types!

Here we pass a value to each constant to set the value for *ounces* for each *CoffeeSize* through the constructor.

```java
enum CoffeeSize {
  BIG(8),
  HUGE(10),
  OVERWHELMING(16);

  private int ounces;

  //constructor
  CoffeeSize(int ounces) {
    this.ounces = ounces;
  }

  public int getOunces(){
    return ounces;
  }
}
```

# Rules
-	An enum can be declared outside or inside a class; but NOT in a method.
- the constants must be the first statement.
-	An enum that is NOT enclosed in a class can be declared with only the public or default modifier.
-	```new``` can never be used with an enum.
-	A constant specific class body can redefine a method for that constant, it overrides the method defined in the enum.
- If an enum is used in a case statement, they should NOT use the class prefix. Everywhere else they should have prefix (e.g. ```CoffeeSize.BIG```), unless the enum is in the same class:
```java
CoffeeSize c = CoffeeSize.OVERWHELMING;
switch (c){
  case CoffeeSize.BIG: //compiler error
    System.out.println("im big");
  case HUGE:
    System.out.println("im huge");
  case OVERWHELMING:
    System.out.println("im overwhelming");
}
```

# Additional Reading
- [Beginner’s Guide to Java eNum – Why and for What should I use Enum? Java Enum Examples](https://crunchify.com/why-and-for-what-should-i-use-enum-java-enum-examples/)
- [Oracle Tutorial - Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)
