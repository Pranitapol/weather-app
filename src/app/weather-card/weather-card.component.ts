import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddCityPopupComponent } from '../add-city-popup/add-city-popup.component';
import {MatInputModule} from '@angular/material/input'
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { WeatherApiService } from '../weather-api.service';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatDialogModule,AddCityPopupComponent,
    NgIf,NgFor,DatePipe,MatIconModule,MatButtonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent implements OnInit ,OnDestroy{
  result:any[]=[];
  weatherData:any[]=[]
  refreshSub!: Subscription;
  weatherDesc: any;
  weatherSrc: string='';
  constructor(private dialog:MatDialog,private service:WeatherApiService,  @Inject(PLATFORM_ID) private platformId: Object,){}
@ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const saved = localStorage.getItem('addedCities');
    if (saved) {
      this.result = JSON.parse(saved);
      this.result.forEach(city => this.fetchWeather(city));
    }

    this.refreshSub = interval(300000).subscribe(() => {
      this.result.forEach(city => this.fetchWeather(city));
    });
  }
  }
  addCity(){
    console.log('city button has been clicked')
   const dialogref= this.dialog.open(AddCityPopupComponent,{
      data:'dwgih',
      // width:'1500px',
      // height:'500px',
      panelClass:'custom-dialog-container',
      backdropClass:'blurred-backdrop'
    })

    dialogref.afterClosed().subscribe(city=>{
      console.log('result',city);
      if(!this.result.includes(city)){
        this.result.push(city);
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('addedCities', JSON.stringify(this.result));
        }
        this.fetchWeather(city)
      }
    })
  }

  fetchWeather(cityName:string){
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.service.getData(cityName).subscribe((result:any)=>{
      const updated = {
      cityname: result.name,
      weatherdesc: result.weather[0].main,
      temp: Math.floor(result.main.temp),
      localdate: new Date(result.dt * 1000),
    };
     const index=this.weatherData.findIndex((c:any)=>c.cityname===cityName);   
    if(index>-1){
      this.weatherData[index]=updated;
      // this.getWeatherIcon(updated.weatherdesc)
    }else{
      this.weatherData.push(updated)
      // this.getWeatherIcon(updated.weatherdesc)
    }
    })
   
    // this.weatherData.map((item)=>
    // this.getWeatherIcon(item.weatherdesc))
  }
getWeatherIcon(weatherDesc:any){
  console.log('Weather description:', weatherDesc);
  
    switch(weatherDesc){
      case 'Clouds':
        this.weatherSrc= 'assets/cloudy.svg';
   
        break;
        case 'Rain':
           this.weatherSrc='assets/rainy-6.svg';
           break;
        case 'Snow':
          this.weatherSrc= 'assets/snowy-6.svg';
          break;
          case 'Clear':
            this.weatherSrc='assets/cloudy-day-3.svg';
            break;
            case 'Smoke':
              this.weatherSrc='assets/fog.png';
              break;
            case 'Haze':
              this.weatherSrc='assets/fog.png';
              break; 
              case 'Thunderstorm':
              this.weatherSrc='assets/thunder.svg';
              break;
          default:
            console.log('No matching icon for weather description, using default sunny icon');
            this.weatherSrc= 'assets/sunny-1.svg'
        }
        console.log('Icon path returned:', this.weatherSrc);
        return this.weatherSrc;
  }
  ngOnDestroy(): void {
  if (this.refreshSub) {
    this.refreshSub.unsubscribe();
  }
}
onClose(city:string){
  const cities:any= localStorage.getItem('addedCities');
  console.log(cities,city);
  const filtered=JSON.parse(cities).filter((item:any)=>item!==city)
    localStorage.setItem('addedCities',JSON.stringify(filtered))
    window.location.reload()
  // this.ngOnInit()
  }

scrollRight(): void {
  console.log('scrollRight called, current scrollLeft:', this.scrollContainer.nativeElement.scrollLeft);
  this.scrollContainer.nativeElement.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}

scrollLeft(): void {
  console.log('scrollLeft called, current scrollLeft:', this.scrollContainer.nativeElement.scrollLeft);
  this.scrollContainer.nativeElement.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}
}
