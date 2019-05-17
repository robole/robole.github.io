---
layout: post
title: "SVG phased creation animation 💻"
category: web
tags: [SVG, javascript, web]
published: true
---
I was editing a SVG today, and I was changing the order of some elements when I noticed when I reversed the order of elements, it created an effect of incrementally creating the drawing. It is dependent on how you organically added and ordered the layers in the first place.

So, I thought it'd be cool to do this completely, put a white layer in the foreground, and use some simple javascript to move each element into the foreground. This is the result.

<p data-height="397" data-theme-id="dark" data-slug-hash="XYBbre" data-default-tab="result" data-user="robjoeol" data-embed-version="2" data-pen-title="World Cup drawing construction animation" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/XYBbre/">World Cup drawing construction animation</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
