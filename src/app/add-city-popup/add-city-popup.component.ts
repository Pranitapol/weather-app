import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WeatherApiService } from '../weather-api.service';
@Component({
  selector: 'app-add-city-popup',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,ReactiveFormsModule,MatIconModule,MatInputModule],
  templateUrl: './add-city-popup.component.html',
  styleUrl: './add-city-popup.component.scss'
})
export class AddCityPopupComponent implements OnInit{
  result!: Object;
  error: any;
  constructor(private dialogref:MatDialogRef<AddCityPopupComponent>,@Inject(MAT_DIALOG_DATA)public data:any,
  private service:WeatherApiService){}

  inputValue:string=''
  ngOnInit(): void {
    console.log('in popup',this.data)
  }

  onChange(event:any){
    // console.log('event',event)
    this.inputValue=event.target.value
  }

  search(){
    console.log('in search',this.inputValue)
    this.service.getData(this.inputValue).subscribe(
    { 
      next: (res)=>{
        this.result=res
        console.log('in response',res)
      },
      error:(err)=>{
        this.error=err.error.message
        console.log('in response',this.error)
      }
    }
    )
  }
}
