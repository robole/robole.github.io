---
layout: post
title: "VS Code: Let's Git it on!"
description: "Use VS Code as your Git editor"
category: vscode
image: /assets/img/blog/2020-08-14-vscode-git/banner.jpg
tags: [vscode, git]
published: false
---
<img src="/assets/img/blog/2020-08-14-vscode-git/banner.png" alt="banner" style="display:block;max-width:1200px;width:100%;"/>

Do you use *VS Code* as your default Git Editor, or as your Git Diff Tool! Should you?

Let's look at the potential benefits of using *VS Code* as as a fully-fledged Git partner, and how you can do it.

<!-- TOC -->
**Table of Contents**
- [TLDR](#tldr)
- [Why should you make *VS Code* your default Git Editor, Diff Tool, or Merge Tool?](#why-should-you-make-vs-code-your-default-git-editor-diff-tool-or-merge-tool)
- [Prerequisite](#prerequisite)
- [Make VS Code your default Editor](#make-vs-code-your-default-editor)
- [Make VS Code your default Diff Tool](#make-vs-code-your-default-diff-tool)
- [Make VS Code your default Merge Tool](#make-vs-code-your-default-merge-tool)
<!-- /TOC -->

## TLDR

To make *VS Code* your default for everything git-related, first you need to ensure you can run *VS Code* from the command-line as outlined in the [Prerequisite](#prerequisite) section.

Then, run the command `git config --global --e` to edit the global config, and add the following:

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

If you want to see how a Git edit, diff, or merge looks in *VS Code*, jump to the corresponding section to see screenshots.

## Why should you make *VS Code* your default Git Editor, Diff Tool, or Merge Tool?

It's a personal choice! There are *so* many options out there. Above all else, your tools should complement your workflow and not impede you.

I'll explain my decision and maybe it will give your some insight in to understanding what works best for you. In a sentence, I prefer to do as much as I can in my code editor.

Here are the situations where I have encountered friction or have an alternate preference:
1. If I am executing an interactive git command that requires input from me to edit and review a chunk of text, I would prefer to stay in my code editor to stay in the same mode.
1. I haven't used some of the linux command-line apps such as *Nano* enough to get the necessary muscle memory,  I forget commands quickly!🙈 It's a flow-buster.
1. I prefer less switching between applications generally. If I can choose switch to another tab of my code editor rather than a separate window, it is preferable.
1. For diffing, I prefer doing it in a GUI.
1. Some merge conflicts are demanding, I like to jump to source files to get the complete picture, I can use familiar shortcuts if I can do it in *VS Code*.
1. If I can do it all in my code editor, I have a consistent colour theme for everything I'm doing.

## Prerequisite

You need to ensure you can run *VS Code* from the command-line before you can make it a default Editor, Diff Tool, or Merge Tool. It is possible that your this wasn't done as part of your installation.

Run the command `code --help` from the command line. If you did not see some *help* output, it means you currently can't run *VS Code* from the command-line, follow these steps to rectify that:
- Windows: You need to edit the Environment Variables, and add the location of your *VS Code* installation to the *PATH* variable. Or you could re-install and ensure it happens through the wizard.
- macOS: Select `Shell Command: Install 'Code' command in path` from the Command Palette.
- Linux: Make sure you installed *VS Code* via a *.deb* or *.rpm* package.

## Make VS Code your default Editor

The default Git Editor is [*Nano*](https://www.nano-editor.org/).

This is how *Nano* looks for a commit message.

![nano merge amend](/assets/img/blog/2020-08-14-vscode-git/nano-commit.png)

This is how *VS Code* looks for a commit message.

![vs code merge amend](/assets/img/blog/2020-08-14-vscode-git/vscode-commit.png)

### Configuration

To update your git configuration, run the following command:

```bash
git config --global core.editor "code --wait"
```

If you prefer that a new window opens each time, add the `--new-window` code flag:

```bash
git config --global core.editor "code --wait --new-window"
```

If you only want to change it for your current project only, run the same command without the *--global* git flag.

Unhappy and want to go back?


```bash
git config --global --unset core.editor
```

## Make VS Code your default Diff Tool

The default Diff Tool is [*vimdiff*](https://www.tutorialspoint.com/vim/vim_diff.htm).

Specifying a Diff Tool affects the `git difftool` command. The command `git diff` still performs diffing on the command-line. The `difftool` command starts an interactive dialogue with a queue of the affected files, asking you choose which files you wish open to open.

This is how *vimdiff* looks for a diff. Ahh me eyes 😑, 🕶 please!

![vimdiff difftool](/assets/img/blog/2020-08-14-vscode-git/vmdiff-diff.png)

This is how *VS Code* looks for a diff.

![git difftool](/assets/img/blog/2020-08-14-vscode-git/vscode-diff.jpg)

You will notice that my diff session shows 13 files that have changes. If the file list is long, you can cancel the process at whenever point you want the typical way (`Ctrl` + `C` on Windows). You will probably need to narrow down the scope of your command to make the diff set more manageable.

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

The default Merge Tool is ??.

This is what a merge conflict looks like in *VS Code*:

![git merge](/assets/img/blog/2020-08-14-vscode-git/vscode-merge.png)

There are extra controls above the editor tab to perform various actions such as navigating through conflicts.

For resolving conflicts, a CodeLens shows you the options:

![git merge conflict resolution](/assets/img/blog/2020-08-14-vscode-git/vscode-merge-resolution.png)

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
