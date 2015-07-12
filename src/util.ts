
module rechar.util {

    /**
     * Calculate the summation of an array.
     */
    export function sum(array: number[]): number {
        return array.reduce(function(a: number, b: number): number{
            return a + b;
        });
    };

    /**
     * Get the current time (in epoch).
     */
    export function now(): number {
        return (new Date()).getTime();
    };
}
