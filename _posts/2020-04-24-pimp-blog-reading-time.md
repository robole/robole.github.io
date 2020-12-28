---
layout: post
title: "Calculate the 'reading time' for your Blog Post ⏱🦉"
description: "Can we add anything to a standard blog that would enhance the reading experience? How about the estimated reading time?"
category: programming
image: "/assets/img/blog/2020-04-24-pimp-blog-reading-time/banner.jpg"
tags: [html, css, javascript, programming]
published: true
---

<img src="/assets/img/blog/2020-04-24-pimp-blog-reading-time/banner.jpg" alt="overhead point of view of coder at desk with 3 screens" style="width:100%;max-width:1920px;"/>

Can we add anything to a standard blog that would enhance the reading experience?

How about the estimated reading time?

## How will we calculate it?

Well, let's look at what others do first!

- _Dev.to_ counts the words in a post and divides it by 275 (words per minute). The resulting number is rounded up to give the number of minutes. [Source of information here](https://dev.to/devteam/changelog-reading-time-now-displayed-16o0).
- _Medium_ counts the words in a post and divides it by 265 (words per minute). They make an adjustment for images, whatever that means! It sounds intriguing, I wish I could see their code! I guess they round up the number too. [Source of information here](https://help.medium.com/hc/en-us/articles/214991667-Read-time).

One issue I see with these calculations is that they treat code fragments as regular text! I doubt people read code at a regular reading speed! 😲⚡

It is difficult to choose a typical reading speed, [research has been conducted on various groups of people to get typical rates](https://en.wikipedia.org/wiki/Reading#Reading_rate), what you regularly see quoted is: **100 to 200 words per minute (wpm) for learning, 200 to 400 wpm for comprehension**. On that basis, a tutorial would take longer to read than a personal account.

I will show you how to do it similar to _Dev.to_, but I will do the following differently:

- Use 250 wpm as my reading speed;
- I will show the calculation in a dropdown. I wanted to know where the magic number came from, so maybe the readers of your blog do too!

## Reading Time

You can see the <strong><span style="color:purple">reading time in purple</span> in the Pen below</strong> . Click it to show the calculation.

<p class="codepen" data-height="507" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="JjYWRMp" style="height: 507px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Calculate Reading Time (naively) for a Blog">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/JjYWRMp">
  Calculate Reading Time (naively) for a Blog</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### HTML

```html
<div class="reading-time">
  <details>
    <summary>1 min read</summary>
    <span></span>
  </details>
</div>
```

The `<details>` element is an "accordion", additional details are hidden, which the user can view or hide on demand.

The `<summary>` is always shown, this shows our reading time. The `<span>` is the additional details that are hidden by default, we add the details of our calculation here. We wrap it in a `<div>` to help with styling it.

### CSS

```css
:root {
  --purple: rgb(115, 0, 209);
}

.reading-time {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.reading-time details {
  position: absolute;
  background: white;
  z-index: 1;
}

.reading-time summary {
  color: var(--purple);
  font-weight: 600;
}
```

We set the `<div>` wrapping our content as `position:relative`, this enables us to position `<details>` absolutely in relation to it, which takes it out of the normal page flow. We do this because now when we click on the _reading time_ to show the additional details, it doesn't expand in size and push the elements below it further down. We assign it `z-index:1`, so it appears above the content below it.

### JavaScript

```javascript
const post = document.getElementById("post");
const readingTimeSummary = document.querySelector(".reading-time summary");
const readingTimeDetails = document.querySelector(".reading-time details span");
const avgWordsPerMin = 250;

setReadingTime();

function setReadingTime() {
  let count = getWordCount();
  let time = Math.ceil(count / avgWordsPerMin);

  readingTimeSummary.innerText = time + " min read";
  readingTimeDetails.innerText =
    count + " words read at " + avgWordsPerMin + " words per minute.";
}

function getWordCount() {
  return post.innerText.match(/\w+/g).length;
}
```

I will explain `getWordCount()`, the rest should be clear.

We use a [regular expression (regex)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to get all the words of the post. The `match()` function searches the text (in _post_) using the regex and returns all matches in an array.

The regex is contained between 2 forward slashes, and followed by a '_g_' to state it is a global search. A global search looks for every occurrence, if we omit it, then the search looks for the first occurrence only. The regex _w+_ looks for 1 or more words.

The array returned from `match()` has each word as an element. So, the size of the array should be equal to the number of words, we use the `length` property of the array to get this.

That's everything!

## Reading speed of code

I couldn't find any empirical information on the typical reading speed of code.

In the early days of programming, researchers looked for ways to measure programming productivity, they chose **lines of code** written as their primary metric. This has fallen out of favour now, it has become known as the [programming productivity paradox](https://dzone.com/articles/programmer-productivity).

Still, maybe lines of code would be more useful than looking at individual words for reading, programming syntax is a lot different than verbal languages. Obviously the complexity of the code, and the programming language used influence the reading time. The point is, it is not simple to conjure an universal formula, which will estimate how long it takes to understand any fragment of code.

If I were to guess I would say that reading code would probably occupy the lower end of the scale of the "learning" bracket discussed earlier, because really we are learning the logic of a program, rather than just comprehending a narrative.

I will show you the word count from the code snippets included in my blog example. You can decide for yourself if the reading times for these simple examples are realistic.

### HTML Snippet

29 words. Reading time: 7 seconds.

<img src="/assets/img/blog/2020-04-24-pimp-blog-reading-time/html-snippet.png" alt="word count for html code snippet" style="max-width:1204px;width:96%;display:block;margin:0 auto;"/>

### CSS Snippet

174 words. Reading time: 42 seconds.

<img src="/assets/img/blog/2020-04-24-pimp-blog-reading-time/css-snippet.png" alt="word count for css code snippet" style="max-width:1326px;width:96%;display:block;margin:0 auto;"/>

### JavaScript Snippet

107 words. Reading time: 26 seconds.

<img src="/assets/img/blog/2020-04-24-pimp-blog-reading-time/js-snippet.png" alt="word count for javascript code snippet" style="max-width:1436px;width:96%;display:block;margin:0 auto;"/>

## Final Words

Did you read this in 4 minutes? 🤔😛

I would like to write something a bit more sophisticated than this to come up with an estimated reading time that considers code in a more meaningful way.

If you enjoyed the post, let me know.

Maybe next, I will speak about adding comments to your blog.

Happy hacking! 👩‍💻👨‍💻🙌
