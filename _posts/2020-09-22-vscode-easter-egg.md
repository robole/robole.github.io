---
layout: post
title: "VS Code's Secret Snippets"
description: "Did you know that VS Code has built-in snippets? They are not documented in the VS Code docs. There is no way to browse them inside VS Code. Try the Snippets Ranger extension to round them up!"
category: vscode
image: /assets/img/blog/2020-09-22-vscode-easter-egg/banner.jpg
tags: [vscode]
published: true
---
<img src="/assets/img/blog/2020-09-22-vscode-easter-egg/banner.jpg" alt="banner" style="display:block;max-width:1200px;width:100%;"/>

Did you know that VS Code has built-in snippets for lots of languages?

<img src="/assets/img/blog/2020-09-22-vscode-easter-egg/js-snippets.png" alt="snippets ranger logo" style="display:block;max-width:686px;width:100%;"/>

They are **not documented** in the VS Code docs.

There is **no way to browse them inside VS Code**.

## Soo, how can I find them?

It's awkward to track them down yourself!

<a href="https://marketplace.visualstudio.com/items?itemName=robole.snippets-ranger"><img src="/assets/img/blog/2020-09-22-vscode-easter-egg/logo.png" alt="snippets ranger logo" style="display:block;max-width:300px;width:100%;"/></a>

This spurred me to write an extension called [**Snippets Ranger**](https://marketplace.visualstudio.com/items?itemName=robole.snippets-ranger) to give a nice UI to explore all your snippets easily.

<img src="/assets/img/blog/2020-09-22-vscode-easter-egg/snippets-ranger-demo.gif" alt="snippets ranger logo" style="display:block;max-width:697px;width:100%;"/>

Also, remember that Snippets can be defined in a few different places. They can be added by:
- Creating a global snippets file, a workspace snippets file, or a language-specific file;
<img src="/assets/img/blog/2020-09-22-vscode-easter-egg/user-snippets.png" alt="snippets definition" style="display:block;max-width:718px;width:100%;"/>
- Installing extensions found in the ["Snippets" category](https://marketplace.visualstudio.com/search?target=VSCode&category=Snippets&sortBy=Installs) in the Visual Studio Marketplace;
- Installing some of the [Programming Language extensions](https://marketplace.visualstudio.com/search?target=VSCode&category=Programming%20Languages&sortBy=Installs), which often have hidden snippets cargo e.g. [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python);
- the VS Code team to the built-in language extensions.

Keeping track of them yourself is not practical.

## How do I find the built-in snippets myself?

If you want to track down the source files yourself, they live inside each individual language extension directory. The file for each language is located at `«app root»\resources\app\extensions\«language»\snippets\«language».code-snippets` on Windows. The location is similar for Mac and Linux.

## Find this helpful?

I would appreciate if you add a [favourable review](https://marketplace.visualstudio.com/items?itemName=robole.snippets-ranger&ssr=false#review-details) in the marketplace or star the [github repo](https://github.com/robole/vscode-snippets-ranger).

If encounter an issue or have a feature request, you are welcome to make an [issue on github](https://github.com/robole/vscode-snippets-ranger/issues).

<span style="font-size:.7em">Banner Photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/easter-egg?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
