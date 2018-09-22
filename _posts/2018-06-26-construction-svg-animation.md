---
layout: post
title: "SVG phased creation animation 💻"
category: web
tags: [SVG, javascript, web]
published: true
---
When I was editing a SVG today I noticed that if you push a background layer to the foreground, it can create an effect of concealing some incremental additions, dependent on how you organically added and ordered the layers in the first place.

So, I thought it'd be cool to reverse this, put a white layer in the foreground, and use some simple javascript to move it completely to be the background layer (be the first child of the *svg*). This is the result.

<p data-height="397" data-theme-id="dark" data-slug-hash="XYBbre" data-default-tab="result" data-user="robjoeol" data-embed-version="2" data-pen-title="World Cup drawing construction animation" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/XYBbre/">World Cup drawing construction animation</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
