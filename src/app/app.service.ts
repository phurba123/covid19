import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private covidApi="https://api.covid19india.org/state_district_wise.json";

  private covidApi2="https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";

  constructor(private http:HttpClient) {}

  public getCovidDatas()
  {
    return this.http.get(this.covidApi);
  }

  // get india's collective data
  public getIndiaData()
  {
    return this.http.get(this.covidApi2)
  }
}
