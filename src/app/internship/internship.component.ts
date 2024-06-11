import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { SharedService } from '../shared/shared.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { intern_update } from './internship.model';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css'],
})
export class InternshipComponent implements OnInit {
  create_entry_clicked = false;
  show_ip = false;
  create_entry = this.create_entry_clicked && this.show_ip;
  day_input: string = "";
  selectedDate: Date | null = null;
  formattedDate: string = "";
  tasks_input: string = "";
  add_button_status = false;
  show_entry = false;
  updates: intern_update[] = [];

  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private shared: SharedService,
    private _formBuilder: FormBuilder
  ) {
    setTimeout(() => {
      this.show_ip = true;
    }, 0);
  }

  new_entry(messege: string, action: string) {
    this.snackbar.open(messege, action, { duration: 2000 });

    // Create new entry
    const newUpdate = new intern_update(
      this.formattedDate,
      this.day_input,
      [this.tasks_input],
      [],
      0
    );

    // Save new entry
    this.updates.push(newUpdate);
    this.saveUpdatesToLocalStorage();
  }

  saveUpdatesToLocalStorage() {
    // Save updates to local storage
    localStorage.setItem("internship_updates", JSON.stringify(this.updates));
  }

  public onUpdateDay(event: Event) {
    this.day_input = (<HTMLInputElement>event.target).value;
    this.updateButtonStatus();
  }

  public onUpdateTask(event: Event) {
    this.tasks_input = (<HTMLInputElement>event.target).value;
    this.updateButtonStatus();
  }

  public onUpdateDate(event: any) {
    if (this.selectedDate) {
      this.formattedDate = this.selectedDate.toLocaleDateString('en-CA'); // Format as 'yyyy-MM-dd'
    } else {
      this.formattedDate = "";
    }
    this.updateButtonStatus();
  }

  updateButtonStatus() {
    // Update button status based on input fields
    this.add_button_status = this.day_input.length > 0 && this.tasks_input.length > 0;
  }

  onShowEntry() {
    this.selectedValue = 'show';
    this.create_entry = false;
    this.show_entry = !this.show_entry;
  }

  onAddEntry() {
    this.selectedValue = 'create';
    this.show_entry = false;
    this.create_entry = !this.create_entry;
  }

  openDialog(n: number) {
    console.log(n, this.updates[n]);
    this.shared.setMessage(this.updates[n]);
    this.dialog.open(DialogComponent, {});
  }

  ngOnInit(): void {
    // Load updates from local storage when component initializes
    const storedUpdates = localStorage.getItem("internship_updates");
    if (storedUpdates) {
      this.updates = JSON.parse(storedUpdates);
    }
  }

  selectedValue: string = 'create';
}
