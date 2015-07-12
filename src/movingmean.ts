module rechar {

    /**
     * A state machine to calculate the moving average.
     */
    export class MovingMean {
        private buffer: Array<number>;
        private total: number;
        
        constructor (public windowSize: number = 5) {
            this.clear();
        };

        /** (Re-)Initialize the internal state */
        public clear(): void {
            this.buffer = [];
            this.total = 0;
        };

        /** Feed a value to the state machine */
        public push(input: number): number {
            this.buffer.push(input);

            var winSize: number = this.windowSize;
            var bufLen: number = this.buffer.length;

            if (bufLen < winSize){
                return null;
            } else if (bufLen > winSize){
                var shifted: number = this.buffer.shift();
                this.total += input - shifted;
            } else {
                this.total = util.sum(this.buffer);
            }
            return this.total / winSize;
        };
    }
}
