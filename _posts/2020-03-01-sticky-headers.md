---
layout: scrollable_post
title: Make it stick! Sticky headers in CSS 🦎🔝
category: web
description: "CSS introduced the property `position: sticky` in 2012, one obvious application of this is for making sticky headers."
tags: [HTML, CSS, web]
published: true
---
![banner image of sticky post-it](/assets/img/blog/2018-07-31-sticky-headers/banner.jpg)

CSS introduced the property `position: sticky` in 2012, one obvious application of this is for making sticky headers. 

The idea is straightforward: If an element has `position: sticky`, treat it as a normal `position: relative` block, as long as it’s on screen. If the user scrolls far enough that the element (let’s say it’s a `h1`) will move off the screen, but it's parent is still visible onscreen, treat it as though it were `position: fixed`. 

Initially, the problem with this property was that adoption was slow by some browser vendors, but that is no longer an issue, so we can embrace it without big reservations now! There is a caveat with tables, which I will discuss below.

## So, how do you make sticky headers with just css?

It’s super-easy! 

All you do is:

```css
.stayOnTop{
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    position: -o-sticky;
    position: sticky;
    top: 0;
}
```
The position is set through the properties: `top`, `left`, `right`, `bottom`. So, to have the element stay on top, use `top: 0;`. 

Using the browser prefixes is still necessary for some Browsers such as Safari, so it's best to add them all, and avoid cross-browser compatibility mishaps!

## Tables

One of the best Use Cases for this is for bigggg tables. That is, tables where you want to see the column headers on top as you scroll down.

There is one caveat though, Chrome and Edge have a bug with using `position: sticky` on `thead`. So, the way around this is to apply it to `th` instead.

<p data-height="500" data-theme-id="0" data-slug-hash="MBvLLZ" data-default-tab="result" data-user="robjoeol" data-pen-title="Table Sticky Header using position:sticky;" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/MBvLLZ/">Table Sticky Header using position:sticky;</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You can use it to make sticky headers on the side and top for easy cross-referencing for big data sets, maybe you're showing scientific findings like below! So, it kind of mimics frozen rows in Excel!

<p data-height="417" data-theme-id="0" data-slug-hash="KBQbNG" data-default-tab="result" data-user="robjoeol" data-pen-title="Cell Zoom 🔍" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/KBQbNG/">Cell Zoom 🔍</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>


## Other Use Cases

- It is used often to make a sticky navigation bar when there is a hero section above it. The navigation bar becomes fixed when the user scrolls past the hero section.

<p class="codepen" data-height="457" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="pojgrXz" style="height: 457px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Sticky nav under hero (CSS only)">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/pojgrXz">
  Sticky nav under hero (CSS only)</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


- I think the example below is cool, but it **requires some JS**. A reading progress bar for a blog post. Scroll to see it in action. You can get creative with `sticky` too!

<p class="codepen" data-height="439" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="bGVpePR" style="height: 439px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Blog Reading Progressbar">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/bGVpePR">
  Blog Reading Progressbar</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


## Browser Support

As long as you avoid using it on `thead`, you are good on the major browsers (see green-shaded squares in image below). IE be damned! 😜 Click on the image to see the full list.

<a href="https://caniuse.com/#feat=css-sticky"><img src="/assets/img/blog/2018-07-31-sticky-headers/caniuse.png" alt="browser support for position sticky"/></a>
