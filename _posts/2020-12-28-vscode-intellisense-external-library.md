---
layout: post
title: "Add IntelliSense for third-party JavaScript libraries in VS Code (it is not always automatic)"
description: "You may have noticed that if you use a third-party JavaScript library in your front-end code in VS Code, you don't get any IntelliSense goodness. There is a simple way to solve this!"
image: /assets/img/blog/2020-12-28-vscode-intellisense-external-library/cover.jpg
tags: [vscode]
published: true
---
<figure>
<img src="/assets/img/blog/2020-12-28-vscode-intellisense-external-library/cover.jpg" alt="blank picture" style="display:block;width:100%;max-width:1200px;">
<figcaption style="text-align:center">Photo by <a href="https://unsplash.com/@bermixstudio?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Bermix Studio</a></figcaption>
</figure>

In VS Code, you may have noticed that if you are using a third-party JavaScript library in your front-end code, you don't get any IntelliSense goodness. 🙁

This is for the case where you using a `script` tag to include a third-party library.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
		...
    <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

In this example, I'm including the [Greensock (GSAP)](https://greensock.com/) animation library. In *main.js*, I don't get IntelliSense for GSAP.

IntelliSense for JavaScript libraries and frameworks is powered by TypeScript type declaration files (with the *.d.ts* extension). Type declaration files are written in TypeScript so that they can express the data types of parameters and functions, allowing VS Code to provide a rich IntelliSense experience.

VS Code has [automatic type aquisition](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition), which means that it will automatically fetch these types for you, but with a big caveat.

> Type declaration files are automatically downloaded and managed by Visual Studio Code for packages listed in your project's package.json or that you import into a JavaScript file.

In my use case, I do neither. This is probably a less common scenario now. It would happen to beginners and some people eschewing tools on a simple/small project.

Gimme, gimme. Im getting IntelliSense withdrawal! 😖

The simplest solution is to find the NPM package with the types, and include it as a dev dependency. This way, your code can remain the same.

```bash
npm install --save-dev @types/gsap
```

Once the download completes, IntelliSense is available immediately.

<img src="/assets/img/blog/2020-12-28-vscode-intellisense-external-library/intellisense-gsap.png" alt="IntelliSense for gsap" style="display:block;width:100%;max-width:617px;">

Types for some libraries are sourced from the [DefinitelyTyped GitHub repo](https://github.com/DefinitelyTyped/DefinitelyTyped).Many popular packages follow this `@types/<<library name>>` naming convention also.

You can search for NPM packages that have type definitions using [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search).

You may find that some packages are not up-to-date. I found [@types/gsap](https://www.npmjs.com/package/@types/gsap) to be incomplete. It does not include a definition for the `gsap` object. The [gsap npm package](https://www.npmjs.com/package/gsap) covers the entire API. So, you can install that as a dependency instead - `npm install --save-dev gsap`.

<img src="/assets/img/blog/2020-12-28-vscode-intellisense-external-library/intellisense-gsap.png" alt="IntelliSense for gsap using official npm package" style="display:block;width:100%;max-width:741px;">

One thing to note is that the type definitions don't provide IntelliSense inside `script` tags in your HTML file. There is an [open issue requesting this feature](https://github.com/microsoft/vscode/issues/26338). Hopefully, this will be resolved in the near future! 🤞
