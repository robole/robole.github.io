---
layout: scrollable_post
title: Sticky headers 💻
category: web
tags: [HTML, CSS, web]
published: true
---
CSS introduced the property ```position: sticky``` in 2012, one obvious application of this is for making sticky headers.

The idea is straightforward: If an element has ```position: sticky```, treat it as a normal ```position: relative``` block, as long as it’s on screen. If the user scrolls far enough that the element (let’s say it’s a ```h1```) would be scrolled off the screen, but the ```h1```’s parent div is still visible onscreen, treat it as though it were ```position: fixed``` with whatever position you specify it with through: ```top```, ```left```, ```right```, ```bottom```.

The problem was that adoption of this property was slow by some browser vendors, but that has changed eventually, so we can embrace it now!

# So, how do you make sticky headers with just css?

It’s super-easy. All you do is add

```css
position: -webkit-sticky;
position: -moz-sticky;
position: -ms-sticky;
position: -o-sticky;
position: sticky;
top: 0;
```
and that element will stay on top always.

# Tables

One of the best use-cases for this is with really long tables. That is, tables where you want to see the column headers on top as you scroll down.

There is one caveat though, Chrome and Edge have a bug with using ```position: sticky``` on ```thead```. So, the way around this is to apply it to ```th``` instead.

<p data-height="265" data-theme-id="0" data-slug-hash="MBvLLZ" data-default-tab="result" data-user="robjoeol" data-pen-title="Table Sticky Header using position:sticky;" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/MBvLLZ/">Table Sticky Header using position:sticky;</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You can also use it to make sticky headers on the side and top for easy cross-referencing!  So it kind of mimics frozen rows in Excel!

<p data-height="417" data-theme-id="0" data-slug-hash="KBQbNG" data-default-tab="result" data-user="robjoeol" data-pen-title="Cell Zoom 🔍" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/KBQbNG/">Cell Zoom 🔍</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# Browser Support

As long as you avoid using it on ```thead```, you are good on the 4 major desktop browsers. IE be damned!

<a href="https://caniuse.com/#feat=css-sticky"><img src="/assets/img/blog/2018-07-31-sticky-headers/caniuse.png" alt="browser support"/></a>
