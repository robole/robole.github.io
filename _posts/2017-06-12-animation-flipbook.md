---
layout: post
title: "Animated Flipbook Effect 💫✏️"
category: web design
tags: [animation, CSS, SVG]
---

A useful technique to have at one's disposal would be a quick way to create a
simple, responsive animation that looks *really* good at different resolutions.
So, I will not discuss animated GIFs!  

As a starting point, we could emulate the effect of a flipbook. When I was a
kid, I used a block of post-it notes to create a series of scenes, beginning
from the top down, then you can flip through them to "run" the animation! So,
it's a series of overlayed images with different poses, cycle through the
images to create the animation. What is the best way to do this on the web?  

The quality of a SVG will not degrade on resizing. So, it is a good choice.

We can use opacity to fade one image in, and fade the other out. This can be
achieved easily with CSS animation.  

Here is a simple example showing Donald Trump yawping!

<p data-height="365" data-theme-id="0" data-slug-hash="LLzYBY" data-default-tab="result" data-user="robjoeol" data-embed-version="2" data-pen-title="trump yawp" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/LLzYBY/">trump yawp</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This technique is not very suitable for more than a few poses (frames),
each frame requires a @keyframes block, and these blocks need to be coordinated
with each other to make a smooth transition for the animation. An animation
library should be used for anything more complex than that!
