charec
======

Charec is a minimalistic handwriting recognition program, written
in less than 300 lines of JavaScript.

Demo: http://ceptord.net/20191127-charec.html

How it works
------------

Charec uses Levenshtein distance to recognize handwriting. Here
is how it works:

 1. Charec captures the finger/mouse movement as a sorted array
    of XY coordinates.

 2. It compresses the array using some heuristics into a short
    string. This string represents the gist of the gesture.

 3. Then, it performs a nearest neighborhood search against the
    predefined models (using Levenshtein distance). It returns the
    model with the lowest score as the result.

For more details, please read the following note.

Why Levenshtein Distance?
-------------------------

The popular view of Levenshtein distance is that you can use it
to compute string similarity. If you input two strings, it will
return a number that shows how alike they are - the smaller, the
more similar. This function is useful for many linguistic tasks.

For instance, suppose you're trying to find the correct spelling
of a mistyped word. You feel the spelling is not exactly correct,
but not far off. In theory, you can iterate over pages of an
English dictionary to find out the correct spelling, but it is
rather tiresome to do so.

So instead, you ask computers to flip through an English dictionary.
Since computers do not have an innate understanding of "similarity",
you teach computers to use the Levenshtein distance, and tell it to
return the word with the most lowest score. The basic point here is
that Levenshtein distance works as a rough approximation of the
human perception of string similarity, and computers can easily
understand it.

So far, we talked nothing peculiar. Indeed, this is mostly how the
Levenshtein distance is used in real world, and I'd say there is
nothing particularly wrong with that view.

However, there is a more fun (albeit less common) view of
Levenshtein distance: To put it short, we can think of it as a
similarity metric for _everything_.

That is, it is a universal similarity metric that can measure the
similarity of any objects (e.g. images, graphs or handwritings).
The catch here is that you need to find some way to represent these
objects as strings (so that a Levenshtein Distance function can
work on them). If your string representation is reasonably good,
Levenshtein distance can act as a similarity metric for these
objects.

Here is how it typically goes like:

 (1) Take an object X that you want to measure the similarity.

 (2) Find some way to convert X into a sequence of characters.

 (3) Measure the Levenshtein distance.

 (4) Now you have similarity metrics for X.

This is essentially how charec works. It takes a set of strokes
traced by a pointer, and compare their similarity by passing them
to a Levenshtein distance function.

For encoding, I used the Schimke-Vielhauer-Dittman technique [1]
and it turned out to work surprisingly well.

References
----------

 1. Schimke, Sascha, Claus Vielhauer, and Jana Dittmann. "Using
    adapted levenshtein distance for on-line signature
    authentication." Proceedings of the 17th International
    Conference on Pattern Recognition, 2004. ICPR 2004.. Vol. 2.
    IEEE, 2004.
    http://zeus.fh-brandenburg.de/~vielhaue/jabreflib/[ScVD2004].pdf

LICENSE
-------

Public Domain
