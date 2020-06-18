---
layout: post
title:
  "Happier writing with markdown: linting, spellchecking, auto-preview, and more
  ✍🙂"
category: testing
description: "Improve your workflow for writing and publishing markdown documents."
tags: [markdown]
image: /assets/img/blog/2020-06-16-happier-markdown/banner.jpg
published: true
---

<figure>
<img src="/assets/img/blog/2020-06-16-happier-markdown/banner.jpg" alt="woman biting pencil in front of computer" style="width:100%;max-width:1920px;"/>
<figcaption>Photo by JESHOOTS.COM on Unsplash</figcaption>
</figure>
<br>

I was getting some reoccurring issues when publishing my markdown documents, let's just call them bugs for simplicity, I will discuss them in more detail later. So, I decided to re-evaluate my workflow.

My personal preference is to do my writing in a desktop application called [Typora](https://typora.io). It's similar to a word processing application, it offers less distraction, I like using its "focus mode", it has spellchecking, and shortcuts for formatting text. I use Jekyll for my blog. I do a quick review locally in the browser, before I push it to Github, which takes care of publishing.

Typora covers most of what I want, but over time, I have found some syntax errors creep into my documents, which I didn't always catch. So, some sort of linting would be nice. And I would like some additional features such as adding a table of contents (TOC), anything that is a bit tedious to write manually, and can be error-prone.

Ideally, I would use one application to do everything, but realistically getting everything I want in one application is probably only possible if I configure an IDE to suit my preferences.

I will explain what is "bug-free" publishing for me, and what tools are available to help improve the quality of your markdown documents.

## TLDR

I configured VSCode to get closer to my "bug free" publishing ideal. I continue to use Typora for my drafts, and use VSCode for final editing and publication!

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
   platform uses under the hood. I want to use _Github-flavoured markdown_
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

1. [MarkdownLint](https://github.com/DavidAnson/markdownlint): Style checker and linting tool available in a few languages and as different integrations.
2. [Textlint](https://textlint.github.io/): Offers markdown and natural language
   linting with
   [many integrations](https://textlint.github.io/docs/integrations.html).

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

### My configuration

I settled on using the following extensions:

1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) for: GitHub-Flavored Markdown support, creation of a table of contents, section numbering, keyboard shortcuts, and autocompletions.
2. [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) for linting and some formatting. I like to choose when to fix violations myself.
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   for formatting on save. This will format code blocks based on the language, if it is supported. And not much else!
4. [Theme by language](https://marketplace.visualstudio.com/items?itemName=jsaulou.theme-by-language)
   to set a specific theme for markdown only.
5. [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)
   for spellchecking.

<img src="/assets/img/blog/2020-06-16-happier-markdown/vscode.jpg" alt="vscode markdown editing" style="width:100%;max-width:1294px;"/>

In the Problems tab: spelling problems are listed as errors, and linting problems are listed as warnings.

#### My User Settings (settings.json)

```json
{

   ...

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

In word processors like Microsoft Word and OpenOffice Writer, you take for granted a lot of the features that help you craft well-written and well-formatted prose. Applications for markdown don't have that same rich feature set, and you have the additional concern of adhering to a syntax.

I found it a worthwhile investment to tweak my workflow to keep my writing experience pleasant, while improving the quality of my output. I am still making adjustments here and there.

Happy writing! 🙌✍
