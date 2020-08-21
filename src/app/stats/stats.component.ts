import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

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
    this.app.getCovidDatas().subscribe((res)=>
    {
      console.log(res)
    })
  }

}
