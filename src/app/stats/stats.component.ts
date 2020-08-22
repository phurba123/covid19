import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public covidData:any;
  public indiaData:any;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['total', 'today'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];

  constructor(private app:AppService) { }

  ngOnInit() {

    this.getAllIndiaData();
    this.getCovidData();
  }

  private getAllIndiaData()
  {
    this.app.getIndiaData().subscribe((res)=>
    {
      console.log(res)
      this.indiaData=res;

      this.setBarChartData();
    })
  }

  private setBarChartData()
  {
    this.barChartData= [
      { data: [this.indiaData.activeCases, this.indiaData.activeCasesNew], label: 'active' },
      { data: [this.indiaData.deaths, this.indiaData.deathsNew], label: 'deaths' },
      { data: [this.indiaData.recovered, this.indiaData.recoveredNew], label: 'recovered' }
    ];

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
