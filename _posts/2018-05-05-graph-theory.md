---
layout: post
title: "Graph theory "
category: algorithms
tags: [algorithms, "graph theory"]
published: false
---
A graph is a data structure which has a finite set of vertices (also called nodes), and edges, which are links from one vertex to another.

If the edges of a graph have a directional flow, the graph is directed, if a graph with edges that have no directional flow is undirected.

In mathematics, graphs are represented as G = (V, E), where V is the set of vertices, and E is the set of edges.


Simplest represetation is an edge list.

      [
        [1, 2],
        [2, 3],
        [3, 1]
      ]

O(E) time to find an edge, and requires O(E) amount of space.

An adjacency matrix is a matrix representation of exactly which nodes in a graph contain edges between them. The matrix is kind of like a lookup table: once we’ve determined the two nodes that we want to find an edge between, we look at the value at the intersection of those two nodes.

They are easy to follow. Lookup, insertion and removing an edge can be done in constant time O(1); but space is O(^2), which is very wasteful for graphs with fewer edges (sparse).

    [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]  
    ]

And that’s exactly what an adjacency list is — a hybrid between an edge list and an adjacency matrix. An adjacency list is an array of linked lists that serves as a representation of a graph, but also makes it easy to see which other vertices are adjacent to other vertices.

https://medium.com/basecs/from-theory-to-practice-representing-graphs-cfd782c5be38

https://medium.com/basecs/finding-the-shortest-path-with-a-little-help-from-dijkstra-613149fbdc8e
