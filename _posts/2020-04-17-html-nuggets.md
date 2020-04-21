---
layout: post
title: "HTML Nuggets: Little bits that you may have forgotten, never learned, never realised, or ignored! 🔸🤓"
category: web
tags: [html, programming]
published: true
---
<img src="/assets/img/blog/2020-04-17-html-nuggets/banner.jpg"  alt="code collage" style="width:100%;max-width:1920px;margin:0 auto;"/>

If you learned something new from this, let me know what it is! 😊

1. [No doctype, maybe no emojis 😢](#no-doctype-maybe-no-emojis-)
1. [Optimize: Lazy loading of images and iframes with the `loading` attribute](#optimize-lazy-loading-of-images-and-iframes-with-the-loading-attribute)
1. [Good form: You're my `type` 😘 Get the right keyboard on mobile for inputs](#good-form-youre-my-type--get-the-right-keyboard-on-mobile-for-inputs)
1. [Good form: Restrict input by `type`](#good-form-restrict-input-by-type)
1. [Good form: Validate input easily](#good-form-validate-input-easily)
1. [Good form: Validate input with regex](#good-form-validate-input-with-regex)
1. [Good form: `<label>` and `<input>` are like wine and cheese, good for clicking and accessibility](#good-form-label-and-input-are-like-wine-and-cheese-good-for-clicking-and-accessibility)
1. [Good form: reset a form](#good-form-reset-a-form)
1. [Good form: spellcheck](#good-form-spellcheck)
1. [Make the content of any element editable 😮](#make-the-content-of-any-element-editable-)
1. [Show the progress of something with `<progress>`](#show-the-progress-of-something-with-progress)
1. [Responsive: Want a responsive webpage? Not without`<meta>` !](#responsive-want-a-responsive-webpage-not-without-meta-)
1. [Responsive: Responsive images with`srcset`. Look mom, no media queries! 🤔](#responsive-responsive-images-withsrcset-look-mom-no-media-queries-)
1. [You can show/hide details in a collapsible widget](#you-can-showhide-details-in-a-collapsible-widget)
1. [*Fernstraßenbauprivatfinanzierungsgesetz* is a real word. Use `<wbr>`](#fernstraßenbauprivatfinanzierungsgesetz-is-a-real-word-use-wbr).

## No doctype, maybe no emojis 😢

The doctype declares the version of HTML we use, more specifically what web standard the document follows (XHTML 1.1, HTML 4.01, HTML 5).

Usually you see `<!DOCTYPE html>` as the first line to specify it is a HTML 5 document. It must be the first line. It is not case sensitive. 

The thing with Browsers is that they *do their best with whatever you give them*, and they probably don't complain. So, you can omit the doctype or something else, and it may be able to show the webpage perfectly to you, but another Browser may produce something weird. To avoid the guessing game, it is better to be explicit with the doctype and the character set. Let me explain fully.  

The default character set in HTML 5 is [UTF-8](https://en.wikipedia.org/wiki/UTF-8). If you omit the doctype, then the default character set is probably [ISO 8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1), which is a lot smaller, so you might get some garbled text with characters not in the set, especially for more recent additions like emojis. 

I suggest you declare the character set always with `<meta charset="UTF-8">` too. So your typical document looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
  </head>
  <body>
  </body>
</html>
```

Firefox gives you a warning if you have a doctype, but no character set declared. 🦊😕

<img src="/assets/img/blog/2020-04-17-html-nuggets/no-doctype.png" alt="firefox warning" style="display:block;width:100%;max-width:802px;">

Another side effect connected with omitting the doctype is, you can go into [quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode) in older browsers (< IE9), which will cause erratic behaviour. I don't think this is an issue for everyone on > IE9, and other Browsers.

## Optimize: Lazy loading of images and iframes with the `loading` attribute

```html
<img src="big-image.png" loading="lazy" alt="…" >
<iframe src="https://example.com" loading="lazy"></iframe>
```

Set the value of `loading` to lazy, and it will defer loading of the resources that are off-screen until the user scrolls near them.

It is still quite a new feature, so Browser support is not that great. 

<a href="https://caniuse.com/#feat=loading-lazy-attr"><img src="/assets/img/blog/2020-04-17-html-nuggets/loading-caniuse.png" alt="browser support for lazy attribute. its 64% ish" style="width:100%;max-width:657px;display:block;margin:0 auto;"></a>

### How do I support more Browsers?  

Write some Javascript!🙃 The `loading` property can be used to detect if the feature is supported in the Browser.

If it's not supported, we can ues a [*polyfill*](https://github.com/mfranzke/loading-attribute-polyfill); or a third-party library such as [lazysizes](https://github.com/aFarkas/lazysizes) instead.

```js
<script>
 if ('loading' in HTMLImageElement.prototype) {
  // supported in browser
} else {
  // get polyfill or third-party library and use that
}
</script>
```

## Good form: You're my `type` 😘 Get the right keyboard on mobile for inputs

Some mobile browsers recognize the type of an input and provide a keyboard that makes text entry easier for that type: 

- `<input type="email">` triggers a keyboard with the <kbd>.com</kbd> and <kbd>@</kbd> keys.
- `<input type='url'>` (for a web address) triggers a keyboard with the <kbd>/</kbd> key.
- `<input type='number'>` and other numeric types trigger a numeric keyboard.

You can also provide an additional "hint" by providing the `inputmode` attribute (values include: `none`, `text`, `tel`, `url`, `email`, `numeric`, `decimal`, and `search`). My experience with Android Browsers is that this attribute is not necessary.

Check out this article for a more in-depth look: [Better Form Inputs for Better Mobile User Experiences](https://css-tricks.com/better-form-inputs-for-better-mobile-user-experiences/).

## Good form: Restrict input by `type`

With the following input types (ordered from least familiar to most familiar), you constrain the values that can be entered:

- `color`: Shows a button with a colour swatch, which opens a colourpicker dialog. You can only pick colours.
- `file`: Shows a button, which opens a file browser dialog. You can only pick files.
- `range`: Shows a slider for a numeric range from the lowest to highest values (set with the `min` and `max` attributes).
- `time`: You can only input a time in *hh:ss* format. Some browser show it a mask such as `__:__`
- `date`: Shows a text field, which opens a  datepicker dialog on selection. Not popular because it cannot be styled easily and looks so different from browser to browser!
- `checkbox`, `radio`, `select`, `datalist`: you can only select their list of values.
- `<button>`, `submit`, `reset` : these are buttons, you can only click them!

You can see all of the inputs on the [MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input) to get a clearer idea if you are not familiar.

## Good form: Validate input easily

If you enter incorrect data in an input, and hit the 'submit button', then the field will be highlighted (usually with a red outline). 

<img src="/assets/img/blog/2020-04-17-html-nuggets/implicit-validation.png"  alt="invalid data highlighted with red outline" style="display:block;width:100%;max-width:425px;margin:0 auto;"/>

There are some [CSS pseudo-classes available for custom styling](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#UI_pseudo-classes) such as `:invalid`, `:in-range`, `:out-of-range`, `:required`). Maybe, you thought the default style is the only choice!

Validation is done in the following ways:

- Some inputs have implicit validation: `email` must contain '@' and a dot, `url` must contain "http://", numeric inputs must contain a number.
- Add the `required` attribute to ensure an input must be filled in.
- For numeric types, you can limit the value with the `min` and `max` attributes.
- For text types, you can limit the length with the `minlength` and `maxlength` attributes.

```html
<!--implicit validation-->
<label>Email:
<input type="email" name="email" placeholder="john.doe@example.com" size="30"></label><br>
<label>Website:
<input type="url" name="website" placeholder="http://www.example.com" size="30"></label><br>
<label>Random number:
<input type="number" name="random"></label><br>
 
<!--specific validation-->
<label>Name (4-8 chars):
<input type="text" id="name" name="name" minlength="4" maxlength="8" required><br>
<label>Age (1-120):
<input type="number" name="age" min="1" max="120" required></label><br>
```

<p class="codepen" data-height="400" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="rNOedwp" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Learning HTML - Form Validation">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/rNOedwp">
  Learning HTML - Form Validation</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Good form: Validate input with regex

The `pattern` attribute takes a [regular expression (regex)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) that the data you enter must match in order for the value to be valid. It is only checked when `required` is included. 

You can make very expressive tests with this attribute. When you use it, let the users know about the input requirements, it can be frustrating trying to figure out it otherwise!

```html
<label>Username <i>(letters and numbers only, no  punctuation or special characters)</i>
<input name="username" id="username" pattern="[A-Za-z0-9]+" required></label><br>

<!-- US Postal Code-->
<label>Postal Code <i>(5 numbers, a dash, and 4 numbers)</i>:
<input type="text" pattern="(\d{5}([\-]\d{4})?)" required></label>
```

 However, I would be cautious using this as it is hard to anticipate all of the possible variations upfront, and regex can be misunderstood. There is an old proverb among computer programmers:

>  Some people, when confronted with a problem, think “I know, I'll use regular expressions.” Now they have two problems.

## Good form: `<label>` and `<input>` are like wine and cheese, good for clicking and accessibility

Having a `<label>` with a input of type: `radio`, `check`, `submit`, `reset` makes the `<label>` clickable also. A bigger target area makes life easier for users. 

The pairing is useful for assistive technologies such as screen readers. By pairing them using the `for` attribute, you bond the label to the input in a way that lets screen readers describe inputs to users more precisely.

```html
<!-- implicit label -->
<p><label>Enter your name: <input id="name" type="text" size="30"></label></p>

<!-- explicit label -->
<p><label for="name">Enter your name: </label><input id="name" type="text" size="30"></p>
```

## Good form: reset a form

Use `<input type="reset">` and it will clear all form fields, resetting them to their default value, specified in the `value` attribute.  

## Good form: spellcheck

```html
<textarea name="description" spellcheck="true" 
rows="4" cols="50">Cjeck me</textarea>
```

You will get red squiggly lines underneath misspelt words.

The following can be spellchecked:

- Text values in input elements (not password)
- Text in `<textarea>` elements
- Text in editable elements

## Make the content of any element editable 😮

```html
<p contenteditable="true">This is a paragraph. It is editable. 
Try to change this text.</p>
```

You can make an element editable by setting the `contenteditable` attribute to true.

<p class="codepen" data-height="350" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="LYpNmPw" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Learning HTML - spellcheck and contenteditable attributes">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/LYpNmPw">
  Learning HTML - spellcheck and contenteditable attributes</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Show the progress of something with `<progress>`

Spinners and skeletons have become the most popular ways to showing the progress of a loading task. 

HTML has `<progress>` for this purpose. It is a progress bar. Maybe the reason it is seldom used is because it is hard to style, [but you can style it with some know-how](https://css-tricks.com/html5-progress-element/). 

```html
<label for="file">Downloading progress:</label>
<progress id="file" value="32" max="100">32%</progress> 
```

[Here is the MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) if you want to read more.

## Responsive: Want a responsive webpage? Not without `<meta>` !

I made this mistake one day, why isn't the page resizing on mobile!😡🤦‍♂️ People forget that HTML can influence responsivity!

> Responsive Web Design is about using HTML and CSS to automatically resize, hide, shrink, or enlarge, a website, to make it look good on all devices (desktops, tablets, and phones)

Always include the `<meta>` element as below.

```html
 <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h2>Setting the Viewport</h2>
<p>This example does not really do anything, other than showing you how to add the viewport meta element.</p>
</body>
</html>
```

Without it, the page on mobile is scaled to around 60%. The website looks like a shrunk version of the desktop version.

## Responsive: Responsive images with`srcset`. Look mom, no media queries! 🤔

I will preface this by saying that you may choose to use CSS instead, but it's a hard decision. Let me break it down for you. 

Ideally, we would always load optimized images that closely match the screen size of the device. Goldilocks scenario: *not too big* (wasteful of bandwidth), and *not too small* (grainy if you scale it up in size). So, we would like to swap images depending on resolution. This is known as the **resolution switching problem**.

We can use the `srcset` and `sizes` attributes of `<img>`, which gives the browser the choice to choose the right image for the screen resolution. The value of `srcset` contains a comma-separated list of images with the path and with the width stated. 

```html
<img src="cat.jpg" alt="cat"
  srcset="cat-160.jpg 160w, cat-320.jpg 320w, cat-640.jpg 640w, cat-1280.jpg 1280w"
  sizes="(max-width: 480px) 100vw, (max-width: 900px) 33vw, 1280px">
```

The `sizes` attribute has a comma-separated list describing the size of the image in relation to the viewport. Not as easy to understand this one. It's a bit like a media query. If we translated this into a list of instructions, it might look like this:

- `(max-width: 480px) 100vw`:  If the viewport is <= 480px wide, the image will be 100% of the viewport width.
- `(max-width: 900px) 33vw`: If the  viewport is between 481px and 900px wide, then the image will be 33% of the viewport width.
- `1280px`: This the default value used when none of the other media conditions are met. So, for >= 901px wide, the image will be 1280px wide.

This works really well. The problem many have is that we now have information about the presentation of an element, the size of the image, in our markup. Ideally, we put this type of information in CSS. So there is an argument for doing it all in CSS. But the counter argument is performance. Read on.

### Why don't you want to use CSS or JS?

When the browser starts to load a page, it starts to download (preload) any images before the main parser has started to load and interpret the page's CSS and JS. This is a useful technique, which has shaved an average of 20% off page load times. **So, any techniques you try in CSS and JS, will be 20% slower on average**. So, you need to decide which is more important: performance, or a clearer division between content and presentation.

### Anything else to know?

If you are want to switch background images, [do it in CSS](https://cloudfour.com/thinks/responsive-images-101-part-8-css-images/).

I would highly recommend the [Responsive Images 101 series of short articles](https://cloudfour.com/thinks/responsive-images-101-definitions/) to get a better understanding of this topic if it is sounding confusing, or you want to learn more.

## You can show/hide details in a collapsible widget

```html
<details>
  <summary>Jack in the box.</summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Jack-in-the-box.jpg" 
  alt="Jack in the box">
  <p>A jack-in-the-box is a children's toy that is a box with a crank. When the 
  crank is turned, it plays a melody. After the crank has been turned a sufficient 
  number of times, the lid pops open and a clown, pops out of the box. </p>
</details> 
```
<p class="codepen" data-height="378" data-theme-id="light" data-default-tab="result" data-user="robjoeol" data-slug-hash="WNQwKxr" style="height: 378px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Learning HTML - details">
  <span>See the Pen <a href="https://codepen.io/robjoeol/pen/WNQwKxr">
  Learning HTML - details</a> by Rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## *Fernstraßenbauprivatfinanzierungsgesetz* is a real word. Use `<wbr>`

Some languages have long words. Germans make a lot of compound words for instance. If you're a chemist and you use chemical names, they can be very long. It must be hard to be a German chemist! So what you may ask?

If a sentence gets too long, a word is broken up wherever the browser decides, usually so it doesn't overflow. Breaking it up in the wrong place makes it hard to read. You can use `<wbr>` (Word Break Opportunity) to specify where in a text it would be ok to add a line-break.

```html
<p>You must take a left at the station, go halfway down the street, 
and you will see a building with the name <wbr>Fern<wbr>straßen
<wbr>bau<wbr>privat<wbr>finanzierungs<wbr>gesetz.</p>
```

## The End

Thanks for reading!🙂

