module charec {

    /**
     * Return the moving mean within the given window size.
     */
    export class MovingAverage {
        private buffer: Array<number>;
        private total: number;
        
        constructor (public windowSize: number = 5) {
            this.buffer = [];
            this.total = 0;
        }

        public push(input: number): number {
            if (input === null){
                return null;
            }

            var buffer = this.buffer;
            var windowSize = this.windowSize;

            buffer.push(input);

            if (buffer.length < windowSize){
                return null;
            } else if (buffer.length > windowSize){
                this.total += (input - buffer.shift());
            } else {
                this.total = util.sum(buffer);
            }

            return this.total / windowSize;
        }
    }
}
