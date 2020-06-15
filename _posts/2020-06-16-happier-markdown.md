---
layout: post
title:
  "Happier writing with markdown: linting, spellchecking, auto-preview, and more
  ✍🙂"
category: testing
description: "Create a smoother workflow for writing publishing markdown documents."
tags: [markdown]
image: /assets/img/blog/2020-06-16-happier-markdown/banner.png
published: false
---

<figure>
<img src="/assets/img/blog/2020-06-16-happier-markdown/banner.jpg" alt="woman biting pencil in front of computer" style="width:100%;max-width:1920px;"/>
<figcaption>Photo by JESHOOTS.COM on Unsplash</figcaption>
</figure>

I was getting some reoccurring issues when publishing my markdown documents,
let's just call them bugs for simplicity, I will discuss them in more detail
later. So, I decided to re-evaluate my set-up to create a smoother workflow.

My personal preference is to do my writing in a desktop application called
[Typora](https://typora.io/). It's similar to a word processing application, it
offers less distraction, I like using its "focus mode", it has spellchecking,
and shortcuts for formatting text.

Typora covers most of what I want, but over time, I have found some syntax
errors creep into my documents, which I don't always catch. So, some sort of
linting would be nice. And I would like some additional features such as adding
a table of contents (TOC).

Ideally, I would use one application to do everything, but realistically getting
everything I want in one application is probably only possible if I configure an
IDE to suit my preferences.

I will explain what is "bug-free" publishing for me, and what applications and
tools are available to help improve the quality of your markdown documents.

## TLDR

I configured VSCode to satisfy my need for "bug free" publishing. I continue to
use Typora for my drafts, and use VSCode for final editing and publication!

## "Bug-free" publishing

"Bug-free" publishing is ensuring that there are no unintended or undesirable
results when you transform your markdown to HTML, and push it to wherever you
like to publish. Here are some tasks you may want to include to your workflow:

1. **Syntax checking (linting)**. Ensure that your markdown is correct.
   Applications don't have this, you need to use an IDE with a linting plugin,
   or a task runner.

1. **Spellchecking**. Most applications have spellchecking by default, most IDEs
   don't.

1. **Use the same markdown syntax everywhere**. There isn't _that_ much
   difference between markdown and its related variant syntaxes, but it is good
   to be consistent between what you see in your preview, and what your target
   platform uses under the hood. I want to use _github-flavoured markdown_
   everywhere.

1. **Format on save**. You may want to use automatic formatting on your document
   to remove egregious formatting mistakes, and ensure consistency.

1. **Checking validity of images**. This is specific to my set-up. I noticed
   that the editors I used and Jekyll (my static site generator) have different
   expectations for file paths. For example, look at the folders in the picture
   below, if I want to embed the image _banner.png_ in my markdown file, most
   applications expect `../img/banner.png`, Jekyll expects `/img/banner.png`. I
   would like my editor and the static site generator to agree.

   ![folders for blogging](/assets/img/blog/2020-06-16-happier-markdown/blog-folder.jpg)

1. **Generation of a TOC and section numbering**. Cut out manual creation and
   maintenance of these.

## Tools

I will quickly list some of the options for tools you may want to use outside of
your editor, or as an integration in your editor (if possible). They can be used
as a CLI tools, in task runners, as
[a github action,](https://medium.com/@christinavhastenrath/github-actions-markdown-lint-setup-86d7f6ec934d)
or as a plugin for some IDEs.

### Linting

1. [MarkdownLint](https://github.com/DavidAnson/markdownlint): Style checker and
   linting tool. Written in JavaScript and available on npm.
2. [Textlint](https://textlint.github.io/): Offers markdown and natural language
   linting with
   [many integrations](https://textlint.github.io/docs/integrations.html).
   Written in JavaScript and available on npm.

### Spellchecking

1. [markdown-spellcheck](https://www.npmjs.com/package/markdown-spellcheck):
   Reads markdown files and spellchecks them. It uses open source Hunspell
   dictionary files. Written in JavaScript and available on npm.

## Configure VSCode for all your markdown needs

VSCode has decent "out of the box" support for Markdown. VSCode covers this in
its docs:
[VSCode and Markdown](https://code.visualstudio.com/docs/languages/markdown).

### "Out of the box" features

1. Supports the [CommonMark](http://commonmark.org) Markdown specification.
2. Live preview. You can open a live preview of your active markdown document.
3. Preview and editor scroll synchronisation. If you want to view the markdown
   and preview side-by-side, you can have them scroll in unison.
4. Outline view. It shows a symbol tree of the document's header hierarchy.
5. There is no spellchecking.

### Additional features I would like

1. Support for Github-flavoured Markdown specification.
2. Linting (code analysis)
3. Spellchecking
4. A different theme for markdown to serve as visual reminder that I am in a
   different context.
5. Automate generation of a TOC and section numbering. Cut out manual creation
   and maintenance of these.
6. Automatically open the preview when I open a markdown file.

### Extensions by category

#### All in one

It would be nice to have an extension to cover all of your needs!

[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
tries to do just that and it covers quite a lot:

- **GitHub-Flavored Markdown support**
- Keyboard shortcuts
- **Generate table of contents**
- **Generate section numbering**
- List editing
- Export to HTML
- Some MathML support
- Autocompletions

![creating a table of contents using markdown all in one plugin](/assets/img/blog/2020-06-16-happier-markdown/toc.jpg)

#### Preview

As discussed the previewer bundled with VSCode gives you a live preview and
scroll synchronisation with the editor. There are a couple of extensions that
may wish to add.

1. [Github Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview):
   Changes VS Code's built-in markdown preview to match Github markdown
   rendering in style and content. It includes other extensions to support
   emojis and task lists.
2. [Auto-Open Markdown Preview](https://marketplace.visualstudio.com/items?itemName=hnw.vscode-auto-open-markdown-preview):
   Automatically open the preview pane whenever you open a new Markdown file.
3. [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced):
   The biggest reason to use this is if you want support markdown extensions
   such as Math ML, mermaid, and PlantUML in the previewer. It also offers a lot
   of extra functionality such as pandoc integration, PDF export, and so on.

#### Linting

1. [vscode-textlint](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint):
   Integration of [textlint](https://textlint.github.io/). Offers markdown
   linting and natural language linting. textlint is similar to
   [ESLint](http://eslint.org/), but it's for use with natural language.
2. [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint):
   Integration of
   [markdownlint for Node.js](https://github.com/DavidAnson/markdownlint).
   Markdown/CommonMark linting and style checking.

Textlint requires more configuration than markdownlint, but offers more
functionality for spellchecking and "language" correction. I found it too much
for my needs, so I chose `markdownlint`.

##### Using markdownlint

There is
[a list of the rules](https://github.com/DavidAnson/markdownlint#optionsconfig),
which is pretty clear to use. I found it easiest to install it and use the
default rules, then change certain rules based on some existing documents.

The rules are key value pairs, the keys are processed in order from top to
bottom with later values overriding earlier ones. Keys (including rule names,
aliases, tags, and `default`) are not case-sensitive.

```json
"markdownlint.config": {
	"default": true,
	"MD003": { "style": "atx" },
	"MD010": { "code_blocks": false },
	"MD026": { "punctuation": ".,;:" },
	"MD033": false
}
```

Above is a snippet of my settings which does the following:

- Applies all default rules first.
- MD003: Heading styles. I want to use the style `## Heading 2`, which is called
  _atx_.
- MD010: Hard tabs. This rule is triggered by any lines that contain hard tab
  characters instead of using spaces for indentation. I wanted to exclude code
  blocks from this rule.
- MD026: Trailing punctuation in heading. I want to allow question marks and
  exclamation marks as trailing punctuation in a heading, so I provided a list
  of the punctuation I want to forbid without them in it.
- MD033: Inline HTML. I want to allow inline HTML, so I set this to false.

You can fixed all rule violations at once by running the `markdownlint.fixAll`
command, or you can chose to fix rule violations on save by configuring your
settings with:

```json
"editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
}
```

#### Formatting

As mentioned above in the linting section, you can use `markdownlint` or
`vscode-textlint` to format your document according to rules. You may use
another formatter globally already, which has support markdown, so it is worth
seeing if this is the case.

1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode):
   I use Prettier for JavaScript formatting, and it also support markdown.
   [This is the default formatting it offers](https://prettier.io/blog/2017/11/07/1.8.0.html).
   It doesn't do much formatting of markdown it seems. One nice touch is that
   formats your code blocks, it looks at the language code provided with the
   code block, and it will format it if it is a language that Prettier supports.
   There is `proseWrap` option that will wrap lines at 80 characters if you
   select "always".
2. [Tidy Markdown Formatter](https://marketplace.visualstudio.com/items?itemName=tehnix.vscode-tidymarkdown):
   Comprehensively formats your markdown. It automatically converts inline HTML
   to markdown, and converts everything to it's opinionated style. There is no
   option to configure the styles. You can only enable or disable it. So, for
   me, it is uninstalled!
3. [markdown-formatter](https://marketplace.visualstudio.com/items?itemName=mervin.markdown-formatter):
   It offers some simple formatting options. It will format your code blocks
   based on the language (for HTML, CSS, JS).

#### Spellchecking

1. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker):
   A basic spellchecker that inspects code and text, it claims to work well with
   camelCase code. It has the following features:

   - checks code and text
   - **Case-insensitive**
   - works offline
   - Support multiple languages
   - only words longer than 3 characters are checked
   - the offline dictionary has some errors and missing words

1. [SpellChecker](https://marketplace.visualstudio.com/items?itemName=swyphcosmo.spellchecker):
   Offline spellchecker which uses _hunspell_ formatted dictionaries. It has the
   following features:

   - Works offline
   - **Only U.S. English supported**

1. [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright):
   Lightweight Spellchecker. It has the following features:
   - **case sensitive**.
   - checks **plain text**/**markdown**/**LaTeX** documents,
     **comments**/**strings** parts of most **source code** (C++, C, Python,
     JavaScript, etc.) documents and **text**/**comment** nodes on
     **XML**/**HTML** class documents.
   - supports multiple languages in the same document

All of them underline spelling mistakes, and you can press <kbd>F8</kbd> to step
through errors. **For me, Spell Right is a clear winner**.

#### Theme for markdown only

You can use
[Theme by language](https://marketplace.visualstudio.com/items?itemName=jsaulou.theme-by-language)
extension to set a specific theme for markdown.

#### Export to HTML and other formats

This is not something I wanted, but you can check out this article that discuses
using _pandoc_ for that purpose:
[Build an Amazing Markdown Editor Using Visual Studio Code and Pandoc](https://thisdavej.com/build-an-amazing-markdown-editor-using-visual-studio-code-and-pandoc/).

### My configuration

I settled on using the following extensions:

1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
   for: GitHub-Flavored Markdown support, creation of a table of contents,
   section numbering, keyboard shortcuts, and autocompletions.
2. [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
   for linting and some formatting. I choose when to fix violations myself.
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   for formatting on save. This will format code blocks and line-wrap text after
   80 characters. The main reason for using it is that it supports a range of
   languages for code blocks.
4. [Auto-Open Markdown Preview](https://marketplace.visualstudio.com/items?itemName=hnw.vscode-auto-open-markdown-preview)
   to automatically open a preview.
5. [Theme by language](https://marketplace.visualstudio.com/items?itemName=jsaulou.theme-by-language)
   to set a specific theme for markdown only.
6. [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)
   for spellchecking.

#### My User Settings

```json
{
  "[markdown]": {
    "breadcrumbs.showClasses": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "markdownlint.config": {
    "default": true,
    "MD003": {
      "style": "atx"
    },
    "MD010": {
      "code_blocks": false
    },
    "MD026": {
      "punctuation": ".,;:"
    },
    "MD033": false
  },
  "theme-by-language.themes": {
    "markdown": "Markdown Editor",
    "*": "Monokai"
  }
}
```

## Final Words

If I had seen this article before I started writing a lot more in markdown, I
would have considered this excessive! In word processors like Microsoft Word and
OpenOffice Writer, you take for granted a lot of the features that help you
craft well-written and well-formatted prose. Applications for markdown don't
have that same rich feature set, and you have the additional concern of
following a syntax. It might be a worthwhile investment of your time to consider
adding some of what I discussed to your workflow if you write in markdown
regularly.

Happy writing! 🙌✍
