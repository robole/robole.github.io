---
layout: post
title: "Customise VS Code for a project, or per language"
description: "VS Code is very customisable, it can cater for most of your whims and peccadillos. You may want to do something differently for a specific project or when working with a particular language. So, how can you dress VS Code up for the right occasion?"
category: vscode
image: /assets/img/blog/2020-09-17-vscode-settings/banner.jpg
tags: [vscode]
published: true
---
<img src="/assets/img/blog/2020-09-17-vscode-settings/banner.jpg" alt="banner" style="display:block;max-width:1200px;width:100%;"/>
<small>Banner Photo by <a href="https://unsplash.com/@dimhou?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Dimitri Houtteman</a> on <a href="https://unsplash.com/s/photos/formal?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></small>

VS Code is very customisable, it can cater to (most of) your whims and peccadillos!

You may want to do something differently for a specific project, or when you are working with a particular language. So, how can you dress VS Code up for the right occasion? 😎

## Settings Scope

VS Code provides two different scopes for settings:

- **User Settings**: Apply to any instance of VS Code you open.
- **Workspace Settings**: Apply to the current project only. They are stored in `<<workspace>>/.vscode/settings.json`. These settings can be useful to share with a team to help synchronise efforts, you add them to the project git repo!

Workspace settings override user settings.

> A VS Code "workspace" is usually just your project root folder. You can also have more than one root folder in a VS Code workspace through a feature called [Multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces).

## Editing Settings

You can open the Settings UI with the keyboard shortcut (`Ctrl+,`), or by running the `Preferences: Open Settings (UI)` command.

<img src="/assets/img/blog/2020-09-17-vscode-settings/settings-ui.png" alt="settings ui" style="display:block;max-width:976px;width:100%;"/>

There is a tab for *User* and *Workspace* settings. As soon as you add a workspace setting, it will create the workspace `settings.json` file for you.

To open the user settings file directly, you can run `Preferences: Open Settings (JSON)` command. It has intellisense for autocompletion, you can look at [this settings list](https://code.visualstudio.com/docs/getstarted/settings#_default-settings) to get more familiar with the options.

You can check out the [User and Workspace Settings User Guide](https://code.visualstudio.com/docs/getstarted/settings) to dig deeper.

## Language-specific Settings

To create some language-specific settings, you need to add a language entry to the user or workspace `settings.json`. In a language entry, you specify an array of [language IDs](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers) as a property, and supply it with an object with the settings as key-value pairs.

```json
{
	"editor.tabSize": 2,
	"[python]":{
		"editor.tabSize": 4,
	}
}
```

In the example above, the setting for all languages is to have a *tabsize* of 2, but python has a *tabsize* of 4.

You can change any setting you want on a per language basis. However, some built-in features have a setting that targets specific languages. One such example is Emmet.

By default, Emmet is enabled for html, haml, pug, slim, jsx, xml, xsl, css, scss, sass, less and stylus files. If you want to enable it for more languages, you need to set the following:

```json
"emmet.includeLanguages": {
  "vue-html": "html",
  "javascript":"javascriptreact"
}
```

This enables Emmet for Vue and React.

There is a [bug](https://github.com/microsoft/vscode/issues/104259) for including Emmet support for markdown. The workaround is ensure that the excluded language list is empty, as per snippet below. 

```json
"emmet.excludeLanguages": [],
"emmet.includeLanguages": {
  "markdown": "html"
}
```

Extensions also may have some language-specific settings, which you may or may not want to use.

For example, you may want to use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as your Formatter for all languages, except markdown. Prettier does not do a great job with markdown, so you may want to consider it! 😅

You can choose another Formatter for markdown instead.

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[markdown]": {
    "editor.defaultFormatter": "robole.marky-formatter"
  }
}
```

Or you can disable prettier for markdown. This disables formatting for markdown altogether.

```json
  "prettier.disableLanguages": ["markdown"],
```

## Tasks

You can also configure tasks on a per project basis. A `tasks.json` will be added to the .*vscode* folder when you configure a new task.

VS Code auto-detects tasks for the following apps: Gulp, Grunt, Jake, and npm. However, you may want to create a custom VS Code task for a project that you want others to use, it could be for something like setting up the environment correctly, or running tests.

You can check out the [Tasks User Guide](https://code.visualstudio.com/docs/editor/tasks) to learn more.
