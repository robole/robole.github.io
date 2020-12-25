---
layout: post
title: "How to get intellisense for third-party JavaScript libraries in VS Code"
description: "You may have noticed that if you use a third-party JavaScript library in your front-end code in VS Code, you don't get any intellisense goodness. There is a simple way!"
image: /assets/img/blog/2020-12-26-vscode-intellisense-external-library/cover.jpg
tags: [vscode]
published: false
---
<figure>
<img src="/assets/img/blog/2020-12-26-vscode-intellisense-external-library/cover.jpg" alt="reference image of killing eve title" style="display:block;width:100%;max-width:1200px;">
<figcaption style="text-align:center">Photo by <a href="https://unsplash.com/@bermixstudio?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Bermix Studio</a></figcaption>
</figure>

You may have noticed that if you are using a third-party JavaScript library in your front-end code, you don't get any intellisense goodness in VS Code. 🙁

I want it, I want it. Gimme, gimme. Getting intellisense withdrawl? 😖

I got you!

VS Code is written in TypeScript. If VS Code sees type defintions in a project (files with the *.d.ts* extension), it will give you intellisense for those types in your JavaScript and TypeScript files. So, you can use type defintions to power intellisense for JavaScript libraries. All you need to do is grab the type defintions of the library you're using from NPM, and save it as dev dependency. That's it!

For example, to get intellisense for the [Greensock (GSAP)](https://greensock.com/) animation library, run the following command.

```bash
npm install --save-dev @types/gsap
```

And you can use it immediately after the download completes.

![Intellisense for GSAP](/assets/img/blog/2020-12-26-vscode-intellisense-external-library/intellisense-gsap.png)

Types for these packages are mostly sourced from the [DefinitelyTyped GitHub repo](https://github.com/DefinitelyTyped/DefinitelyTyped).There are some other packages that follow this `@types/<<library name>>` naming convention. You can search for NPM packages that have type definitions using [https://www.typescriptlang.org/dt/search?search=](https://www.typescriptlang.org/dt/search?search=).

One drawback is that not all the packages are up-to-date. I found [@types/gsap](https://www.npmjs.com/package/@types/gsap) to be incomplete. It does not include a definition for the `gsap` object. The [gsap npm package](https://www.npmjs.com/package/gsap) has complete types and better function descriptions. So, you can install that as a dependency instead - `npm install --save-dev gsap`.

![Intellisense for GSAP](/assets/img/blog/2020-12-26-vscode-intellisense-external-library/intellisense-gsap.png)

One thing to note is that the type defintions don't provide intellisense inside `script` tags in your HTML. There is an open [feature request for this](https://github.com/microsoft/vscode/issues/26338).
