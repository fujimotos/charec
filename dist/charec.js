var charec;
(function (charec) {
    /**
     * Return the moving mean within the given window size.
     */
    var MovingAverage = (function () {
        function MovingAverage(windowSize) {
            if (windowSize === void 0) { windowSize = 5; }
            this.windowSize = windowSize;
            this.buffer = [];
            this.total = 0;
        }
        MovingAverage.prototype.push = function (input) {
            if (input === null) {
                return null;
            }
            var buffer = this.buffer;
            var windowSize = this.windowSize;
            buffer.push(input);
            if (buffer.length < windowSize) {
                return null;
            }
            else if (buffer.length > windowSize) {
                this.total += (input - buffer.shift());
            }
            else {
                this.total = charec.util.sum(buffer);
            }
            return this.total / windowSize;
        };
        return MovingAverage;
    })();
    charec.MovingAverage = MovingAverage;
})(charec || (charec = {}));
var charec;
(function (charec) {
    /**
     * Return the local maxima/minima.
     */
    var PeekFinder = (function () {
        function PeekFinder(threshold) {
            if (threshold === void 0) { threshold = 5; }
            this.threshold = threshold;
            this.buffer = [];
        }
        PeekFinder.prototype.push = function (input) {
            if (input === null) {
                return null;
            }
            var buffer = this.buffer;
            var threshold = this.threshold;
            var len = buffer.length;
            if (!len || Math.abs(buffer[len - 1] - input) > threshold) {
                buffer.push(input);
                if (buffer.length < 3) {
                    return null;
                }
                else if (buffer.length > 3) {
                    this.buffer.shift();
                }
                if (Math.max.apply(Math, buffer) == buffer[1]) {
                    return 1;
                }
                else if (Math.min.apply(Math, buffer) == buffer[1]) {
                    return -1;
                }
            }
            return null;
        };
        return PeekFinder;
    })();
    charec.PeekFinder = PeekFinder;
})(charec || (charec = {}));
/// <reference path="movingaverage.ts" />
/// <reference path="peekfinder.ts" />
var charec;
(function (charec) {
    var Encoder = (function () {
        function Encoder() {
            this.seq = '';
            this.avgX = new charec.MovingAverage();
            this.avgY = new charec.MovingAverage();
            this.peekX = new charec.PeekFinder();
            this.peekY = new charec.PeekFinder();
        }
        ;
        Encoder.prototype.finish = function () {
            return this.seq;
        };
        ;
        Encoder.prototype.feed = function (state) {
            switch (state.code) {
                case 'move':
                    this.feed_mv(state.x, state.y);
                    break;
                case 'up':
                    this.feed_u(state.x, state.y);
                    break;
                case 'down':
                    this.feed_d(state.x, state.y);
                    break;
            }
            ;
        };
        ;
        Encoder.prototype.feed_mv = function (x, y) {
            var px = this.peekX.push(this.avgX.push(x));
            var py = this.peekY.push(this.avgY.push(y));
            if (px !== null) {
                this.seq += px < 0 ? 'x' : 'X';
            }
            if (py !== null) {
                this.seq += py < 0 ? 'y' : 'Y';
            }
        };
        ;
        Encoder.prototype.feed_u = function (x, y) {
            this.seq += 'u';
        };
        ;
        Encoder.prototype.feed_d = function (x, y) {
            this.avgX = new charec.MovingAverage();
            this.avgY = new charec.MovingAverage();
            this.peekX = new charec.PeekFinder();
            this.peekY = new charec.PeekFinder();
            this.seq += 'd';
        };
        ;
        return Encoder;
    })();
    charec.Encoder = Encoder;
    ;
})(charec || (charec = {}));
var charec;
(function (charec) {
    var util;
    (function (util) {
        /**
         * Calculate the summation of an array.
         */
        function sum(array) {
            return array.reduce(function (a, b) {
                return a + b;
            });
        }
        util.sum = sum;
        ;
        /**
         * Get the current time (in epoch).
         */
        function now() {
            return (new Date()).getTime();
        }
        util.now = now;
        ;
        /**
         * Wagner-Fischer algorithm implemented in TypeScript.
         */
        function editdist(str1, str2) {
            var matrix = [];
            var i;
            var j;
            for (i = 0; i <= str1.length; i++) {
                matrix[i] = [i];
            }
            for (j = 0; j <= str2.length; j++) {
                matrix[0][j] = j;
            }
            for (j = 1; j <= str2.length; j++) {
                for (i = 1; i <= str1.length; i++) {
                    if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    }
                    else {
                        matrix[i][j] = Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) + 1;
                    }
                }
            }
            return matrix[i - 1][j - 1];
        }
        util.editdist = editdist;
    })(util = charec.util || (charec.util = {}));
})(charec || (charec = {}));
var charec;
(function (charec) {
    var model;
    (function (model) {
        model.numeric = {
            'du': 1,
            'dyu': 1,
            'dyXxYu': 2,
            'dXxYu': 2,
            'dyXxu': 2,
            'dXxYyXu': 3,
            'dXxXu': 3,
            'dyXxXu': 3,
            'dyXYxyXu': 3,
            'dyXxYyXYu': 3,
            'dyXxXYu': 3,
            'dxYudu': 4,
            'dxyu': 4,
            'dYudu': 4,
            'dyxu': 4,
            'dudYyXu': 5,
            'dxYXyu': 6,
            'dxYXu': 6,
            'dyXu': 7,
            'dxyXu': 7,
            'dyXudu': 7,
            'dXu': 7,
            'dyxXYxu': 8,
            'dxXYxXu': 8,
            'dyxYyXu': 9,
            'dyxYyu': 9,
            'dyxYudu': 9,
            'dxYyXu': 9
        };
    })(model = charec.model || (charec.model = {}));
})(charec || (charec = {}));
/// <reference path="encoder.ts" />
/// <reference path="util.ts" />
/// <reference path="model.ts" />
var charec;
(function (charec) {
    charec.DEBUG = 1;
    /**
     * Find the best matching character for the given stroke.
     */
    function findmatch(input) {
        var min = null;
        var result;
        if (charec.DEBUG) {
            console.log(":: input = " + input);
        }
        for (var stroke in charec.model.numeric) {
            var dist = charec.util.editdist(input, stroke);
            if (charec.DEBUG) {
                console.log({ target: charec.model.numeric[stroke], stroke: stroke, dist: dist });
            }
            if (min === null || dist < min) {
                min = dist;
                result = charec.model.numeric[stroke];
            }
        }
        if (charec.DEBUG) {
            console.log("result = " + result + " (dist = " + min + ")");
        }
        return result;
    }
    charec.findmatch = findmatch;
    /**
     * Entry point to bind charec to DOM elements.
     */
    function bind(canvas, output) {
        var encoder = new charec.Encoder();
        var context = canvas.getContext("2d");
        var isTracing = false;
        var prev;
        var current;
        canvas.addEventListener('mousemove', function (evt) {
            current = charec.util.now();
            if (isTracing && (!prev || current - prev > 20)) {
                var state = {
                    code: 'move',
                    x: evt.pageX - this.offsetLeft,
                    y: evt.pageY - this.offsetTop
                };
                encoder.feed(state);
                if (charec.DEBUG) {
                    console.log(state.code + "\t" + state.x + "\t" + state.y + "\t" + encoder.finish());
                }
                // Draw a tracing line on canvas.
                context.lineTo(state.x, state.y);
                context.stroke();
            }
        });
        canvas.addEventListener('mouseup', function (evt) {
            var state = {
                code: 'up',
                x: evt.pageX - this.offsetLeft,
                y: evt.pageY - this.offsetTop
            };
            encoder.feed(state);
            // End the drawing path.
            isTracing = false;
            // Show the best guess so far.
            var guess = findmatch(encoder.finish());
            output.innerHTML = "<span>" + guess + "</span>";
        });
        canvas.addEventListener('mousedown', function (evt) {
            var state = {
                code: 'down',
                x: evt.pageX - this.offsetLeft,
                y: evt.pageY - this.offsetTop
            };
            encoder.feed(state);
            // Start a new path.
            isTracing = true;
            context.beginPath();
            context.moveTo(state.x, state.y);
        });
    }
    charec.bind = bind;
})(charec || (charec = {}));
