---
layout: post
title: "How to explain Web technologies to a 12-year old 💻"
category: programming
tags: [CSS, Javascript, HTML, teaching]
published: false
---

I was learning CSS Grid this week. I wanted to try to replicate some familiar UIs and use only CSS Grid for layout. This can be a good way to see what the flowers and thorns of a new method are! 

So, I made Instagram's profile page.

`https://codepen.io/robjoeol/pen/wvKaGjz %}`

[Source code available on github](https://github.com/robole/css-grid).

## Conclusion

CSS Grid is powerful and versatile. I was able to solve every layout scenario I encountered without too much fussing over details. 

I kept mixing up the alignment properties (*justify-items* and *align-items*), I wasted the most time in trying to figure out small positional things like: how do I align this content to be positioned to be "left and top" inside these cells? Sometimes you need to have a specific row height or column width for this to work the way you want.

You can nest grids without any clashes i.e make the *body* a grid, and then make every *section* a grid also. Doing this and using *grid-gap* can simplify your management of whitespace and margins. You can make most parts of you webpage a grid to avail of this.

You can make large chunks of a page responsive using *fr* units (free space units) and using *auto-fill*. 

For example, this will try to fit as many items with a width of 65px into the available space, it will wrap automatically into a new row if items begin to overflow. I used it to build a horizontal list of stories.

```css
.story{
  display: grid;
  grid-template-columns: repeat(auto-fill, 65px);
  grid-auto-flow: column;
}
```

There were some Use Cases where Flexbox would have been more straight-forward. Some like the example above can be do equally well in CSS Grid and Flexbox.

Overall, I think CSS Grid is a worthwhile addition to a developers toolbox, and simplify some UI Design. 

I recommend Firefox's dev tools, it has very good CSS Grid support. You can show grid outlines super-imposed over the element in the browser window to help you visualise any of grids.

![dev tools](https://dev-to-uploads.s3.amazonaws.com/i/0ipxqouhwknehblvd06g.png)