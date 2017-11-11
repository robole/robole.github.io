---
layout: scrollable_post
title: "Class Diagrams - Typical Format and Best Practices"
category: UML
tags: [class diagrams, UML, OO Design, Java]
---
Class diagrams are used to show the structure and content of our application.

Class diagrams are part of the [Unified Modelling Language (UML)](https://en.wikipedia.org/wiki/Unified_Modeling_Language) standard, categorized as a Structural Diagram.

I present the typical format of class diagrams here. I use the UML terminology predominantly i.e. operation rather than method.

It is common to simplify and omit certain details of a class diagram, usually depending on the level of detail required to the needs of the project at that time. For example, if it's used as a communication aid for discussion between business people and technical people to understand the business, not too much detail is required.

## Classes

A class represents a group of things that have common state and behaviour.

For example, Toyota and Ford are both types of cars, so you can represent them using a class named Car.

In a class diagram, we represent a class using a rectangle with 3 sections.

![class](/assets/img/post-2017-08-29-class.png)

The class name is put in the top section and is typically formatted as following:

- Starts with a capital letter
- Is centered
- Is written in a boldface font
- Is written in italics if the class is abstract

## Attributes

The properties of a class are referred to as attributes. Example attributes for a Car class would be: colour, brand, model.

Attributes can have a data type to tell us how we would use the attribute e.g. we can do arithmetic on numbers. In a statically-typed language like Java, it is required to have an explicit data type for each attribute.

![class](/assets/img/post-2017-08-29-class-attributes.png)

Attributes are listed in the second section typically in the form of:

*[access] [name] [multiplicity] [:type [=default value]]*

To explain each part of the form:
1. Access: This is where we can access the attribute from, also known as visibility. For example, if the attribute is private, the attribute can only be accessed from inside the class. The values allowed are:

|UML Notation|Access|
|------------|------|
|+ |public|
|-|private|
|#| protected|
|~|package|

2. Name: The name is selected by you! Typically, it is a noun or short phrase to give the attribute a meaningful identity. Typically the first letter is lowercase, and the first letter of each subsequent word is capitalized, this format is referred to as camel case.

3. Multiplicity: Specifies how many instances are referenced by this attribute. It can be: absent (meaning there is a multiplicity of 1); a single integer; or a range of values specified between square brackets separated by "..".

4. Type: The data type. Typically a class, interface, or built-in type such as int.

5. Default: The default value of the attribute.

Typically, attributes are private; or protected if we want subclasses to inherit these attributes (more on this in Relationship section).

The only time that attributes are made public is for constants (values cannot be changed), which are usually written as follows:

```
public static int PI = 3.14;
```

## Operations

An action that can be performed by the class. Also know as method.

![class](/assets/img/post-2017-08-29-class-operations.png)

Operations are listed in the third section of the rectangle typically in the form of:

*[access] [name (parameters)] [:type]*

1. Access: Same concept as with attributes.

2. Name (parameters): The name is selected by you! Typically, it is a verb or short phrase to give the operation a meaningful identity. The name is always following by brackets. Parameters can be passed to an operation listed within the brackets in the form of *name: type*, parameters are values we use within our operation.

Typically, a getter and setter is created for each attribute. A setter is an example of an operation with a parameter, we use the parameter to set the value of an attribute.

## Relationships

Relationships show the connections between classes, also known as associations.

It is up to the interpretation of the person modelling the application, which type of relationship is most suitable depending on the conditions, the important thing is to clearly convey the ideas and be consistent in usage throughout the model.

The strength of a relationship is based on how dependent the classes involved in the relationship are on each other. Two classes that are strongly dependent on one another are said to be tightly coupled; changes to one class will most likely affect the other class. Tight coupling is usually, but not always, a bad thing; therefore, the stronger the relationship, the more you should consider if it is the right way to model the situation.

Below are the relationship types in order of weak to strong.

### Dependency

The weakest relationship between classes is a dependency relationship. Dependency is usually where an object of one class uses or creates an object of another class in an operation, and the object is not stored in an attribute. So, a dependent class briefly interacts with the target class.

Usage: The dependency relationship is not used too often really. But a common usage is when you have a class that is providing a set of general-purpose utility functions. For example, using Java's Logging (classes in the java.util.logging package), and an operation in one of you classes needs to write a record of a transaction to a log.

The dependency is represented as a dotted line with an arrow on one end between classes.

![class dependency](/assets/img/post-2017-08-29-class-dependency.png)

### Associations

Associations indicate that one class retains a relationship to another class over an extended period of time. A class actually has a reference to another class as an attribute.

Usage: If you find yourself saying that a class works with an object of another class, and they need to know about each other over a longer period of time, then the relationship between those classes is a candidate for an association.

The association is shown using a simple line connecting two classes. Navigability is often applied to an association relationship to describe which class contains the attribute that supports the relationship.

![class association](/assets/img/post-2017-08-29-class-association.png)

### Aggregation

Aggregation is really just a stronger version of association and is used to indicate that a class actually "owns" another class. It is also referred to as a "whole-part" relationship to clarify the meaning.

Usage: Usually, it is the judgement of the modeller to decide if it is an association or an aggregation. Both are implemented the same way in code using an attribute as a reference to another class, it just conveys more meaning by selecting one instead of the other. For example, a Product is part of a Line Item, and would be an aggregation. A City where a Student lives is not "owned" by a Student, so would be better described as an association.

Aggregation is shown by using an empty diamond arrowhead next to the owning class.

![class aggregation](/assets/img/post-2017-08-29-class-aggregation.png)

### Composition

Composition is similar to aggregation, but has a "destructive" relationship. If an object of one class that "owns" an object of another class, and is deleted, then both objects are deleted.

Usage: It is a strong "whole-part" relationship where the parts live and die with the whole. For example, a Line Item is part of an Order, delete the Order, then the Line Item is deleted too. An engine is part of a Car.

![class aggregation](/assets/img/post-2017-08-29-class-composition.png)

The term "has a" to describe a relationship, when you find yourself stating that a class has a part that is an object of another class, usually indicates that the relationship is likely to be one of association, aggregation, or composition. You can follow the broad advice above to choose the most appropriate option.

### Generalization

Generalization is used to create a hierarchy of related classes. It begins with a base class that is a more general, less specific type of another class. This is also known as inheritance.

Usage: We use this when we want to share common attributes and operations in a family of related classes. When you find yourself using the term "is a" to describe a relationship, that a class is a type of another class, generalization is a candidate for the relationship type. You start with a general class like Shape (often referred to as a parent or superclass), then you get more specific with classes such as Circle and Square (often referred to as a child or subclasses).

A solid line with a closed arrow is used to show that the target class is a more general type of another class.

![class generalization](/assets/img/post-2017-08-29-class-generalization.png)

## Interface

An interface is another type of classifier, like a class! An interface defines a contract for what a class can do, without saying anything about how the class will do it. It’s basically a list of related attributes, and operations without implementations.

Usage: It takes a bit of time to realise why you would want to use interfaces. Interfaces are mainly used to provide polymorphic behaviour with more flexibility than generalization. Interfaces help to break up the complex designs and clear the dependencies between objects. This helps to make your software more flexible. You use an interface to define a set of behaviour that can be implemented by any class anywhere in the class hierarchy.

There are two representations for an interface; which one you should use depends on what you're trying to show exactly.

1. This is similar to a class but has with the stereotype «interface» in the name section. The relationship is represented as a dotted line with a closed arrow pointing to the interface, this relationship is sometimes referred to as a realization relationship type. Use this when you want to show more details.

![class interface detailed](/assets/img/post-2017-08-29-class-interface1.png)

2. This is called the ball-and-socket notation because of it's appearance. This representation shows less detail for the interface but is more convenient for showing relationships to classes. It is often used in addition to the first representation in situations where an interface is implemented by many classes.

![class interface less detailed](/assets/img/post-2017-08-29-class-interface2.png)

## Note

You can put a note on any part of a UML diagram. Connect the note to the relevant bit with a dashed line, as shown in the example below.

![note attached to class](/assets/img/class-diagram-note.png)
