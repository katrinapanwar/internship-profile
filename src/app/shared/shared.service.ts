import { Injectable } from '@angular/core';
import {intern_update} from "../internship/internship.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:intern_update = new intern_update('','',[''],[],0)
  constructor() { }
  setMessage(m:intern_update){
    this.message = m
  }
  getMessage(){
    return this.message;
  }
}