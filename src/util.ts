module charec.util {

    /**
     * Calculate the summation of an array.
     */
    export function sum(array: number[]): number {
        return array.reduce(function(a: number, b: number): number{
            return a + b;
        });
    };

    /**
     * Wagner-Fischer algorithm implemented in TypeScript.
     */
    export function editdist(str1: string, str2: string){

        var matrix: number[][] = [];
        var i: number;
        var j: number;

        for (i = 0; i <= str1.length; i++){
            matrix[i] = [i];
        }
        for (j = 0; j <= str2.length; j++){
            matrix[0][j] = j;
        }

        for (j = 1; j <= str2.length; j++){
            for (i = 1; i <= str1.length; i++){
                if (str1.charAt(i-1) === str2.charAt(j-1)){
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i-1][j],
                        matrix[i][j-1],
                        matrix[i-1][j-1]
                    ) + 1;
                }
            }
        }
        return matrix[i-1][j-1];
    }
}
