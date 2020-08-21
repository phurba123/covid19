import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private covidApi="https://api.covid19india.org/state_district_wise.json"

  constructor(private http:HttpClient) {}

  public getCovidDatas()
  {
    return this.http.get(this.covidApi);
  }
}
