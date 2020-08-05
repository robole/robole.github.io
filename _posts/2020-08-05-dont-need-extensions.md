---
layout: post
title: "VS Code: You don't need that extension because.."
description: "I was digging deeper in VS Code recently and made some interesting discoveries. There are quite a few features and settings that ably do the work of many popular extensions."
category: vscode
image: /assets/img/blog/2020-08-05-dont-need-extensions/banner.png
tags: [vscode]
published: true
---
# VS Code: You don't need that extension because..

<img src="/assets/img/blog/2020-08-05-dont-need-extensions/banner.png" style="width:100%;max-width:1600px;"/>

I was digging deeper in VS Code recently and made some interesting discoveries. There are quite a few features and settings that ably do the work of many popular extensions.

## 1. Auto renaming tags

Rename HTML and XML tag pairs with a single edit.

![rename tag pairs](/assets/img/blog/2020-08-05-dont-need-extensions/rename.gif)

### Extension

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (3.3M downloads): "Automatically rename paired HTML/XML tag, same as Visual Studio IDE does."

### Setting

The naming is a bit vague and obscure, this is probably why many people never find this!

- `Editor: Rename on Type`: "Controls whether the editor auto renames on type." Default is `false`.

#### settings.json

```json
  "editor.renameOnType": true
```

## 2. Synchronizing Settings

VS Code now supports synchronizing VS Code settings across different machines, this feature is available for preview in [VS Code Insiders](https://code.visualstudio.com/insiders/) right now. It should reach the standard version very soon.

I am trying it out at the moment, and so far, so good.

### Extensions

- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) (1.8M downloads): Syncs your settings, keybindings, snippets, extensions, and launch files to a GitHub Gist.

### Feature and Settings

You read all about this feature in the [User Guide](https://code.visualstudio.com/docs/editor/settings-sync). Below is what the Settings look like.

![sync settings](/assets/img/blog/2020-08-05-dont-need-extensions/sync.jpg)

You synchronise using a Microsoft or GitHub account.

![sync initialisation options](/assets/img/blog/2020-08-05-dont-need-extensions/sync-options.jpg)

## 3. Auto import modules

Automatically import JavaScript and TypeScript modules based on your code.

### Extensions

- [Auto import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) (1.1M downloads): Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX.
- [Move TS - Move TypeScript files and update relative imports](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts) (308K downloads): Supports moving typescript files and updating relative imports within the workspace.
- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import) (157K downloads)

### Settings

- `JavaScript > Suggest: Auto Imports` : Enable/disable auto import suggestions. Requires using Typescript 2.6.1 or newer in workspace. Default value is `true`.
- `TypeScript > Suggest: Auto Imports`: Enable/disable auto import suggestions. Requires using Typescript 2.6.1 or newer in workspace. Default value is `true`.
- `JavaScript > Update Imports on File Move: Enabled`: Enable/disable automatic updating of import paths when you rename or move a file in VS Code. Require using TypeScript 2.9 or newer in the workspace. Default value is `"prompt"`.
- `TypeScript > Update Imports on File Move: Enabled`: Enable/disable automatic updating of import paths when you rename or move a file in VS Code. Require using TypeScript 2.9 or newer in the workspace. Default value is `"prompt"`.

#### settings.json

```json
"javascript.suggest.autoImports": true,
"typescript.suggest.autoImports": true,
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.updateImportsOnFileMove.enabled": "always",
```

## 4. Autotrimming

Remove trailing whitespace automatically.

The setting I suggest is not an exact like-for-like replacement: the extension trims whitespace while you edit; whereas the setting will perform the trimming on save.

### Extension

- [Autotrim](https://marketplace.visualstudio.com/items?itemName=NathanRidley.autotrim) (15K downloads): "Trailing whitespace often exists after editing lines of code, deleting trailing words and so forth. This extension tracks the line numbers where a cursor is active, and removes trailing tabs and spaces from those lines when they no longer have an active cursor."

### Settings

- `Files : Trim Trailing Whitespace`: "When enabled, will trim trailing whitespace when saving a file." The default value is `false`.

#### settings.json

```json
 "files.trimTrailingWhitespace": true
 ```

## 5. Fake text (Dummy text)

You may want to insert some fake text to fill out a webpage to see how your UI looks. You are probably familiar with "lorem ipsum" text generators.

### Extension

- [Lorem Ipsum](https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum) (168K Downloads)

### Feature

Emmet is built into VS Code and has a [_lorem_ abbreviation](https://docs.emmet.io/abbreviations/lorem-ipsum/). Emmet abbreviation and snippet expansions are enabled by default in html, haml, pug, slim, jsx, xml, xsl, css, scss, sass, less and stylus files.

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

You can enable Emmet for more languages if you wish, for example to include Emmet support for Vue, add the following to settings.json:

```json
"emmet.includeLanguages": {
  "vue-html": "html"
}
```

## Conclusion

VS Code is evolving all the time and adding new features on a regular basis, the release cycle is monthly, even since I start using VS Code I see the benefit from some enhancements. If I find some more of these along the way, I will update this article. If you have found anything similar, let me know! 🙂
