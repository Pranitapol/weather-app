import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WeatherApiService } from '../weather-api.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
// import * as from '../../../assets'
@Component({
  selector: 'app-add-city-popup',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,
    NgIf,CommonModule
  ],
  templateUrl: './add-city-popup.component.html',
  styleUrl: './add-city-popup.component.scss'
})
export class AddCityPopupComponent implements OnInit{
  result!: Object;
  error: any='';
  weatherDesc:string='';
  cityName:string='';
  temp:any;
  localDate: any;
  weatherSrc:string='';
  dataToPass:any;
  isHidden:boolean=false

  constructor(private dialogref:MatDialogRef<AddCityPopupComponent>,@Inject(MAT_DIALOG_DATA)public data:any,
  private service:WeatherApiService,private router:Router){}

  inputValue:string=''
  ngOnInit(): void {
    // console.log('in popup',this.data)
  }

  onChange(event:any){
    // console.log('event',event)
    this.inputValue=event.target.value
  }
  
  backToSearch(): void {
    // this.isHidden = false;
    this.dialogref.close()
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 300);
  }

  search(){
    if(window.innerWidth<=412)
    {this.isHidden=true;}

     if( window.innerWidth<=390)
    {this.isHidden=true;}
        if( window.innerWidth<=430)
    {this.isHidden=true;}
           if( window.innerWidth<=360)
    {this.isHidden=true;}
    this.service.getData(this.inputValue).subscribe(
    { 
      next: (res:any)=>{
        this.error=null
        this.result=res
        this.weatherDesc=res.weather[0].main;
        this.cityName=res.name;
        this.temp=Math.floor(res.main.temp);
        this.localDate = new Date(res.dt * 1000);
        // const localdate = new Date(utcDate.getTime() + res.timezone * 1000); 
        // this.localDate = localdate;

        this.getWeatherIcon()
      
      },
      error:(err)=>{
        this.result='';
        if(err){
        this.error=err.error.message
        }
      }
    }
    )
  }

  getWeatherIcon(){
    switch(this.weatherDesc){
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
            this.weatherSrc= 'assets/sunny-1.svg'
    }
  }

  onAdd(){

    // const exist=window.localStorage.getItem('addedCities');
    // console.log(exist);
    
  // const cityExists = exist.some(
  //   (city: any) => city.cityname.toLowerCase() === this.cityName.toLowerCase()
  // );

  // if (cityExists) {
  //   this.error = 'City already exists';
  //   return;
  // }
    this.dataToPass={
      cityname:this.cityName,
      weatherdesc:this.weatherDesc,
      temp:this.temp,
      localdate:this.localDate
    }
    this.dialogref.close(this.dataToPass)
  }
}