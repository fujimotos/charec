module rechar {

    /**
     * A state machine to find the local extrema.
     */
    export class PeekFinder {
        private buffer: Array<number>;

        constructor () {
            this.clear();
        };

        public clear(): void {
            this.buffer = [];
        };

        public push(input: number): number {
            if (input !== null){
                this.buffer.push(input);

                if (this.buffer.length < 3){
                    return 0;
                } else if (this.buffer.length > 3){
                    this.buffer.shift();
                }

                var [a, b, c] = this.buffer;

                if (a <= b && b > c){
                    return 1;
                }
                if (a >= b && b < c){
                    return -1;
                }
            }
            return 0;
        };
    }
}
