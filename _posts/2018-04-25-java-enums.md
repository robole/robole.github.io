---
layout: post
title: "Shall I enumerate the ways you drink me? Java enumerations 🤤☕"
category: programming
tags: [java, enumeration, enum]
published: true
---
<img src="/assets/img/blog/2018-04-25-java-enums/banner.jpg" style="width:100%;display:block;max-size:1920px;margin:0 auto;" alt="coffee cups, small and big"/>

An Enumeration (enum) is a data type with a list of closely related constants. 

You might use an enumeration to describe the following:

-	Drink sizes: Small, Big, Huge, Overwhelming.
-	Flavours of Ice-cream: Chocolate, Vanilla, Raspberry, Maple, Mintchoc.
-	Cardinal directions: North, South, East, West.
-	Literature genres: Mystery, Classic, Fantasy, Romance.
- Playing cards suits: Spades, Clubs, Diamonds, Hearts.
- Days of the week.
- Chess pieces: Pawn, Rook, Knight, Bishop, Queen, King.
- Project status flags: Open, Development, Test, Closed.

## Syntax

```java
enum CoffeeSize {
  SMALL,
  BIG,
  HUGE,
  OVERWHELMING;
}
```

We define an enumeration using the `enum` keyword, and make a list of the constant values. 

We usually refer to a value by *enum.value* e.g. `CoffeeSize.SMALL`.

The semi-colon at the end of the constant list is optional.

## Why should I use them?

- It enables you to restrict the values that can be used for a type. 
- It increases compile-time checking, helping to avoid more errors.
- It serves as a clearer way to document what are the legal values for a type.

## When NOT to use enums?

If your list of constants is likely to change often. Adding a new constant requires the code to be updated, so this might become impractical for some applications. Instead you can use a variable, which sources its values from a database.

## The Facts

-	Enums are implicitly `final`, and are a subclass of `java.lang.Enum`.
-	An enum can be declared outside or inside a class.
-	If an enum is a member of a class, it is implicitly `static`.
-	Enums can contain constructors, methods, variables, and constant class bodies.
-	`toString()` may be overridden to provide any content, if desired.
-	For enum constants, `equals()` and `==` amount to the same thing, and can be used interchangeably.
-	Enum constants are implicitly `public static final`.
-	The order of appearance of enum constants is called their "natural order". It defines the order used by other items as well : `compareTo()`, iteration order of values , `EnumSet`, `EnumSet.range`.
- `ordinal()` returns the ordinal position of the enum, the same as an array position.

    ```java
    CoffeSize c = CoffeSize.BIG;
    System.out.println(c.ordinal());	//prints: 1 (it's the second constant defined)
    ```
-	`valueOf()` can be used to parse a String to an enum type. It is case sensitive.

    ```java
    CoffeSize c = Enum.valueOf(CoffeSize.class, "HUGE");
    ```

## Constructors

I know, it seems weird having a constructor for a list of constants. Bear with me and I will explain! 🐻✌

Constructors for an enum type should be declared as `private`. The compiler allows constructors to be declared as public, but this can seem misleading, since `new` can never be used with enums!

Let's get more specific about our sizes, and add a variable for the volume, measured in (fluid) ounces. We can call it *ounces*. We want to set the value of *ounces* for each size on creation. How do we do that? We will do this through the constructor. 

```java
enum CoffeeSize {
  SHORT(6),
  BIG(8),
  HUGE(10),
  OVERWHELMING(16);

  private int ounces;

  //constructor
  private CoffeeSize(int ounces) {
    this.ounces = ounces;
  }

  public int getOunces(){
    return ounces;
  }
}
```

## Rules

-	An enum can be declared outside or inside a class; but NOT in a method.
- The list of constants must be the first statement.
-	An enum that is not enclosed in a class can be declared with only the public or default modifier.
-	`new` can never be used with an enum.
-	A constant specific class body can redefine a method for that constant, it overrides the method defined in the enum.
- If an enum is used in a case statement, you should NOT use the class prefix (use `BIG`). Everywhere else, you should use the prefix ( use `CoffeeSize.BIG`), unless the enum is in the same class.

    ```java
    CoffeeSize c = CoffeeSize.OVERWHELMING;

    switch (c){
      case CoffeeSize.BIG: //compiler error
        System.out.println("Im big.");
      case HUGE:
        System.out.println("Im huge");
      case OVERWHELMING:
        System.out.println("Im overwhelming. I cannot be finished!");
    }
    ```

## Final Words

An experienced Developer friend of mine said to me recently, "When would you use enumerations?" in a withering, quizzical way! That surprised me. You won't use them that often, but they certainly have their use and can add value to your code.

Let me know if you are interested in any Java topics, and maybe I will write about them.

Happy hacking! 👩‍💻👨‍💻🙌