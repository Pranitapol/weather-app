import { Injectable } from '@angular/core';
import {enviornment} from '../environments/enviornment'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http:HttpClient) { }

  getData(cityName:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${enviornment.appId}&units=metric`)
  }
}
