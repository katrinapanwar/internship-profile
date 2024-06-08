import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent { 
  dayValue = 'Clear me';
  taskValue = 'Clear me';
  savedEntries: { date: string, day: string, task: string }[] = [];
  picker: any;

  constructor(public dialog: MatDialog) {}

  saveData() {
    const date = new Date(this.picker._selected); // Get the selected date
    const entry = { date: date.toLocaleDateString(), day: this.dayValue, task: this.taskValue };
    this.savedEntries.push(entry);

    // Open the dialog to show saved data
    this.dialog.open(DialogComponent, {
      data: entry
    });

    // Clear the inputs
    this.dayValue = '';
    this.taskValue = '';
  }
}
