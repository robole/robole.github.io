---
layout: post
title: "Animated Flipbook Effect"
category: animation
tags: [animation, CSS, SVG]
---

A useful technique to have at one's disposal would be a quick way to create a simple responsive animation. So, not an animated GIF!  


As a starting point we could emulate the effect of a flipbook made by kids where on a block of post-it notes a series of frames are drawn! We overlay the images atop one another with different poses and cycle through the images. What is the best way to do this?  


We should use SVG, the quality will not degrade on resizing.


We can use opacity to fade one image in and fade the other out. This can be achieved easily with CSS.  


Here is a simple example showing Donald Trump yawping!

<iframe height='347' scrolling='no' title='trump yawp' src='//codepen.io/robjoeol/embed/LLzYBY/?height=347&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/robjoeol/pen/LLzYBY/'>trump yawp</a> by rob (<a href='https://codepen.io/robjoeol'>@robjoeol</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This technique is not very suitable for more than a few frames, each frame requires a @keyframes block, and these blocks need to be coordinated with each other to make a smooth transition for the animation.
