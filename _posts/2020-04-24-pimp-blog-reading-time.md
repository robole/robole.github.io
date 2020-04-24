---
layout: post
title: "Add the estimated reading time to your Blog. Do you read code at 275 words per minute? 👓👩‍💻"
category: programming
tags: [html, css, javascript, programming]
published: true
---

<img src="/assets/img/blog/2020-04-24-pimp-blog-reading-time/banner.jpg" alt="overhead point of view of coder at desk with 3 screens" style="width:98%;max-width:1920px;margin:0 auto;"/>

Can we add anything to a standard blog that would enhance the reading experience?

How about the estimated reading time?

## How will we calculate it?

Well, let's look at what others do first!

- **Dev.to** takes the total word count of a post and divides it by **275 (words per minute)**. The resulting number is rounded up to give the number of minutes. [Source of information here](https://dev.to/devteam/changelog-reading-time-now-displayed-16o0).

- **Medium** takes the total word count of a post and divides it by **265 (words per minute)**. They make an adjustment for images, whatever that means! It sounds intriguing, I wish I could see their code! [Source of information here](https://help.medium.com/hc/en-us/articles/214991667-Read-time).

One big issue I have with these calculations is that **they treat code as regular text**! I doubt people read code at a regular reading speed! 😲⚡ Reading code is not linear, and it involves going back and forth between blocks in order to understand the program's logic. It is not a narrative. 

As for the choice of a typical reading speed, [research has been conducted on various groups of people](https://en.wikipedia.org/wiki/Reading#Reading_rate), what you regularly see quoted is: **100-200 words per minute (wpm) for learning, 200 to 400 wpm for comprehension**.

I will show you how to do it the same way as Dev.to, but I differ by: 

- Using 250 wpm as my reading speed; 
- And **I will show the calculation in a dropdown**. I wanted to know where the magic number came from, so maybe the readers of your blog do too! 

## Reading Time with dropdown

You can see the <b><span style="color:purple">reading time in purple</span></b> in the Pen below. Click it to show the calculation.

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

The `<details>` element is similar to an accordion, additional details are hidden that the user can view or hide on demand. 

The `<summary>` is always shown, this shows our reading time. The `<span>` is the additional details that are hidden by default, we add the details of our calculation here. We wrap it in a `<div>` to help with styling it.

### CSS

```css
:root {
  --purple: rgb(115, 0, 209);
}

.reading-time{
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.reading-time details {
  position: absolute;
  background:white;
  z-index: 1;
}

.reading-time summary{
    color:var(--purple);
    font-weight: 600;
}
```

We set the `<div>` wrapping our content as `position:relative`, this enables us to position the child `<details>` absolutely in relation to it, which takes it out of the normal page flow. We do this because now when we click on the *reading time* to show the additional details, it doesn't expand in size and push the elements below it further down. We assign it `z-index:1`, so it appears above the content below it.

### JavaScript

```javascript
const post = document.getElementById("post");
const readingTimeSummary = document.querySelector(".reading-time summary");
const readingTimeDetails = document.querySelector(".reading-time details span");
const avgWordsPerMin = 250;

setReadingTime();

function setReadingTime(){
    let count = getWordCount();
    let time = Math.ceil(count / avgWordsPerMin);

    readingTimeSummary.innerText = time + " min read";
    readingTimeDetails.innerText = count + " words read at " + avgWordsPerMin + " words per minute.";
}

function getWordCount(){
  return post.innerText.match(/\w+/g).length;
}
```

I will explain `getWordCount()`, the rest should be clear.

We use a [regular expression (regex)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) pattern to get all the words of the post. The `match()` function searches the text (in *post*) using the regex pattern and returns all matches in an array.

The regex is contained between 2 forward slashes, and followed by a '*g*' to state it is a global search. A global search looks for every occurrence, if we omit it, then the search looks for the first occurrence only. *w+* looks for 1 or more words. 

We get the value of the `length` property of the resulting array to get the word count.

## On the reading time of code

I couldn't find any empirical information on the typical reading speed of code.  

When researchers looked for ways to measure programming productivity, they chose **lines of code** written as the primary metric. This has fallen out of favour now, it was known as the [programming productivity paradox](https://dzone.com/articles/programmer-productivity). Still, maybe lines of code would be more useful than looking at individual words for reading, programming syntax is a lot different than verbal languages. Obviously the complexity of the code, and the programming language used would be 2 major factors that would affect the reading time. The point is, it is not simple to be accurate and conjure an universal formula, which will esimate how long it takes to understand a fragment of code.

If I were to guess I would say that reading code would probably occupy the lower end of the scale of the "learning" bracket discussed previously, we are learning the logic of a program, rather than just comprehending text.

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

That's it. If you enjoyed the post, let me know. 

Maybe next, I will speak about adding comments to your blog.

Happy hacking! 👩‍💻👨‍💻🙌