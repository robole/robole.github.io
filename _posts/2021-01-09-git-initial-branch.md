---
layout: post
title: "Get Git and Github/GitLab in sync on default branch naming (master | main)"
description: "Last July, GitHub and other Git hosting platforms changed the default initial branch name to `main` (from `master`). However, Git did not! How can we fix this?"
image: /assets/img/blog/2021-01-09-git-initial-branch/cover.jpg
tags: [git]
published: true
---
<img src="/assets/img/blog/2021-01-09-git-initial-branch/cover.jpg" alt="blank picture" style="display:block;width:100%;max-width:1000px;margin:0 auto;">

Last July, some of the git hosting platforms (GitHub, GitLab, and Bitbucket) changed the default branch name to `main` (from `master`). However, Git did not! 🤦

It's disappointing that everyone didn't act in unison to make the same change, because it has created some work for users. The focus of this post is on how this impacts maintenance of public repositories, and nothing else.  I hate meddling with configuration, so that is where my disappointment lies!

I managed to avoid this altogether until now. It was only creating a new repo on GitHub this week that it surfaced again. So, it's time to set things up to avoid this in future.

## How can I fix this for new repos?

You can change the default name in Git, or change the default name on your git hosting provider.

It's probably easier to do it in Git, especially if you use more than one provider.

### Change default branch name in Git

[Git 2.28](https://lore.kernel.org/git/xmqq5za8hpir.fsf@gitster.c.googlers.com/) (released in July 2020) introduced `init.defaultBranch` configratuion option.  Check you have the 2.28 or later installed to avail of this.

```bash
git --version
```

If you don't, [download and install the latest](https://git-scm.com/download/).

Now, you can update the default branch name.

```bash
 git config --global init.defaultBranch main
 ```

### Change default branch name in GitHub/GitLab

- See [GitHub Docs - Managing the default branch name for your repositories](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/managing-the-default-branch-name-for-your-repositories).
- See [GitLab Docs - Custom initial branch name](https://docs.gitlab.com/ee/user/project/repository/branches/#custom-initial-branch-name).

## And what about existing repos?

For existing repos, you can still push and pull without needing to rename the default branch. So, option 1 is to do nothing!

Option 2 is to rename. You need to consider what other people are doing before you go ahead, it will annoy people if they have existing PRs and you don't let them know!

### Shortest way (?)

The shortest set of steps is probably:

1. Disable **Default Branch and Protected Branches** settings if applicable.
1. Go to the master branch.
1. Fetch latest (if in doubt).
1. Rename the branch to `main`. This preserves history.
1. Push changes and update upstream remote link (`git push -u origin main`).
	```bash
	git checkout master
	git fetch
	git branch -m master main
	git push -u origin main
	```
1. Go to the Settings on GitHub (Settings > Branches > Default Branch)or GitLab (Settings > Repository > Default Branch) and change the default branch to `main`.
1. Delete remote `master` branch.
	```bash
	git push origin --delete master
	```

## Don't forget to update related CI/CD configurations

If you do change exisiting repos, do not forget your build chain. You will need to update their configuration to be in step with your repo. If they depend on an "origin/master" branch, they will complain eventually, to someone!

### Netlify

If you deploy to Netlify using a git repo, you'll need to tell Netlify you've updated the default branch (what they call the production branch).

1. Log in and find the site
1. Go to Deploys
1. Click Deploy Settings
1. Under Deploy contexts click Edit settings
1. Change the name of the production branch and click Save

Note: There may still be a "branch deploy" for master after you click save. You can remove this by just editing the settings one more time and removing master from the "Let me add individual branches" section.

### GitHub Actions & GitLab CI/CD

A simple find-and-replace of "master" in your configuration files  should be sufficient.

## Conclusion

I chose to update my Git configuration. Going forward, I will use the  default of `main` for new projects. I will leave my existing projects as they are.
