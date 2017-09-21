import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'buildArray'
})
export class BuildArrayPipe implements PipeTransform {
    transform(value: Array<any>, count: number = 3) : any {
        // count = Math.ceil(value.length / count);
        let counter = 0;
        let result =  value.reduce( function( prev, current, index) {
            if (index % count === 0) {
                prev.push({});
                counter = 0;
            }

            prev[prev.length - 1][counter++] = current;
            return prev;
        }, []);

        return result;
    }
}