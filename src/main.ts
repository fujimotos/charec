/// <reference path="encoder.ts" />
/// <reference path="util.ts" />
/// <reference path="model.ts" />

module charec {

    export var DEBUG = 1;

    /**
     * Find the best matching character for the given stroke.
     */
    export function findmatch (input: string): number {
        var min: number = null;
        var result: number;

        if (DEBUG){
            console.log(`:: input = ${input}`);
        }

        for (var stroke in model.numeric){
            var dist: number = util.editdist(input, stroke)

            if (DEBUG){
                console.log({target: model.numeric[stroke], stroke: stroke, dist: dist});
            }

            if (min === null || dist < min){
                min = dist;
                result = model.numeric[stroke];
            }
        }

        if (DEBUG){
            console.log(`result = ${result} (dist = ${min})`);
        }
        return result;
    }

    /**
     * Entry point to bind charec to DOM elements.
     */
    export function bind (canvas: HTMLCanvasElement, output: HTMLElement){

        var encoder: Encoder = new Encoder();

        var context = <CanvasRenderingContext2D> canvas.getContext("2d");
        var isTracing: Boolean = false;

        canvas.addEventListener('mousemove', function(evt: MouseEvent){
            if (isTracing){
                var state: EventState = {
                    code: 'move',
                    x: evt.pageX - this.offsetLeft,
                    y: evt.pageY - this.offsetTop
                }
                encoder.feed(state);

                if (DEBUG){
                    console.log(`${state.code}\t${state.x}\t${state.y}\t${encoder.finish()}`);
                }

                // Draw a tracing line on canvas.
                context.lineTo(state.x, state.y);
                context.stroke();
            }
        });

        canvas.addEventListener('mouseup', function(evt: MouseEvent){
            var state: EventState = {
                code: 'up',
                x: evt.pageX - this.offsetLeft,
                y: evt.pageY - this.offsetTop
            }
            encoder.feed(state);

            // End the drawing path.
            isTracing = false;

            // Show the best guess so far.
            var guess: number = findmatch(encoder.finish())
            output.innerHTML = `<span>${guess}</span>`;
        });

        canvas.addEventListener('mousedown', function(evt: MouseEvent){
            var state: EventState = {
                code: 'down',
                x: evt.pageX - this.offsetLeft,
                y: evt.pageY - this.offsetTop
            }
            encoder.feed(state);

            // Start a new path.
            isTracing = true;
            context.beginPath();
            context.moveTo(state.x, state.y);
        });
    }
}
