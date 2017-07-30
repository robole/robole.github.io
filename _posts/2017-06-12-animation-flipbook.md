---
layout: post
title: "Animation Flipbook"
category: animation, CSS
---
# Flipbook Effect

A useful technique to have at my disposal would be a quick way to create a simple responsive animation.


As a starting point we could emulate the effect like a flipbook made by kids where on a block of post-it notes a series of frames are drawn!


We need to overlay the images atop one another with different poses and cycle through the images. What is the best way to do this?


We can use SVG, it will be responsive and the quality need not degrade.


We can use opacity to fade one image in and fade the other out. This can be achieved easily with CSS.


Here is a [simple example](https://codepen.io/robjoeol/full/LLzYBY/) showing Donald Trump yawping! The CSS is below such that #trump1 and #trump2 reference the 2 SVGs.

>#trump1 {
  position: absolute;
  top: 125px;
  left: 25px;
  width: 50%;
  height: 50%;
  opacity: 1;
  animation: fadeout 2s infinite;
}

>#trump2 {
  position: absolute;
  top: 130px;
  left: 30px;
  width: 50%;
  height: 50%;
  opacity: 0;
  animation: fadein 2s infinite;
}

>@keyframes fadeout {
  25%{
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  75%{
    opacity: 0;
  }
  100%{
    opacity: 0;
  }
}

>@keyframes fadein {
  25%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  75%{
    opacity: 1;
  }
  100%{
    opacity: 1;
  }
}
