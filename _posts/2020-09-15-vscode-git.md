---
layout: post
title: "How to use VS Code as your Git editor, difftool, and mergetool"
description: "Use VS Code as your Git editor, difftool, and mergetool."
category: vscode
image: /assets/img/blog/2020-09-15-vscode-git/banner.jpg
tags: [vscode, git]
published: true
---
<img src="/assets/img/blog/2020-09-15-vscode-git/banner.jpg" alt="banner" style="display:block;max-width:1200px;width:100%;"/>
<small>Banner Photo by [Valentin Antonucci](https://unsplash.com/photos/9cRDDvhpBRw).</small>

Do you use *VS Code* as your default Git Editor, or as your Git Diff Tool? Should you?

Let's look at the potential benefits of using *VS Code* as a fully-fledged Git partner, and how you can do it.

<!-- TOC -->
- [TLDR](#tldr)
- [Why should you make *VS Code* your default Git Editor, Diff Tool, or Merge Tool?](#why-should-you-make-vs-code-your-default-git-editor-diff-tool-or-merge-tool)
- [Prerequisite](#prerequisite)
- [Make VS Code your default Editor](#make-vs-code-your-default-editor)
- [Make VS Code your default Diff Tool](#make-vs-code-your-default-diff-tool)
- [Make VS Code your default Merge Tool](#make-vs-code-your-default-merge-tool)
- [Conclusion](#conclusion)
<!-- /TOC -->

## TLDR

To make *VS Code* your default for everything git-related, first you need to ensure you can run *VS Code* from the command-line as outlined in the [Prerequisite](#prerequisite) section.

Then, run the command `git config --global -e` to edit the global config, and add the following:

```
[core]
  editor = code --wait
[diff]
  tool = vscode
[difftool "vscode"]
  cmd = code --wait --diff $LOCAL $REMOTE
[merge]
  tool = vscode
[mergetool "vscode"]
  cmd = code --wait $MERGED
```

If you want to see how an edit, diff, or merge looks in *VS Code*, jump to the corresponding section to see screenshots.

## Why should you make *VS Code* your default Git Editor, Diff Tool, or Merge Tool?

It's a personal choice! There are *so* many options out there. Above all else, your tools should complement your workflow and not impede you.

I'll explain my decision and maybe it will give your some insight in to understanding what works best for you. In a sentence, I prefer to do as much as I can in my code editor.

Here are the situations where I have encountered friction or have an alternate preference:
1. If I am executing an interactive git command that requires input from me to edit and review a chunk of text, I would prefer to stay in my code editor and stay in the same mental mode.
1. I haven't used some of the Linux command-line tools associated with Git such as *Nano* enough to get the necessary muscle memory,  I forget the commands!🙈 It can be a flow-buster.
1. I prefer less switching between applications generally. I would prefer to switch to another tab of my code editor rather than a separate window.
1. For diffing, I prefer viewing it in a GUI-based editor.
1. Some merge conflicts are demanding, I like to jump to source files to get the complete picture, I can use familiar shortcuts if I can do it in *VS Code*.
1. If I can do it all in my code editor, I have a consistent colour theme without further configuration.

## Prerequisite

You need to ensure you can run *VS Code* from the command-line before you can make it a default Editor, Diff Tool, or Merge Tool. It is possible that this wasn't done as part of your installation.

To test this, run the command `code --help` from the command line. If you did not see some help output, it means you currently can't run *VS Code* from the command-line. 

You  can follow these steps to rectify that:

- Windows: You need to edit the Environment Variables, and add the location of your *VS Code* installation to the *PATH* variable. Or you could re-install and ensure that the it happens through the wizard (there is an option).
- macOS: Select `Shell Command: Install 'Code' command in path` from the Command Palette.
- Linux: Make sure you installed *VS Code* via a *.deb* or *.rpm* package.

## Make VS Code your default Editor

The default Git Editor is [*Nano*](https://www.nano-editor.org/).

This is how *Nano* looks for a commit message.

<img src="/assets/img/blog/2020-09-15-vscode-git/nano-commit.png" alt="nano merge amend" style="display:block;max-width:1068px;width:100%;">

This is how *VS Code* looks for a commit message.

<img src="/assets/img/blog/2020-09-15-vscode-git/vscode-commit.png" alt="vs code commit" style="display:block;max-width:925px;width:100%;">

### Configuration

To update your git configuration, run the following command:

```bash
git config --global core.editor "code --wait"
```

If you prefer that a new window opens each time, add the `--new-window` code flag:

```bash
git config --global core.editor "code --wait --new-window"
```

If you only want to change it for your current project, run the same command without the *--global* git flag.

Unhappy and want to go back?


```bash
git config --global --unset core.editor
```

## Make VS Code your default Diff Tool

The default Diff Tool is [*vimdiff*](https://www.tutorialspoint.com/vim/vim_diff.htm).

Specifying a Diff Tool affects the `git difftool` command. The command `git diff` still performs diffing on the command-line. The `difftool` command starts an interactive dialogue with a queue of the affected files, asking you choose which files you wish open to open.

This is how *vimdiff* looks for a diff. Pass the 🕶!

<img src="/assets/img/blog/2020-09-15-vscode-git/vmdiff-diff.png"  alt="vimdiff diff" style="display:block;max-width:1230px;width:100%;">

This is how *VS Code* looks for a diff.

<img src="/assets/img/blog/2020-09-15-vscode-git/vscode-diff.jpg"  alt="vscode diff" style="display:block;max-width:1234px;width:100%;">

You will notice in the command-line in the screenshot above that my diff session shows 13 files that have changes. If the file list is long, you can cancel the process at whenever point you want the typical way (`Ctrl` + `C` on Windows). You will probably need to narrow down the scope of your command to make the set more manageable.

### Configuration

To configure it from the command-line:

```bash
git config --global diff.tool vscode
git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"
```

You can add the following to your global Git config if you prefer:

```
[diff]
	tool = vscode
[difftool "vscode"]
	cmd = code --wait --diff $LOCAL $REMOTE
```

If you're not feeling *VS Code* as your Diff Tool, you run the command `git difftool --tool-help` to see more options.

## Make VS Code your default Merge Tool

There is no default merge tool set.

When there is a conflict, you will get error messages when you try to *pull* or *push* changes. Run `git mergetool`.

<img src="/assets/img/blog/2020-09-15-vscode-git/cmd-mergeconflict.png" alt="commandline merge conflict" style="display:block;max-width:723px;width:100%;">

Running *vimdiff* then looks like this:

<img src="/assets/img/blog/2020-09-15-vscode-git/merge-vmdiff.png" alt="vimdiff merge conflict" style="display:block;max-width:1159px;width:100%;">

This is what a merge conflict looks like in *VS Code*:

<img src="/assets/img/blog/2020-09-15-vscode-git/vscode-merge.png" alt="vscode merge conflict" style="display:block;max-width:978px;width:100%;">

A CodeLens gives you options for resolving the conflict. If there is more than 1 conflict, a tool bar appears in the top right corner above the document giving you options to cycle through each conflict.

### Configuration

To do it from the command-line:

```bash
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait $MERGED"
```

You can add the following to your global Git config if you prefer:

```
[merge]
	tool = vscode
[mergetool "vscode"]
	cmd = code --wait $MERGED
```

If you're not feeling *VS Code* as your Merge Tool, you run the command `git mergetool --tool-help` to see more options.

## Conclusion

It's simple to setup VS Code to manage all your git needs. It's just a matter of preference if you want to use VS Code or stick with the command-line tools.

Happy coding! 🙂
