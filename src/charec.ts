/// <reference path="util.ts" />
/// <reference path="movingaverage.ts" />
/// <reference path="peekfinder.ts" />

module rechar {

    interface State {
        code: string;
        x?: number;
        y?: number;
    }

    export class Charec {
        private seq: string;
        private avgX: MovingAverage;
        private avgY: MovingAverage;
        private peekX: PeekFinder;
        private peekY: PeekFinder;
        
        constructor () {
            this.seq = '';
            this.avgX = new MovingAverage();
            this.avgY = new MovingAverage();
            this.peekX = new PeekFinder();
            this.peekY = new PeekFinder();
        };

        public finish () {
            return this.seq;
        };

        public feed (state: State) {
            switch (state.code){
                case 'move':
                    this.feed_mv(state.x, state.y);
                    break;
                case 'up':
                    this.feed_u();
                    break;
                case 'down':
                    this.feed_d();
                    break;
            };
        };

        private feed_mv (x: number, y: number) {
            var px = this.peekX.push(this.avgX.push(x));
            var py = this.peekY.push(this.avgY.push(y));
 
            if (px !== null){
                this.seq += px < 0 ? 'x' : 'X';
            }
            if (py !== null){
                this.seq += py < 0 ? 'y' : 'Y';
            };
        };

        private feed_u () {
            this.seq += 'u';
        };

        private feed_d () {
            this.seq += 'd';
        };
    };
}
