import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Observable } from 'rxjs'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public covidData: any;
  public indiaData: any;

  public currentStateSelected: any;
  public currentStateData: any;
  public currentStateDistricts: any[] = [];

  public currentDistrictSelected: any;
  public currentDistrictName: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['total', 'today'];
  public barChartLabelsDistrict: Label[] = ['total'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];
  public barChartState: ChartDataSets[];
  public barChartDistrict: ChartDataSets[];

  constructor(private app: AppService) { }

  ngOnInit() {

    this.getAllIndiaData();
    this.getCovidData();
  }

  private getAllIndiaData() {
    this.app.getIndiaData().subscribe((res) => {
      // console.log(res)
      this.indiaData = res;

      this.setBarChartData();

      // by defalult set currently selected state to first state in array
      this.currentStateSelected = res['regionData'][0]['region']
      this.currentStateData = res['regionData'][0];
      this.setStateBarChart(this.currentStateData);

      this.getCurrentStateDistricts(this.currentStateSelected)
    })
  }

  private setBarChartData() {
    // set bar chart data of current state
    this.barChartData = [
      { data: [this.indiaData.activeCases, this.indiaData.activeCasesNew], label: 'active' },
      { data: [this.indiaData.deaths, this.indiaData.deathsNew], label: 'deaths' },
      { data: [this.indiaData.recovered, this.indiaData.recoveredNew], label: 'recovered' }
    ];

  }

  private setStateBarChart(currentState) {
    this.barChartState = [
      { data: [currentState.totalInfected, currentState.newInfected], label: 'active' },
      { data: [currentState.deceased, currentState.newDeceased], label: 'deaths' },
      { data: [currentState.recovered, currentState.newRecovered], label: 'recovered' }
    ]
  }

  public getCovidData() {

    // subscribing to returned observable by http client for data's
    this.app.getCovidDatas().subscribe((res) => {
      // console.log(res);
      this.covidData = res
    },
      (err) => {
        console.log(err)
      })
  }

  // fired when state option is selected
  public stateSelected() {
    // console.log(this.currentStateSelected);
    if (this.currentStateSelected) {
      // loop through india data to get details of state selected
      this.indiaData['regionData'].forEach((state) => {
        if (state.region === this.currentStateSelected) {
          // if match then assigning currently selected state's data to currentStateData property
          this.currentStateData = state;

          // update current bar chart
          this.setStateBarChart(state);

          this.getCurrentStateDistricts(this.currentStateSelected)
        }
      })
    }
  }

  // get selected state districts
  public getCurrentStateDistricts(state) {

    this.currentStateDistricts = [];
    for (let x in this.covidData) {
      if (x === state) {

        for (let y in this.covidData[x].districtData) {
          // this.currentStateDistricts.push(y);

          let data =
          {
            name: y,
            value: this.covidData[x].districtData[y]
          };

          // console.log('data : ',data)
          this.currentStateDistricts.push(data);
          console.log(this.currentStateDistricts)
        }
      }
    }

    // select first district of a country as default district selected
    // this.currentDistrictSelected = this.currentStateDistricts[0];
    // this.currentDistrictSelection()
    // this.barChartForDistrict(this.currentDistrictSelected);
  }

  // fired when district is selected from options
  public currentDistrictSelection() {
    // console.log('district : ', this.currentDistrictName);
    if (this.currentDistrictName) {
      this.currentStateDistricts.forEach((value) => {
        if (value.name === this.currentDistrictName) {
          // console.log('found : ', value);
          this.currentDistrictSelected = value;

          this.barChartForDistrict(this.currentDistrictSelected)
        }
      })
    }
  }

  // bar chart for district
  public barChartForDistrict(district) {
    // console.log(district);
    this.barChartDistrict = [
      { data: [district.value.active], label: 'active' },
      { data: [district.value.deceased], label: 'deaths' },
      { data: [district.value.recovered], label: 'recovered' }
    ]
  }


}
