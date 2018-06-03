---
layout: post
title: "Interactive filtering in the browser with Crossfilter and D3 💫✏️"
category: data visualization
tags: [javascript, data visualization, d3, crossfilter]
---

[Crossfilter](https://square.github.io/crossfilter/) can perform fast multi-dimensional filtering on big datasets. It claims to work well on 1 million rows and more!

It is regularly used with D3 for creating co-ordinated charts based on the same dataset. This is what lead me to it!

[This tutorial](http://animateddata.co.uk/articles/crossfilter/) was the most useful I found that was example-led. But there was some blank spots in the explanations that I had to find in the [API](https://github.com/square/crossfilter/wiki/API-Reference), which is well-written.

I wanted to look at a dataset of travel routes in Ireland to discover how to use it properly with D3.

```
id,origin,destination,journey_time,daily_frequency
0,Cork,Dublin,180,18
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
3,Galway,Cork,120,15
4,Galway,Roscommon,60,6
5,Roscommon,Sligo,45,4
```

# Dimensions and Filters

A *dimension* is whatever fields you want to examine your dataset by. You can apply a filter to a dimension providing a value, a range of values, or you can write a custom filter function.

You can explore the code here to see a working example of what is explained below.

<p data-height="265" data-theme-id="0" data-slug-hash="qKOGvg" data-default-tab="result" data-user="robjoeol" data-embed-version="2" data-pen-title="Filter dataset with crossfilter.js" class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/qKOGvg/">Filter dataset with crossfilter.js</a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Single value filter (origin = "Cork")

So if I want to look at my routes by the *origin*, where I want routes with an *origin* of "Cork" only, I would do the following:

```javascript
var cf = crossfilter(data);
var originDim = cf.dimension(function(d) { return d.origin; });
originDim.filter("Cork");
var results = idDim.top(Infinity));
```

**results =**
```
0,Cork,Dublin,180,18
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
```

When looking at results of the filter, you can use ```top(k)``` and ```bottom(k)``` to control the number of items in the result set by providing a number as a parameter,  ```top(Infinity)``` shows everything.

## Multiple value filter (origin = "Cork" OR "Roscommon")

To find an *origin* of "Cork" OR "Roscommon":

```javascript
var cf = crossfilter(data);
var originDim = cf.dimension(function(d) { return d.origin; });
originDim.filter(["Cork", "Roscommon"]);
var results = idDim.top(Infinity));
```

**results=**
```
0,Cork,Dublin,180,18
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
5,Roscommon,Sligo,45,4
```

## Composite Dimension

So if I want to find any route where "Cork" is the *origin* or the *destination*, it would be cool if I could make a origin-destination dimension and search in that. We can do this! :-D

```javascript
var cf = crossfilter(data);
var originDestinationDim = cf.dimension(function(d) {return d.origin + '-' + d.destination;});
originDestinationDim.filter(function(d){
  if(d.indexOf("Cork") >= 0){
    return d;
  }
});
var results = originDestinationDim.top(Infinity);
```

**results=**
```
0,Cork,Dublin,180,18
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
3,Galway,Cork,120,15
```

## Filters are cumulative

If you apply filters on different dimensions, the filters are applied to the dataset, so when you retrieve results from any dimension, you get the cumulative result. Here I apply 2 filters: *origin* or *destination* of "Cork", and exclude the *id* of 0, and I get 3 items based on them from the *idDim*.

```javascript
var cf = crossfilter(data);
var originDestinationDim = cf.dimension(function(d) {return d.origin + '-' + d.destination;});
var idDim = cf.dimension(function(d){ return d.id;});

originDestinationDim.filter(function(d){
  if(d.indexOf("Cork") >= 0){
    return d;
  }
});
idDim.filter(function(d){return d != 0});
var results = idDim.top(Infinity));
```

**results=**
```
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
3,Galway,Cork,120,15
```

# Aggregate Functions

Crossfilter offers a lot more for aggregating data if you want counts and totals. I won't go into it as my focus was on filtering, and using it in conjunction with D3.

# Conclusion

It looks like a worthwhile library. I will use in a project and report back on it's success (I hope)!

# References

[Crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference)
