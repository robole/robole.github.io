---
layout: post
title: "Pimp your blog: Make eye-catching rich snippets"
category: web
description: "Learn how to improve the metadata of your website to create eye-catching rich snippets"
image: "/assets/img/blog/pimp-your-blog-metadata/banner.jpg"
tags: [HTML, metadata]
---

Rich snippets are summaries of the content of a webpage. Social media platforms created metadata specifications for rich snippets with the goal of helping web creators to advertise their content better.

Metadata is data about your HTML page, it is generally the content contained in the `head` element.

Search Engine results are also typically populated with metadata you provide.

## Why bother?

- Eye catching results: Drawing a user's attention to your own content can improve engagement on social platforms.
  – Potential click-through rate (CTR) increase: Providing more descriptive and engaging information as a preview of your content can encourage user's to view the content.
- It can lead to improvements in your page rankings: Most search engines favour webpages that are referenced often or featured on authortative websites, by getting more eyeballs on your content, you increase the chances of this happening.

## TLDR: Here is the Markup

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="utf-8" />

  <!-- usually used by search engines -->
  <title>Pimp your Blog: Calculate the 'reading time' ⏱🦉</title>
  <meta name="author" content="Rob O'Leary" />
  <meta
    name="description"
    content="Can we add anything to a standard blog that would enhance the reading experience? How about the estimated reading time?"
  />

  <!-- For social media rich snippets-->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@twitterhandle" />
  <meta name="twitter:creator" content="@twitterhandle" />
  <meta
    property="og:url"
    content="https://roboleary.net/programming/2020/04/24/pimp-blog-reading-time.html"
  />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="2020-04-24T14:54:50+00:00" />
  <meta
    property="article:publisher"
    content="http://www.facebook.com/username"
  />
  <meta property="article:author" content="https://www.facebook.com/username" />
  <meta
    property="og:title"
    content="Pimp your Blog: Calculate the 'reading time' ⏱🦉"
  />
  <meta
    property="og:description"
    content="Can we add anything to a standard blog that would enhance the reading experience? How about the estimated reading time?"
  />
  <meta
    property="og:image"
    content="https://roboleary.net/assets/img/blog/2020-04-24-pimp-blog-reading-time/banner.jpg"
  />
</head>
```

## General Metadata

### The Title Element

The _title_ element sets the document’s title. Browsers usually display the contents of this element at the top of the browser window or tab. In Search Engine Results Pages (<abbr>SERP</abbr>s), this is usually the headline of the result. You should have a _title_ for every page!

### The Meta Element

There are different attributes that you can use with _meta_ to provide different kinds of metadata.

#### Using the name and content attributes

We can use the _name_ attribute to define metadata applied to the whole page.

The attributes _name_ and _content_ are used as name-value pairs.

- **_name="author"_**: Declares the author of the page. You can only declare one author.
- **_name="description"_**: Describes the content of the page, and is often used as the description by search engines in their results. Keeping it to 150 characters is a good rule of thumb as the text is truncated beyond that usually.

### Metadata for Social Media Platforms

#### Open Graph

Facebook’s Open Graph allows you to specify how your content is displayed on a user’s timeline. Without these tags, the Facebook Crawler uses internal heuristics to make a best guess about the title, description, and preview image for your content.

![facebook sharing](img/facebook-sharing.png)

Open Graph is used by the following Social Media platforms:

- Facebook
- Instagram
- Twitter
- Pinterest
- LinkedIn

The Open Graph protocol specifies the use of _property_ and _content_ attributes for markup, this deviates from the HTML standard of using _name_ and _content_. 🙄

A typical blog post can be marked as below:

```html
<head>
  <meta
    property="og:url"
    content="https://roboleary.net/programming/2020/04/24/pimp-blog-reading-time.html"
  />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="2020-04-24T14:54:50+00:00" />
  <meta
    property="article:publisher"
    content="http://www.facebook.com/username"
  />
  <meta property="article:author" content="https://www.facebook.com/username" />
  <meta
    property="og:title"
    content="Pimp your Blog: Calculate the 'reading time' ⏱🦉"
  />
  <meta
    property="og:description"
    content="Can we add anything to a standard blog that would enhance the reading experience? How about the estimated reading time?"
  />
  <meta
    property="og:image"
    content="https://roboleary.net/assets/img/blog/2020-04-24-pimp-blog-reading-time/banner.jpg"
  />
</head>
```

To see how your markup appears to the Facebook Crawler, you preview and debug it through the [Sharing Debugger](https://developers.facebook.com/tools/debug/).

These tags can also enable you to track traffic statistics on [Facebook Insights](https://developers.facebook.com/docs/sharing/referral-insights), Facebook's analytics suite.

You can read more about [the markup for Open Graph here](https://developers.facebook.com/docs/sharing/webmasters#markup).

#### Twitter

Twitter calls its rich snippets _Twitter Cards_.

> Twitter Cards are customizable media units that advertisers can use to drive traffic to their website or mobile app.

Twitter card tags are similar to Open Graph tags, and are based on the same conventions. When using Open Graph protocol to describe data on a page, it is easy to generate a Twitter card without duplicating tags and data. When the Twitter card processor looks for tags on a page, it first checks for the Twitter-specific properties, and if they are not present, it falls back to the equivalent Open Graph property.

So, we can combine metadata for Open Graph and Twitter, which can be summed up as below:

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@twitterhandle" />
<meta name="twitter:creator" content="@twitterhandle" />
```

You can read everything about [Twitter Cards from their website](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started).
