---
layout: post
title: "Makings custom vector maps 💫✏️"
category: programming
tags: [svg, gdal]
---
# Objective

To create a vector map of the island of Ireland (Republic of Ireland and
  Northern Ireland) with some cities.

# Geographic data

You can get the geographic data from [Natural Earth](https://www.naturalearthdata.com).
You can get vector files with different themes (culture, physical), different
topics (coastline, ocean, land), and different levels of detail
(1:10m 1:50m, 1:110m).

Because Northern Ireland is a sovereign state, part of Great Britain, we need
a map that includes administrative subunits, so we can filter later to only
include these 2 states. So, I will get choose from 1:10m Cultural Vectors: [Admin 0 - Details: Map subunits](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip) and [Populated Places](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip).

If you want to verify what you've downloaded, you
can use [mapshaper](http://mapshaper.org/) to view it in your
browser, by simply dropping the file onto the webpage and importing the files.

# Conversion tools

For Windows, you can install the geo tools from [OSGeo4W](https://trac.osgeo.org/osgeo4w/), which will take care of downloading
and installing everything you need to convert and manipulate the files you get
from Natural Earth. You can open up *OSGeo4W Shell* to use the command-line for conversion, or you can use QGIS Desktop that has been installed (GDAL vector Processing tool inside).

We create subunits.json with the sovereign units for Ireland and Northern
Ireland.

```
ogr2ogr -f GeoJSON -where "SU_A3 IN ('NIR', 'IRL')" -select "ADM0_A3, SU_A3, NAME_EN" subunits.json ne_10m_admin_0_map_subunits.shp
```

We create places.json for populated places in Ireland. The result is the 12
biggest cities.

```
ogr2ogr -f GeoJSON -where "SOV_A3 = 'IRL'" -select "ADM0_A3, SOV_A3, NAME_EN" places.json ne_10m_populated_places.shp
```

We can combine the 2 files and convert them to topojson. We get a countries layer (from subunits.json), and a places layer (from places.json).

```
geo2topo countries=subunits.json places.json > ireland.json
```

You can use [toposimplify](https://github.com/topojson/topojson-simplify/blob/master/README.md#toposimplify) to simplify the topology and reduce the file size. It did not work well
for me, I tried a few different parameters, and every time it did not come out
the way I wanted. I used mapshaper to do this instead and you can control how much detail you are happy with a slider to control it, seeing the results instantly.
I reduced the filesize from 130KB to 12KB with the simplification!

![mapshaper](/assets/img/blog/2018-06-10-maps/mapshaper.png)

# Result

Use D3.js to show the final result!

![final map](/assets/img/blog/2018-06-10-maps/result.png)

# References

- [Let’s Make a Map by Mike Bostock - this shows using older tools](https://bost.ocks.org/mike/map/)
- [Command-line cartography by Mike Bostock - using most recent tools but a bit more difficult to follow](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c)
