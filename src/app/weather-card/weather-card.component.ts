import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddCityPopupComponent } from '../add-city-popup/add-city-popup.component';
import {MatInputModule} from '@angular/material/input'
@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatDialogModule,AddCityPopupComponent],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent implements OnInit {
  constructor(private dialog:MatDialog){}

  ngOnInit(): void {
    
  }
  addCity(){
    console.log('city button has been clicked')
    this.dialog.open(AddCityPopupComponent,{
      data:'dwgih',
      // width:'1500px',
      // height:'500px',
      panelClass:'custom-dialog-container',
      backdropClass:'blurred-backdrop'
    })
  }
}
