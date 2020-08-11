# Week 0 Part 1

## Learn Git and GitHub

* [Try Git](https://try.github.io)
* [GitHub Guides](https://guides.github.com)

## Prepare Project

From now on, we're going to start the project **stylish**.

1. Fork this repository in AppWorks School account to your GitHub account.
2. You will get a **forked repository** in your GitHub account.
3. We call this repository in AppWorks School **upstream repository**.
4. Clone your **forked repository** from GitHub to your local machine.
5. Create a **develop branch** named `gh-pages` from `master` branch in your local machine.
6. Change your current branch from `master` to `gh-pages` in your local machine.

## Assignment

Every time before you start a new assignment, please create a new **feature branch** from the `gh-pages` branch with the following rules and complete the assignment on that branch.

```
Feature branch naming rules:

  week-(week number)-part-(part number)

Ex: For week 1 part 3

  => week-1-part-3
```

1. You should always work in `students/[yourname]` folder.
2. Create a html file named `index.html` under the `students/[yourname]` folder.
3. Modify `index.html` file, write down simple welcome messages in this page.
4. Make your first commit for the changes with git.
5. Merge **feature branch** into `gh-pages` branch for publishing.
6. Push **feature branch** and `gh-pages` branch to `your forked repository`.

## How to Hand-In?

Go to your **forked repository** in GitHub website. Find the **feature branch** on your **forked repository** and make a **pull request** from this branch to `[yourname]-pages` branch of the **upstream repository**. (Please never make a pull request to the master branch of the **upstream repository**)

## About Pull Request

* Always include **your online URL** and **short description of what you have done** in the message of pull request
* You should check your email for tracking the status of pull request.

## Fix Issues

* If your pull request is not accepted, it means that the assignment have issues should be fix. I will mention the issues in the comment.
* Fix issues, merge into gh-pages branch, push new commits to your repository again. The pull request will automatically update itself, so you don't have to create another pull request for the same assignment.
