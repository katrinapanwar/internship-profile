import { Component } from '@angular/core';
import {intern_update} from "../internship/internship.model";
import { SharedService} from "../shared/shared.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private shared:SharedService, private _formBuilder: FormBuilder) {

  }
  spin_value = 0
  spin_colour = 'yellow'
  message = new intern_update('','',[],[],0)
  ngOnInit():void{
    this.message = this.shared.getMessage()
    console.log(this.message.checkData)
    this.spin_value = (this.message.checked/this.message.task.length)*100
  }

  onChange(n:number){
    this.message.checkData[n] = !this.message.checkData[n]
    if (this.message.checkData[n]){
      this.message.checked++
    }
    else{
      this.message.checked--
    }
    this.spin_value = (this.message.checked/this.message.task.length)*100
  }
}