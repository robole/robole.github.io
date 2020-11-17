---
layout: scrollable_post
title: "Making your own custom vector maps 💻"
category: programming
tags: [svg, gdal, maps, mapshaper]
published: false
---
# Objective

To create a vector map of the island of Ireland (Republic of Ireland and
  Northern Ireland) with some cities.

# Geographic data

You can get the geographic data from [Natural Earth](https://www.naturalearthdata.com).
You can get vector files with different themes (culture, physical), different
topics (coastline, ocean, land), and different levels of detail
(1:10m 1:50m, 1:110m).

Because Northern Ireland is a sovereign state, it is part of Great Britain, we need
a map that includes administrative subunits, so we can filter by the subunits later to only
include these 2 sovereign state. I will go for the maximum detail (1:10m), so I will go to 1:10m Cultural Vectors: [Admin 0 - Details: Map subunits](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip). I will also download [Populated Places](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip) and extract some cities.

If you want to verify what you've downloaded, you
can use [mapshaper](http://mapshaper.org/) to view it in your
browser, by simply dropping the file onto the webpage and then importing the files. It is a quick way to see the differences if you are not sure about what you're getting!

# Conversion tools

For Windows, you can install the geo tools from [OSGeo4W](https://trac.osgeo.org/osgeo4w/), which will take care of downloading
and installing everything you need to convert and manipulate the files you get from Natural Earth. You can open up *OSGeo4W Shell* to use the command-line for conversion; or you can use QGIS Desktop that has been installed, and use the GDAL Vector Processing tool inside.

I will do it on the command-line. I will create *subunits.json* that has the sovereign units for Ireland and Northern Ireland. We also filter the
fields to include using *-select* switch, the Natural Earth files have many fields that we are not using, so we can exclude the majority of them.

```
ogr2ogr -f GeoJSON -where "SU_A3 IN ('NIR', 'IRL')" -select "ADM0_A3, SU_A3, NAME_EN" subunits.json ne_10m_admin_0_map_subunits.shp
```

We create places.json for populated places in Ireland. The result is the 15 biggest cities.

```
ogr2ogr -f GeoJSON -where "SOV_A3 = 'IRL'" -select "ADM0_A3, SOV_A3, NAME_EN" places.json ne_10m_populated_places.shp
```

We can combine the 2 files and convert them to topojson. We get a "countries" layer (from subunits.json), and a "places" layer (from places.json).

```
geo2topo countries=subunits.json places.json > ireland.json
```

You can use [toposimplify](https://github.com/topojson/topojson-simplify/blob/master/README.md#toposimplify) to simplify the topology and reduce the file size. It did not work well for me, I tried a few different parameters, and every time it did not come out the way I wanted. I used mapshaper to do this instead and you can control how much detail you want with a slider, and see the results instantly. I reduced the filesize from 130KB to 12KB with the simplification, which is incredible!

![mapshaper](/assets/img/blog/2018-06-10-maps/mapshaper.png)

# Result

Use D3.js to show the final result! You can read [Mike Bostock's tutorial](https://bost.ocks.org/mike/map/) to learn more on that.

<p data-height="578" data-theme-id="light" data-slug-hash="qKReXy" data-default-tab="result" data-user="robjoeol" data-embed-version="2" data-pen-title="SVG map of Ireland with cities " class="codepen">See the Pen <a href="https://codepen.io/robjoeol/pen/qKReXy/">SVG map of Ireland with cities </a> by rob (<a href="https://codepen.io/robjoeol">@robjoeol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# References

- [Let’s Make a Map by Mike Bostock](https://bost.ocks.org/mike/map/) : - this shows how to prepare the resources well, but uses older topojson v1.
- [Command-line cartography by Mike Bostock](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) - specific to california for resources, uses topojson v2 for conversion.
