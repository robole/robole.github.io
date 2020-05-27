---
layout: post
title: "Pimp your blog: Create eye-catching rich snippets"
category: web
description: "Learn how to improve the metadata of your website to create eye-catching rich snippets"
image: "/assets/img/blog/2020-05-26-pimp-your-blog-metadata/banner.jpg"
tags: [HTML, metadata]
---

<img src="/assets/img/blog/2020-05-26-pimp-your-blog-metadata/banner.jpg" alt="social sharing" style="width:98%;max-width:1280px;margin:0 auto;"/>

Rich snippets are summaries of the content of a webpage, usually it shows: a headline, an image, a description, and the link to your webpage.

<img src="/assets/img/blog/2020-05-26-pimp-your-blog-metadata/twitter-card.jpg" alt="sharing my blog post on twitter" style="width:98%;max-width:1051px;margin:0 auto;"/>

Social media platforms created their own metadata specifications for rich snippets with the goal of helping web creators to advertise their content better. Search Engine results are also typically populated by the metadata you provide.

Metadata is information about your HTML page, it is generally the content contained in the `head` element of your page.

## Why bother?

- Eye-catching results: Drawing a user's attention to your content can improve engagement on social platforms.
- Potential click-through rate (CTR) increase: By providing a more specific and interesting preview of your content, you can encourage users to visit your page.
- Potential improvements in your page rankings: Search engines typically rank webpages higher when they are referenced by other websites (as hyperlinks), by attracting more people to your content, you can increase your chances of people referencing your webpage.

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
  <meta property="article:section" content="Technology" />
  <meta property="article:published_time" content="2020-04-24T14:54:50+00:00" />
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

The _title_ element sets the page’s title. In Search Engine Results Pages (<abbr>SERP</abbr>s), this is usually the headline of a result. You should have a _title_ for every page!

### The Meta Element

The meta element is the generic metadata element that covers a wide array of metadata.

#### Using the name and content attributes

We can use the _name_ and _content_ attributes as name-value pairs to declare our metadata.

- **_name="author"_**: Declares the author of the page. You can only declare one author.
- **_name="description"_**: Describes the content of the page, and is often used as the description by search engines in their results. Keeping it to 150 characters is a good rule of thumb as the text is usually truncated around that point.

### Metadata for Social Media Platforms

#### Open Graph

Facebook’s Open Graph allows you to specify how your content is displayed on a user’s timeline. Without these tags, the Facebook Crawler uses internal heuristics to make a best guess about the title, description, and image for your content.

<img src="/assets/img/blog/2020-05-26-pimp-your-blog-metadata/facebook.jpg" alt="sharing on facebook" style="display:block;width:98%;max-width:669px;margin:0 auto;"/>

Open Graph is used by the following Social Media platforms:

- Facebook
- Instagram
- Twitter
- Pinterest
- LinkedIn

Open Graph specifies the use of the _property_ and _content_ attributes, which deviates from the HTML standard of using _name_ and _content_. 🙄

<table>
<caption style="visibility:hidden;">Table outlining the key Open Graph metadata properties</caption>
<thead>
  <tr>
    <th>Property Name</th>
    <th>Description</th>
    <th>Value permitted for content attribute</th>
  </tr>
</thead>
<tbody>
<tr>
    <td>og:url</td>
    <td>The canonical URL for your page.</td>
    <td>This should be the URL without session variables, and parameters.</td>
</tr>
<tr>
    <td>og:title</td>
    <td>The title of your page.</td>
    <td>String. Use same value as <code>title</code> element.</td>
</tr>
<tr>
    <td>og:description</td>
    <td>A brief description of the content.</td>
    <td>String. Use same value as <code><meta name="description" .. /></code>.</td>
  </tr>
  <tr>
    <td>og:image</td>
    <td>The URL of the image that appears when someone shares the content to Facebook.<br><br><strong>Use images that are at least 1080 pixels in width for best display on high resolution devices. At the minimum, you should use images that are 600 pixels in width to display image link ads.</strong></td>
    <td>URL of image.</td>
  </tr>
  <tr>
    <td>fb:app_id</td>
    <td>In order to use Facebook Insights you must add the app ID to your page.</td>
    <td>String</td>
  </tr>
  <tr>
    <td>og:type</td>
    <td>The type of media of your content. This tag impacts how your content shows up in the News Feed. If you don't specify a type,the default is website.</td>
    <td>Here is the <a href="https://ogp.me/#types">full list of types</a>.<br><br>Some values are:<br> - article <br>- book<br> - website<br> - music<br> - video</td>
  </tr>
  <tr>
    <td>og:locale</td>
    <td>The locale of the resource. Defaults to en_US.</td>
    <td>Languages use the format <i>ll_CC</i>, where <i>ll</i> is a two-letter language code, and <i>CC</i> is a two-letter country code.</td>
  </tr>
  <tr>
    <td>article:published_time</td>
    <td>When the article was first published.</td>
    <td>datetime</td>
  </tr>
  <tr>
    <td>article:modified_time</td>
    <td>When the article was last changed.</td>
    <td>datetime</td>
  </tr>
  <tr>
    <td>article:expiration_time</td>
    <td>When the article is out of date.</td>
    <td>datetime</td>
  </tr>
  <tr>
    <td>article:author</td>
    <td>Writers of the article.</td>
    <td>Profile array</td>
  </tr>
  <tr>
    <td>article:section</td>
    <td>A high-level section name e.g Technology.</td>
    <td>string</td>
  </tr>
  <tr>
    <td>article:tag</td>
    <td>Tags associated with this article.</td>
    <td>string array</td>
  </tr>
