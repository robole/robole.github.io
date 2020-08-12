---
layout: post
title: "VS Code: You don't need that extension"
description: "I was digging deeper in VS Code recently and made some interesting discoveries. There are quite a few features and settings that ably do the work of many popular extensions."
category: vscode
image: /assets/img/blog/2020-08-05-dont-need-extensions/banner.png
tags: [vscode]
published: true
---
<img src="/assets/img/blog/2020-08-05-dont-need-extensions/banner.png" style="width:100%;max-width:1200px;"/>

I was digging deeper in VS Code recently and made some interesting discoveries. There are quite a few features and settings that ably do the work of many popular extensions.

<!-- TOC -->
- [1. Auto renaming and closing tags](#1-auto-renaming-and-closing-tags)
- [2. Synchronizing Settings](#2-synchronizing-settings)
- [3. Auto import modules](#3-auto-import-modules)
- [4. Snippets for HTML, CSS, and JS](#4-snippets-for-html-css-and-js)
- [5. Fake text (Dummy text)](#5-fake-text-dummy-text)
- [6. Autotrimming](#6-autotrimming)
- [7. Running tasks (NPM and others)](#7-running-tasks-npm-and-others)
- [8. Conclusion](#8-conclusion)
<!-- /TOC -->

## 1. Auto renaming and closing tags

Rename HTML tag pairs with a single edit. Automatically add a closing tag when adding a new tag.

![rename tag pairs](/assets/img/blog/2020-08-05-dont-need-extensions/rename.gif)

### 1.1. Extension

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (3.3M downloads): "Automatically rename paired HTML/XML tag, same as Visual Studio IDE does."
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) (3.1M downloads): "Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text."
- [Close HTML/XML tag](https://marketplace.visualstudio.com/items?itemName=Compulim.compulim-vscode-closetag): "Quickly close last opened HTML/XML tag."

### 1.2. Setting

The naming of `Editor: Rename on Type` is a bit vague and obscure, this is probably why many people never find the setting for auto renaming! Auto closing of tags is enabled by default.

- `Editor: Rename on Type`: "Controls whether the editor auto renames on type." Default is `false`. This controls auto rename.
- `HTML: Auto Closing Tags`: Default is `true`.
- `JavaScript: Auto Closing Tags`: "Enable/disable automatic closing of JSX tags. Requires using TypeScript 3.0 or newer in workspace". Default is `true`.
- `TypeScript: Auto Closing Tags`: "Enable/disable automatic closing of JSX tags. Requires using TypeScript 3.0 or newer in workspace". Default is `true`.

Support is for HTML files only at the moment. There is an [open issue](https://github.com/microsoft/vscode/issues/85707) to add this for JSX files.

It is unlikely that this will be added for Vue files, it is more likely to be picked up by the Vetur extension, which has a [long-standing issue](https://github.com/vuejs/vetur/issues/565) open for this.

#### 1.2.1. settings.json

```json
  "editor.renameOnType": true,
  "html.autoClosingTags": true.
  "javascript.autoClosingTags": true,
  "typescript.autoClosingTags": true
```

## 2. Synchronizing Settings

VS Code now supports synchronizing VS Code settings across different machines, this feature is available for preview in [VS Code Insiders](https://code.visualstudio.com/insiders/) right now. It should reach the standard version very soon.

I am trying it out at the moment, and so far, so good.

### 2.3. Extensions

- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) (1.8M downloads): Syncs your settings, keybindings, snippets, extensions, and launch files to a GitHub Gist.

### 2.4. Feature and Settings

You read all about this feature in the [User Guide](https://code.visualstudio.com/docs/editor/settings-sync). Below is what the Settings look like.

![sync settings](/assets/img/blog/2020-08-05-dont-need-extensions/sync.jpg)

You synchronise using a Microsoft or GitHub account.

![sync initialisation options](/assets/img/blog/2020-08-05-dont-need-extensions/sync-options.jpg)

## 3. Auto import modules

Managing imports for JavaScript and TypeScript modules can become a pain, especially when you want to re-organise your project, or refactor your code.It's desirable to automate this if possible!

### 3.5. Extensions

- [Auto import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) (1.1M downloads): Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX.
- [Move TS - Move TypeScript files and update relative imports](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts) (308K downloads): Supports moving typescript files and updating relative imports within the workspace.
- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import) (157K downloads)

### 3.6. Settings

- `JavaScript > Suggest: Auto Imports` : "Enable/disable auto import suggestions. Requires using Typescript 2.6.1 or newer in workspace." Default value is `true`.
- `TypeScript > Suggest: Auto Imports`: "Enable/disable auto import suggestions. Requires using Typescript 2.6.1 or newer in workspace." Default value is `true`.
- `JavaScript > Update Imports on File Move: Enabled`: "Enable/disable automatic updating of import paths when you rename or move a file in VS Code. Require using TypeScript 2.9 or newer in the workspace." Default value is `"prompt"`.
- `TypeScript > Update Imports on File Move: Enabled`: "Enable/disable automatic updating of import paths when you rename or move a file in VS Code. Require using TypeScript 2.9 or newer in the workspace." Default value is `"prompt"`.

#### 3.6.2. settings.json

```json
"javascript.suggest.autoImports": true,
"typescript.suggest.autoImports": true,
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.updateImportsOnFileMove.enabled": "always",
```

Also, if you would like your imports to be organised when you save, you can add the setting below. It will remove unused import statements, and arrange import statements with absolute paths on top. I am a big fan of these kind of set-and-forget tasks.

```json
"editor.codeActionsOnSave": {
    "source.organizeImports": true
}
```

## 4. Snippets for HTML, CSS, and JS

You may want to create a HTML boilerplate to get started quickly, add code chunks to save you keystrokes, or have expansions to complete a block for what you're typing. These similar but slightly different needs are addressed below.

### 4.7. Extension

- [HTML Snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets) (3.8M downloads): "Full HTML tags including HTML5 Snippets."
- [HTML Boilerplate](https://marketplace.visualstudio.com/items?itemName=sidthesloth.html5-boilerplate) (684K downloads): "A basic HTML5 boilerplate snippet generator."
- [CSS Snippets](https://marketplace.visualstudio.com/items?itemName=joy-yu.css-snippets) (22K downloads): "Shorthand snippets for css."

### 4.8. Feature

[Emmet](https://www.emmet.io/) is built into VS Code. Emmet offers abbreviation and snippet expansions for HTML and CSS. 🤫 You can read the [VS Code User Guide](https://code.visualstudio.com/docs/editor/emmet) for more info. 

Emmet is enabled by default for html, haml, pug, slim, jsx, xml, xsl, css, scss, sass, less and stylus files.

To create a boilerplate for HTML, you type "!" and hit tab.

![html boilerplate](/assets/img/blog/2020-08-05-dont-need-extensions/html-boilerplate.gif)

There are abbreviations which use CSS style selectors such as:

```html
ul>li*5
```

which produces this:

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

Expansions like typing "a" and hitting tab will produce `<a href="">` and will place your cursor is inside the quotations, ready for you to fill in the *href*.

That's just a quick overview of what you can for HTML, it offers similar capabilities for CSS, my favourite is adding [vendor-prefixes automatically](https://docs.emmet.io/css-abbreviations/vendor-prefixes/). Check out the [Emmet Docs](https://docs.emmet.io/) for more info, and the [cheatsheet](https://docs.emmet.io/cheat-sheet/) for future reference.

Secretly, there are default JavaScript snippets included in VS Code also. To find the buried treasure, you can look in this file on Windows: `Microsoft VS Code\resources\app\extensions\javascript\snippets\javascript.code-snippets`.

You can [customise or create your own snippets](https://code.visualstudio.com/docs/editor/emmet#_using-custom-emmet-snippets) by adding them to a json file named `snippets.json`. 

You can [enable Emmet for more languages](https://code.visualstudio.com/docs/editor/emmet#_emmet-configuration) For example, to include Emmet support for Vue and JavaScript, add the following to `settings.json`:

```json
"emmet.includeLanguages": {
  "vue-html": "html",
  "javascript":"javascriptreact"
}
```

There is a gotcha ([bug?](https://github.com/microsoft/vscode/issues/104259)) for including Emmet support for markdown, you must also ensure that the excluded language list is empty, as per snippet below. This workaround is discussed in [this stack overflow question](https://stackoverflow.com/questions/49956963/markdown-not-using-emmet).

```json
"emmet.excludeLanguages": [],
"emmet.includeLanguages": {
  "markdown": "html"
}
```

```json
"emmet.excludeLanguages": [],
"emmet.includeLanguages": {
  "markdown": "html"
}
```

## 5. Fake text (Dummy text)

You may want to insert some fake text to fill out a webpage to see how your UI looks. You are probably familiar with "lorem ipsum" text generators.

### 5.9. Extension

- [Lorem Ipsum](https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum) (168K Downloads)

### 5.10. Feature

As mentioned in number 4 above, Emmet is built into VS Code, it has a [_lorem_ abbreviation](https://docs.emmet.io/abbreviations/lorem-ipsum/).

Type "lorem" and hit tab, and it will generate a 30-word dummy paragraph.

![lorem abbreviation](/assets/img/blog/2020-08-05-dont-need-extensions/lorem.jpg)

You can use it to generate multiple blocks of any kind. For example, "p\*2>lorem" abbreviation would generate something like this:

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
  molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias
  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!
</p>
<p>
  Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore
  recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at
  neque quos facere sequi unde optio aliquam!
</p>
```

## 6. Autotrimming

Remove trailing whitespace automatically.

The setting I suggest is not an exact like-for-like replacement: the extensions trim whitespace while you edit or via a command; whereas the setting will perform the trimming on save.

### 6.11. Extension

- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) (447K downloads) : "Highlight trailing spaces and delete them in a flash!"
- [Autotrim](https://marketplace.visualstudio.com/items?itemName=NathanRidley.autotrim) (15K downloads): "Trailing whitespace often exists after editing lines of code, deleting trailing words and so forth. This extension tracks the line numbers where a cursor is active, and removes trailing tabs and spaces from those lines when they no longer have an active cursor."

### 6.12. Settings

- `Files : Trim Trailing Whitespace`: "When enabled, will trim trailing whitespace when saving a file." The default value is `false`.

#### 6.12.3. settings.json

I exclude Markdown from this because if you want a [hard line-break](https://spec.commonmark.org/0.29/#hard-line-breaks) (`<br>`) in the output, you need to put two or more spaces at the end of a line. It's not something you would do often, or at all really IMO, but why prevent it when it is part of [CommonMark](https://commonmark.org/)?

```json
"files.trimTrailingWhitespace": true,
"[markdown]": {
   "files.trimTrailingWhitespace": false
},
 ```

## 7. Running tasks (NPM and others)

Most projects requires some tasks to be run like linting, building, packaging, testing, and deploying. Depending on the project type, you may use different tools to do this such as NPM, Grunt, Gulp, Make, and so on.

### 7.13. Extensions

- [NPM](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) (2.7M downloads): "This extension supports running npm scripts defined in the package.json file and validating the installed modules against the dependencies defined in the package.json."
- [Gulp Tasks](https://marketplace.visualstudio.com/items?itemName=nickdodd79.gulptasks) (39K downloads): "A gulp task visualization and execution extension for Visual Studio Code."
- [Make](https://marketplace.visualstudio.com/items?itemName=technosophos.vscode-make) (31K downloads): "Run Make easily."

### 7.14. Feature

Maybe, you prefer to do it all from the command-line, then you probably haven't reached for an extension anyway!

There is another way to run tasks in VS Code, it has a *Tasks* feature. Tasks can be configured to run whatever scripts and commands you want inside VS Code, and you don't need to jump into the terminal or write new code.

**I will show you briefly how you can run NPM tasks**. VS Code auto-detects NPM tasks from your `package.json`.

If you open the *Go to file* bar (found in the main menu through "Go > Go to File .." or with the command `Ctrl + P` on Windows), you can type "task", hit `space`, and a dropdown will give you the options for running tasks as below. Pick "npm".

![tasks](/assets/img/blog/2020-08-05-dont-need-extensions/tasks.jpg)

Pick your npm script and that's it!

![npm tasks](/assets/img/blog/2020-08-05-dont-need-extensions/npm-tasks.jpg)

You can read the [user guide on Tasks](https://code.visualstudio.com/docs/editor/tasks#vscode) to learn more.

## 8. Conclusion

Before you reach for an extension, see if VS Code can do it already. It sounds like an obvious move, but we are all probably guilty of doing it this some time. VS Code is adding features regularly, so it is worth checking the changelog every so often.

Recently, I wrote an extension called [Marky Markdown](https://marketplace.visualstudio.com/items?itemName=robole.marky-markdown), if you want some cool markdown features which are not found in VS Code 😉, check it out! 😊
