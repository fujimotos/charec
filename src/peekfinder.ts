module charec {

    /**
     * Return the local maxima/minima.
     */
    export class PeekFinder {
        private buffer: Array<number>;

        constructor (public threshold: number = 5) {
            this.buffer = [];
        }

        public push(input: number): number {
            if (input === null){
                return null;
            }

            var buffer: number[] = this.buffer;
            var threshold: number = this.threshold;
            var len: number = buffer.length;

            if (!len || Math.abs(buffer[len-1] - input) > threshold){
                buffer.push(input)

                if (buffer.length < 3){
                    return null;
                } else if (buffer.length > 3){
                    this.buffer.shift();
                }

                if (Math.max(...buffer) == buffer[1]){
                    return 1;
                } else if (Math.min(...buffer) == buffer[1]){
                    return -1;
                }
            }
            return null;
        }
    }
}
