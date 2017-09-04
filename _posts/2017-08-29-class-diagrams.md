---
layout: post
title: "Class Diagrams - Typical Format and Best Practices"
category: UML
tags: [class diagrams, UML, OO Design]
---
Class diagrams are used to show the structure and content of our application.

I present the typical format of class diagrams here. It is common to simplify and omit certain details of a class diagram depending on the level of detail required to the needs of the project at that time. For example, if it's used as a communication aid for discussion between business people and technical people, not too much detail is required.

## Classes

A class represents a group of things that have common state and behaviour. For example, Toyota and Ford are both types of cars, so you can represent them using a class named Car.

In UML, we represent a class using a rectangle with 3 sections.

![class](/assets/img/post-2017-08-29-class.png)

The class name is put in the top section and is typically formatted as following:

- Starts with a capital letter
- Is centered
- Is written in a boldface font (not always)
- Is written in italics if the class is abstract

## Attributes

The properties of a class are referred to as attributes. An example attribute for a Car class would be: colour, brand, model.

Attributes have a data type to tell us how we would use the attribute e.g. we can do arithmetic on numbers. In a statically-typed language like Java, it is required to have an explicit data type for each attribute.

![class](/assets/img/post-2017-08-29-class-attributes.png)

Attributes are listed in the second section typically in the form of:

*[access] [name] [multiplicity] [:type [=default value]]*

To explain each part of the form:
1. access: this is where we can access the attribute from, also known as visibility. for example, if the attribute is private, the attribute can only be accessed from inside the class. the values are:

|UML Notation|Access|
|------------|------|
|+ |public|
|-|private|
|#| protected|
|~|package|

2. name: is a noun or short phrase naming the attribute. Typically the first letter is lowercase, and the first letter of each subsequent word is capitalized

3. multiplicity: Specifies how many instances of the attribute's type are referenced by this attribute. Can be absent (meaning multiplicity of 1), a single integer, or a range of values specified between square brackets separated by "..". Usually used for collections.

4. type: the data type. Typically a class, interface, or built-in type like int.

5. default: default value of the attribute

Typically, attributes are private; or protected if there is inheritance so we don't allow unintended manipulation of data.

The only time we make attributes public is for constants, which are usually denoted as follows:

*public static int PI = 3.14;*.

## Operations

An action that can be performed by the class. Also know as method.

![class](/assets/img/post-2017-08-29-class-operations.png)

Methods are listed in the third section of the rectangle typically in the form of:

*[access] [name (parameters)] [:type]*

1. access: same as with attributes

2. name (parameters): is a verb or short phrase naming the operation following by brackets e.g. drive() for our Car class. Parameters that can be passed to an operation can be listed within the brackets in the form of *name: type*

Typically, a getter and setter is created for each attribute.

## Relationships

Relationships show the connections between classes, also known as associations.

It can be down to the interpretation of the person modelling the domain which type of relationship is most suitable to a given set of circumstances, the important thing is to clearly convey the ideas and be consistent in usage throughout the model.

The strength of a relationship is based on how dependent the classes involved in the relationship are on each other. Two classes that are strongly dependent on one another are said to be tightly coupled; changes to one class will most likely affect the other class. Tight coupling is usually, but not always, a bad thing; therefore, the stronger the relationship, the more careful you need to be.

Here are the relationship types in order of weak to strong.

### Dependency

The weakest relationship between classes is a dependency relationship. Dependency between classes means that one class uses, or has knowledge of, another class. It is typically means that a dependent class briefly interacts with the target class.

Usage: The dependency relationship is often used when you have a class that is providing a set of general-purpose utility functions, such as in Java's regular expression (java.util.regex) and mathematics (java.math) packages. Classes depend on the java.util.regex and java.math classes to use the utilities that those classes offer.

The dependency is represented as a dotted line with an arrow on one end between classes.

### Assocations

Associations are stronger than dependencies and typically indicate that one class retains a relationship to another class over an extended period of time. A class actually contains a reference to an object, or objects, of the other class in the form of an attribute.

Usage: If you find yourself saying that a class works with an object of another class, then the relationship between those classes is a great candidate for association rather than just a dependency.

The association is shown using a simple line connecting two classes. Navigability is often applied to an association relationship to describe which class contains the attribute that supports the relationship.

Sometimes an association itself introduces new classes. Association classes are particularly useful in complex cases when you want to show that a class is related to two classes because those two classes have a relationship with each other.

### Aggregation

Aggregation is really just a stronger version of association and is used to indicate that a class actually owns but may share objects of another class.

It is also referred to as a whole-part relationship. For example, a product is part of a line item.

Aggregation is shown by using an empty diamond arrowhead next to the owning class.

### Composition

Composition is similar to aggregation, but has a static relationship. If an object of one class that "owns" an object of another class, and is destroyed, then both objects are destroyed.

It is a strong whole-part relationship where the parts live and die with the whole. For example, a line item is part of an order.

The term "has a" to describe a relationship, when you find yourself stating that a class has a part that is an object of another class, usually indicates that the relationship is likely to be one of association, aggregation, or composition.

### Generalization

Generalization is used to describe a class that is a more general, less specific type of another class, this is also known as inheritance.

The term "is a" to describe a relationship, when you find yourself saying that the class is a type of another class, generalization is usually the relationship type used.

A solid line with a closed arrow is used to show that the target class is a more general type of another class.

## Interface

An interface is a classifier that has declarations of properties and methods but no implementations.

There are two representations for an interface; which one you should use depends on what you're trying to show exactly.

The first representation is similar to a class but has with the stereotype «interface» in the name section.

The second representation of an interface is the ball-and-socket notation. This representation shows less detail for the interface but is more convenient for showing relationships to classes.

## Note

You can put a note on any part of a UML diagram. Connect the note to the relevant bit with a dashed line, as shown in the example below.

![note attached to class](/assets/img/class-diagram-note.png)
