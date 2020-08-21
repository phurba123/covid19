import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myJson'
})
export class MyJsonPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let allData:any[]=[];

    // loop through object properties to create array of objects
    for(let x in value)
    {
      allData.push({state:x,data:value[x]})
    }

    console.log(allData);
    return allData;
  }

}