</tbody>
</table>
<br>

A typical blog post can be marked as below:

```html
<head>
  <meta
    property="og:url"
    content="https://roboleary.net/programming/2020/04/24/pimp-blog-reading-time.html"
  />
  <meta property="og:type" content="article" />
  <meta property="article:section" content="Technology" />
  <meta property="article:published_time" content="2020-04-24T14:54:50+00:00" />
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

To see how your markup appears to the Facebook Crawler, you can preview and debug it through the [Sharing Debugger](https://developers.facebook.com/tools/debug/).

These tags can also enable you to track traffic statistics on [Facebook Insights](https://developers.facebook.com/docs/sharing/referral-insights), Facebook's analytics suite. You must include `<meta property="fb:app_id" value=".." />` in your page to use it.

You can read more about [the specification for Open Graph here](https://developers.facebook.com/docs/sharing/webmasters#markup).

#### Twitter

Twitter calls its rich snippets _Twitter Cards_.

> Twitter Cards are customizable media units that advertisers can use to drive traffic to their website or mobile app.

<img src="/assets/img/blog/2020-05-26-pimp-your-blog-metadata/twitter-card.jpg" alt="sharing my blog post on twitter" style="width:98%;max-width:1051px;margin:0 auto;"/>

Twitter's metadata is similar to Open Graph, it is based on the same conventions. When using Open Graph to describe data on a page, it is easy to generate a Twitter Card without duplicating the elements and data. When the Twitter card processor looks at the metadata on a page, it first checks for the Twitter-specific properties, if they are not present, it falls back to the equivalent Open Graph property.

<table>
<caption style="visibility:hidden;">Table outlining the key Open Graph metadata properties</caption>
<thead>
  <tr>
    <th>Property Name</th>
    <th>Description</th>
    <th>Value permitted for content attribute</th>
  </tr>
</thead>
<tbody>
<tr>
    <td>twitter:card</td>
    <td>The card type.<br><br>Only one card type per-page is supported. If more than one value exists in the page, the last one in sequence will take priority.</td>
    <td>One of the values:
<br>- <strong>summary</strong>: Twitter’s “default” card. It includes: a title, a description, a thumbnail image, Twitter account attribution, and a direct link to the content. These are great for blog posts!<br>
- <strong>summary_large_image</strong>: This card has all the same features of a *summary* card, but has a large image.<br>
- <strong>app</strong><br>
- <strong>player</strong></td>
  </tr>
  <tr>
    <td>twitter:site</td>
    <td>The Twitter account for the website or platform on which the content was published.@username for the website used in the card footer.</td>
    <td>@username</td>
  </tr>
  <tr>
    <td>twitter:creator</td>
    <td>The individual user that created the content within the card.</td>
    <td>@username</td>
  </tr>
</tbody>
</table>
<br>

So, if we have already provided the Open Graph metadata, the only additional metadata to add is below:

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@twitterhandle" />
<meta name="twitter:creator" content="@twitterhandle" />
```

You can read more about [Twitter Cards here](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started).

## Final Words

It does not require much effort to include metadata for rich snippets, and it can prove worthwhile if you want to grow your audience.

You should try to choose an interesting and distinctive image for each blog post to stand out. Try to use an image that is at least 1080 pixels wide and is less than 1MB, so it looks good on all screen resolutions.

If you are using a static-site generator, there should be a simple way to populate the metadata fields using variables. If you use Jekyll, you can read [this article](https://blog.webjeda.com/optimize-jekyll-seo/#5-connecting-with-social-media) to find out what global variables and Front Matter you can use to populate the metadata.
