charec
======

A simple handwriting recognition in JavaScript.

Demo: http://fujimotos.github.io/charec/

How it works
------------

In [a paper published in 2004](https://scholar.google.com/scholar?cluster=2366365863084429505), Schimke, Vielhauer and Dittmann proposed a technique to encode a series of asynchronous events into a string. Their target problem was *"online signature authentication"*, i.e. to authenticate users with handwriting signatures electronically. To put it very shortly, they tried to serialize the various pen input features (position, pressures, and velocities etc.) into a string, and then, do a nearest neighbour search on the signature database.

I applied the Schimke-Vielhauer-Dittman technique to a different problem domain: "handwriting recognition". Using DOM mouse events as inputs, I encode the descrete stream of events into a string like 'dXyYudu' (as proposed in their paper).


Screencast
----------

![Screencast](http://fujimotos.github.io/charec/img/charec_screencast.gif)


License
-------

MIT License (See LICENSE for details)
