charec
======

A simple handwriting recognition in JavaScript.

Demo: http://fujimotos.github.io/charec/

Screenshot
----------

![Screenshot](http://fujimotos.github.io/charec/img/charec_screenshot.png)


How it works
------------

In [a paper published in 2004](https://scholar.google.com/scholar?cluster=2366365863084429505), Schimke, Vielhauer and Dittmann proposed a technique to encode a series of asynchronous events into a single string. Their target problem was "online signature authentication", that is, to authenticate users with handwriting signatures electronically. To put it very shortly, they tried to code the various pen input features (position, pressures, and velocities etc.) into a string and do a nearest neighbour search on the signature database.

Charec applies their technique to the problem of handwriting recognition.

License
-------

MIT License (See LICENSE for details)
