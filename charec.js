/**
 * Return the sum of values in an array.
 *
 * @param {Array} arr An array of numbers.
 * @return {Number}
 */
function sum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

/**
 * Calculate the Levenshten distance (Wagner-Fischer)
 *
 * @param {String} str1 An input string.
 * @param {String} str2 An input string.
 * @return {Number}
 */
function editdist(str1, str2) {
    var i, j;
    var matrix = [];

    for (i = 0; i <= str1.length; i++) {
        matrix[i] = [i];
    }
    for (j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    for (j = 0; j < str2.length; j++) {
        for (i = 0; i < str1.length; i++) {
            if (str1.charAt(i) === str2.charAt(j)) {
                matrix[i + 1][j + 1] = matrix[i][j];
            } else {
                matrix[i + 1][j + 1] = Math.min(
                    matrix[i][j + 1],
                    matrix[i + 1][j],
                    matrix[i][j]
                ) + 1;
            }
        }
    }
    return matrix[i - 1][j - 1];
}

/**
 * Compute the moving average of a sequence.
 *
 * @param {Array} arr An array of numbers.
 * @param {Number} size The window size
 * @return {Array}
 */
function movingAverage(arr, size) {
    var tmp = sum(arr.slice(0, size));
    var res = [tmp / size];
    for (var i = size; i < arr.length; i++) {
        tmp += arr[i] - arr[i - size];
        res.push(tmp / size);
    }
    return res;
}

/**
 * Check if the sequence has a local maximum or minimum.
 *
 * @param {Number} head The left point.
 * @param {Number} mid  The middle point.
 * @param {Number} tail The right point.
 * @return {Number}
 */
function findpeek(head, mid, tail) {
    if (arguments.length !== 3) return 0;

    if (head < mid && mid > tail) {
        return 1;
    }
    if (head > mid && mid < tail) {
        return 2;
    }
    return 0;
}

/**
 * Predefined strokes for each signature.
 * @const
 */
var MODEL = {
    'du' : 1,
    'dyu': 1,
    'dyXxYu' : 2,
    'dXxYu' : 2,
    'dyXxu' : 2,
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

/**
 * Class for processing handwritten signatures.
 *
 * @param {HTMLCanvasElement} $canvas The area to draw a character.
 * @param {HTMLElement} $output An element to display the guessed result.
 * @param {HTMLElement} $reset A reset button.
 * @constructor
 */
function Charlec($canvas, $output, $reset) {
    this.$canvas = $canvas;
    this.$output = $output;
    this.$reset = $reset;
    this.ctx = $canvas.getContext('2d');
    this.init();
    this.reset();
}

Charlec.prototype = {

    THRESHOLD: 10,

    MOVINGAVG: 5,

    init: function() {
        var onUp = this.onUp.bind(this);
        var onDown = this.onDown.bind(this);
        var onMove = this.onMove.bind(this);
        var touchopt = {passive: false};

        this.$canvas.addEventListener('mousedown', onDown);
        this.$canvas.addEventListener('mouseup', onUp);
        this.$canvas.addEventListener('mousemove', onMove);

        this.$canvas.addEventListener('touchstart', onDown, touchopt);
        this.$canvas.addEventListener('touchend', onUp, touchopt);
        this.$canvas.addEventListener('touchmove', onMove, touchopt);

        this.$reset.addEventListener('click', this.reset.bind(this));
    },

    reset: function() {
        this.res = '';
        this.traced = false;
        this.touchid = null;
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.$output.innerText = '';
    },

    istouch: function(evt) {
        return window.TouchEvent && (evt instanceof window.TouchEvent);
    },

    touchhandling: function() {
        return this.touchid !== null;
    },

    findtouch: function(touchevent) {
        for (i = 0; i < touchevent.changedTouches.length; i++) {
            var touch = touchevent.changedTouches.item(i);
            if (touch.identifier === this.touchid)
                return touch;
        }
    },

    onDown: function(evt) {
        if (this.istouch(evt)) {
            if (this.touchhandling()) return;
            evt.preventDefault();
            evt = evt.changedTouches[0];
            this.touchid = evt.identifier;
        }
        this.traced = true;

        var x = evt.pageX - this.$canvas.offsetLeft;
        var y = evt.pageY - this.$canvas.offsetTop;

        this.res += 'd';
        this.dataX = [x];
        this.dataY = [y];

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    },

    onUp: function(evt) {
        if (this.istouch(evt)) {
            evt.preventDefault();
            evt = this.findtouch(evt);
            if (!evt) return;
        }
        this.touchid = null;
        this.traced = false;

        this.res += this.encode();
        this.res += 'u';
        this.$output.innerText = this.guess();
    },

    onMove: function(evt) {
        if (!this.traced) return;
        if (this.istouch(evt)) {
            evt.preventDefault();
            evt = this.findtouch(evt);
            if (!evt) return;
        }

        var x = evt.pageX - this.$canvas.offsetLeft;
        var y = evt.pageY - this.$canvas.offsetTop;

        this.dataX.push(x);
        this.dataY.push(y);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    },

    encode: function() {
        var dataX = movingAverage(this.dataX, this.MOVINGAVG);
        var dataY = movingAverage(this.dataY, this.MOVINGAVG);

        var res = '';
        var bufX = [dataX[0]];
        var bufY = [dataY[0]];

        for (var i = 0; i < dataX.length; i++) {
            var deltaX = Math.abs(bufX[bufX.length - 1] - dataX[i]);
            var deltaY = Math.abs(bufY[bufY.length - 1] - dataY[i]);

            if (deltaX >= this.THRESHOLD) {
                bufX.push(dataX[i]);
                res += ['', 'X', 'x'][findpeek.apply(null, bufX.slice(-3))];
            }
            if (deltaY >= this.THRESHOLD) {
                bufY.push(dataY[i]);
                res += ['', 'Y', 'y'][findpeek.apply(null, bufY.slice(-3))];
            }
        }
        return res;
    },

    guess: function() {
        var res, str, dist, min = null;
        for (str in MODEL) {
            dist = editdist(this.res, str);

            if (min === null || dist < min) {
                min = dist;
                res = MODEL[str];
            }
        }
        return res;
    },
};
