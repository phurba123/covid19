import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public covidData:any;

  constructor(private app:AppService) { }

  ngOnInit() {
    this.getCovidData();
  }

  public getCovidData()
  {

    // subscribing to returned observable by http client for data's
    this.app.getCovidDatas().subscribe((res)=>
    {
      console.log(res);
      this.covidData=res
    },
    (err)=>
    {
      console.log(err)
    })
  }

}
