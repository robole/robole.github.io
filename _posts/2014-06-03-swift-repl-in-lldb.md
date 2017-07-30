---
published: true
layout: default
---

## Swift REPL

Apple's new programming language swift has a great playground but can also be run in LLDB as a read-eval-print-loop:

    $ alias swift=/Applications/Xcode6-Beta.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift
    $ swift
    Welcome to Swift!  Type :help for assistance.
    1> let greeting = "Hello REPL!"
    greeting: String = "Hello REPL!"
    2> println(greeting)
    Hello REPL!


Enjoy.