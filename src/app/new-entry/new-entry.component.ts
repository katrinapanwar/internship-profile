import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent implements OnInit{ 
  dayValue: string = '';
  taskValue: string = '';
  savedEntries: { day: string, task: string }[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.loadEntries();
  }

  saveData() {
    if (this.dayValue && this.taskValue) {
      const newEntry = { day: this.dayValue, task: this.taskValue };
      this.savedEntries.push(newEntry);
      this.saveEntries();
      this.dayValue = '';
      this.taskValue = '';
    }
  }

  saveEntries() {
    localStorage.setItem('savedEntries', JSON.stringify(this.savedEntries));
  }

  loadEntries() {
    const entries = localStorage.getItem('savedEntries');
    if (entries) {
      this.savedEntries = JSON.parse(entries);
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        entries: this.savedEntries
      }
    });
  }
}