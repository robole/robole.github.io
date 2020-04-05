---
layout: scrollable_post
title: "A11y - Just the hits 💻"
category: programming
tags: [accessibility, a11y, HTML]
published: true
---

Accessibility (A11y) refers to the creation of digital content that can be used by everyone.  

<blockquote>The Web is fundamentally designed to work for all people, whatever their hardware, software, language, location, or ability. - <abbr title="World Wide Web Consortium">W3C</abbr></blockquote>

How do you make accessible websites?

1. Use specific HTML elements for their intended purpose whenever you can. Use `<div>` and `<span>` as last resorts.
2. Use headings and don't skip levels.
3. Organise your content into regions with elements such as : `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`, and `<section>`.
4. Have your HTML ordered to match the visible order in the Browser. CSS can move elements anywhere and it will confuse assistive technology! 
5. Use clear language and avoid things that may be difficult to be read aloud.
6. Consider the size of your navigation, the number of links, and the length of the text.
7. Have a `<label>` associated with every `<input>` and `<button>`. Placeholder text does not cut it.
8. Write useful alternative text for your images and other non-text content. Populate `alt` for images, `<caption>` for tables.
9. Interactive elements are focusable via keyboard by default, do not alter this, and provide it if you are making a custom control. 
10. Preserve the visibility of the focus indicator. Think it's ugly, style it up. 
11. Don't hide information without giving a visible trigger. You can't expect everyone to be able to hover to find content.
12. Use colour palettes with a high contrast ratio. A constrast ratio of 4.5:1 between text and the background should be your aim.
13. Don’t use colour alone to make critical information understandable.
14. Clickable areas should be at least 48x48dp (physical size of 9mm).
15. Learn about ARIA (in the next post).