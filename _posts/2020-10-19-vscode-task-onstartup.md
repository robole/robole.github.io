---
layout: post
title: "How to Run a Command Automatically in VS Code When You Open a Project"
description: "It would be great to have webpack launch when I open a JavaScript project, so I don't forget to! VS Code has *tasks* built-in for this very thing. Here is how you can configure it yourself."
category: vscode
image: /assets/img/blog/2020-10-19-vscode-task-onstartup/banner.jpg
tags: [vscode]
published: true
---
<figure>
<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/banner.jpg" alt="select a task to configure" style="display:block;width:100%;max-width:800px;margin:0 auto;">
<figcaption style="text-align:center">Photo by <a href="https://unsplash.com/@relentlessjpg?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">William Moreland</a>.</figcaption>
</figure>

Sometimes, I trip myself up by forgetting to run webpack when I open a JavaScript project. Usually it's when I'm groggy in the morning and I get to a point where I expect some output to have changed, and nothing is happening. It takes me a minute to orientate myself and have that *doh!* moment, and realise that I haven't spun up webpack yet. 🤦‍♂️

So, to spare myself this ignominy again, it would be great to have webpack launch when I open a JavaScript project that uses webpack. 

VS Code has *tasks* built-in for this very thing. You can check out the [Tasks User Guide](https://code.visualstudio.com/docs/editor/tasks) for the full skinny. I will just show you to tackle my use case.

I want to execute one of my npm scripts from my `package.json`. From the command-line, I run `npm run webpack`. You can run whatever command you wish as a task.

```json
 {
   // ...other stuff
     
   "scripts": {
    "webpack": "webpack --mode development --watch",
   }
 }
```

## TLDR

Add the following task to the workspace *tasks.json*.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run npm webpack on startup",
      "type": "shell",
      "command": "npm run webpack",
      "windows": {
        "command": "npm run webpack"
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "runOptions": { "runOn": "folderOpen" }
    }
  ]
}
```

Enable automatic tasks yourself by running the command **Tasks: Allow Automatic Tasks in Folder**.

## How to create a task file

The tasks specific to your project are stored in `<project folder>/.vscode/tasks.json`. You can create the file yourself, or you can run the **Tasks: Configure Task** command to build a template file for you. 

The command asks you a couple of questions before creating the file.

1. Select a task to configure: You can skip this and hit `Enter`.
<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/tasks-option1.png" alt="select a task to configure" style="display:block;width:100%;max-width:258px;">
1. Select a task template: Select the "Others" option.
<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/tasks-option2.png" alt="select a task template" style="display:block;width:100%;max-width:332px;">

This is the skeleton *tasks.json* that you get.

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "echo",
			"type": "shell",
			"command": "echo Hello"
		}
	]
}
```

## How to create a task

So, we want to add a new task object like "echo" above. There is Intellisense support to assist you, so you can press `Ctrl+Space` to get a list of the properties.

<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/task-intellisense.png" alt="intellisense in tasks.json" style="display:block;width:100%;max-width:715px">

Here is a list of the most important task properties:

- **label**: The label used in the user interface.
- **type**: For a custom task, this can either be `shell` or `process`. If `shell` is specified, the command is interpreted as a shell command e.g. *bash*, *cmd*. If `process` is specified, the command is interpreted as a process to execute. We want to select `shell`.
- **command**: The actual command to execute. We want to execute `npm run webpack`.
- **windows**: Windows specific properties. This will be used instead of the default properties when the command is executed on the Windows operating system. This also has a `command` property, I don't know if it is necessary to specify your command in here again if you are Windows user. I guess it depends on your particular command. I added it anyway.
- **presentation**: This defines how the task output is handled in the terminal. It offers the following properties:
  - **reveal**: Controls whether the Integrated Terminal panel is brought to front. Valid values are:
    - `always` - The panel is always brought to front. This is the default. I prefer to see the command running on startup, so this option is what I want!
    - `never` - The user must explicitly bring the terminal panel to the front themselves.
    - `silent` - The terminal panel is brought to front only if the output is not scanned for errors and warnings.
   - **panel**: Controls whether the terminal instance is shared between task runs. Valid values are:
      - `shared`: The terminal is shared and the output of other task runs are added to the same terminal.
      - `dedicated`: The terminal is dedicated to a specific task. If that task is executed again, the terminal is reused. However, the  output of a different task is presented in a different terminal.
      - `new`: Every execution of that task is using a new clean terminal. A clean panel is preferable. Check this!
- **runOptions**: Defines when and how a task is run.  It has the property:
  - **runOn**: Specifies when a task is run. Valid values are:
    - `default`: The task will only be run when executed through the **Run Task** command.
    - `folderOpen`: The task will be run when the containing folder is opened.  **This is what we want!**

This is what did the trick for me:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run npm webpack on startup",
      "type": "shell",
      "command": "npm run webpack",
      "windows": {
        "command": "npm run webpack"
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "runOptions": { "runOn": "folderOpen" }
    }
  ]
}
```

The first time you open a project that contains a task that runs on "folderOpen", you *should* get a prompt asking if you want to allow tasks to run automatically in that folder. I didn't get this prompt!

You can enable automatic tasks yourself by running the command **Tasks: Allow Automatic Tasks in Folder**.

<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/tasks-automatic.png" alt="automatic tasks command" style="display:block;width:100%;max-width:336px">

## The result

Next time you open your project, you will see your task running automatically like so:

<img src="/assets/img/blog/2020-10-19-vscode-task-onstartup/task-running.png" alt="running task on folder open" style="display:block;width:100%;max-width:914px">

Hurrah! One less thing to think about! 😅


