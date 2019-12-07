charec
======

Charec is a minimalistic handwriting recognition program, written
in 229 lines of JavaScript.

Demo: http://ceptord.net/20191127-charec.html

How it works
------------

Charec identifies handwriting characters using
[Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance).


The standard theory of Levenshtein distance is that it is a measure of string
similarity. You have a pair of strings (maybe English words, DNA sequences
or whatever) that you want to know how alike they are, so you input them
to the edit distance function and get some distance metric. This is pretty
common stuff and nothing is wrong with that view.

A more interesting, albeit less common, view about Levenshtein distance is
that it's a universal measure of similarity. That is, it can measure the
similarity of _anything_ (e.g. images, languages or graphs) as long
as these things are encodable as strings. Here is how it typically goes
like:

 1. Take object X that you want to measure the similarity.
 2. Find some way to convert X into a sequence of characters.
 3. Measure the edit distance.
 4. Now you have similarity metrics for X.

This is essentially how charec works. It takes a set of strokes traced by
a mouse cursor, and compare their similarity by inputting them into
Levenshtein distance function. For encoding, I used the
Schimke-Vielhauer-Dittman technique
[(link)](https://scholar.google.com/scholar?cluster=2366365863084429505)
and it turned out to work surprisingly well.

LICENSE
-------

Public Domain
