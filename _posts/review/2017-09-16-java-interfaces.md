---
layout: post
title: Interfaces in Java - What, Why and How?☕
category: programming
tags: [interfaces, java, OO Design, progamming]
---
# What is an interface?

An interface defines a contract for what a class can do, without saying anything about how the class will do it.

It’s basically a list of related method declarations without implementations. A class that implements the interface agrees to implement all of the methods defined in the interface, thereby agreeing to certain behaviour.

# What must a class do to implement an interface?

The class must identify the interface in its implements clause and implement all of the methods specified in the interface.

# What are the rules of defining interfaces?

1.	An interface is implicitly abstract. It is considered redundant to state it as so. The below are the same:

```java
public abstract interface Rollable { }
public interface Rollable { }
```

2.	The public modifier is required if you want the interface to have public rather than default access.

3.	An interface can only declare constants. All variables defined in an interface are implicitly public, static, and final.

4.	An interface can extend one or more other interfaces, but nothing else.

5.	Interface methods cannot be marked as static, final, stricfp, or native.

6.	An interface cannot implement another interface or class.

# How do you code to an interface, rather than to an object?

Consider the simple example of a class Car that implements interface Vehicle. Interface Vehicle has a single method called start(). Class Car will implement the interface by providing a start() method. Other functionality in the Car class has been left out for the sake of clarity.

```java
interface Vehicle {
  public void start();
}

class Car implements Vehicle{
   public void start()
   {
     //implementing code here
   }
}
```

Having laid the foundations of the Car object, we can create another object called Valet. It is the Valet's job to start the Car and bring it to the restaurant patron. The Valet object can be written without interfaces, as follows:

```java
class Valet
{
   public Car getCar( Car c){
     ...
   }
}
```

The Valet object has a method called getCar that returns a Car object. This code example satisfies the functional requirements of the system, but it forever links the Valet object with that of the Car. In this situation, the two objects are said to be tightly coupled. The Valet object requires knowledge of the Car object and has access to all public methods and variables contained within that object. It is best to avoid such tight coupling of code because it increases dependencies and reduces flexibility.
To code the Valet object using interfaces, the following implementation could be used:

```java
class Valet
{
   public Vehicle getVehicle( Vehicle c){  
     ...  
   }
}
```

While the code changes are fairly minor -- changing the references from Car to Vehicle -- the effects on the development cycle are considerable. Using the second implementation, the Valet has knowledge only of the methods and variables defined in the Vehicle interface. Any other public methods and data contained in the specific implementation of the Vehicle interface are hidden from the user of the Vehicle object.

# Should you define all classes in terms of interfaces?

Some say you should define all classes in terms of interfaces, but I think this recommendation seems a bit extreme.

In Java when you add a new method to an interface, you break all your clients. When you have an abstract class, you can add a new method and provide a default implementation in it. All the clients will continue to work.

As always there is a trade-off, an interface gives you freedom with regard to the base class; an abstract class gives you the freedom to add new methods later. In the light of evolution you should consider whether an abstract class is sufficient.

# Why use interfaces?

Interfaces are mainly used to provide polymorphic behaviour. Interfaces help to break up the complex designs and clear the dependencies between objects. This helps to make your software more flexible. You use an interface to define a protocol of behaviour that can be implemented by any class anywhere in the class hierarchy.

Interfaces are useful for the following:

-	Capturing similarities between unrelated classes without artificially forcing a class relationship. It is often used for peripheral abilities of classes.
-	Declaring methods that one or more classes have to implement
-	Revealing an object's programming interface without revealing its class. Objects such as these are called anonymous objects and can be useful when shipping a package of classes to other developers.
Coding to interfaces rather than to objects provides higher efficiency in the various phases of a system's lifecycle:
-	Design: the methods of an object can be quickly specified and published to all affected developers
-	Development: the Java compiler guarantees that all methods of the interface are implemented with the correct signature and that all changes to the interface are immediately visible to other developers
-	Integration: there is the ability to quickly connect classes or subsystems together, due to their well-established interfaces
-	Testing: interfaces help isolate bugs because they limit the scope of a possible logic error to a given subset of methods

# What if two interface methods clash in implementation?

If two interfaces have the same method signature, they effectively declare the same method, regardless of any other intentions. Any concrete class that implements both interfaces can only provide one implementation of a given method signature, so there is no ambiguity about how the Java compiler deals with this case, only a potentially difficult design decision.

If two interface methods have a clash over their method signatures and intended behaviour, it would preferable to rename one of the interface methods to indicate a more distinct purpose.

# Can you give an example of multiple inheritance with interfaces?

To illustrate multiple inheritance, consider a bat, which is a mammal that flies. We might have two interfaces: Mammal, which has a method suckleInfant(Mammal), and Flyer, which has a method fly().

# Additional Reading

[Use interfaces to effectively enforce development contracts while maintaining loose coupling of code](https://www.javaworld.com/article/2076468/core-java/smarter-java-development.html)
