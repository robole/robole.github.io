---
layout: post
title: "Does Crossfilter.js make a happy filter? 💫✏️"
category: web
tags: [javascript]
---

[Crossfilter](https://square.github.io/crossfilter/) is for doing fast multi-dimensional filtering on big datasets.

It is regularly used with D3 for creating co-ordinated charts based on the same dataset. This is what lead me to it anyway.

[This tutorial](http://animateddata.co.uk/articles/crossfilter/) was the most useful I found that was example-led, and didn't overdo it. But there was some blank spots in the explanations.

I wanted to look at journey routes for Ireland from this csv file.

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

A dimension is what fields you want to examine your dataset by. You can apply a filter to it based on values, or you can write a custom function.

## Single value filter

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

When looking at results of the filter, you can use ```top()``` and ```bottom()``` to control the number of items in the result set by providing a number as a parameter e.g. ```top(Infinity)``` shows everything.

## Multiple value filter

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

## Aggregate Dimension

So if I want to find any route going to or from "Cork", it would be cool to have a
origin-destination dimension and search in that. We can do this! :-D

```javascript
var cf = crossfilter(data);
var originDestinationDimension = cf.dimension(function(d) {return d.origin + '-' + d.destination;});
originDestinationDimension.filter(function(d){
  if(d.indexOf("Cork") >= 0){
    return d;
  }
});
var results = originDestinationDimension.top(Infinity);
```

**results=**
```
0,Cork,Dublin,180,18
1,Cork,Tralee,90,10
2,Cork,Limerick,90,10
3,Galway,Cork,120,15
```

## Filters are cumulative

If you apply filters on different dimensions, the filters are applied to the dataset, so when you retrieve results from any dimension, you get the cumulative result. Here I apply 2 filters: retrieve *origin* or *destination* of "Cork", exclude *id* of 0, and I get 3 items based on them.

```javascript
var cf = crossfilter(data);
var originDestinationDimension = cf.dimension(function(d) {return d.origin + '-' + d.destination;});
var idDim = cf.dimension(function(d){ return d.id;});

originDestinationDimension.filter(function(d){
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

I won't go into it as I think the tutorial I mentioned already covers it well, but there are functions for getting totals based on your filters.

# Conclusion

It looks like a worthwhile library for allowing filtering in the browser. I will use in a project and report back!
