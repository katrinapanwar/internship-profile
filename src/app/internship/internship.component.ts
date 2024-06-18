import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from "../dialog/dialog.component";
import { SharedService } from '../shared/shared.service';
import { FormBuilder } from "@angular/forms";
import { intern_update } from './internship.model';
import { DataService, Data } from '../services/data.service'; // Ensure correct import from DataService

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
  selectedValue: string = 'create';
  deletePermission: boolean = false; // Variable to control delete button permission
  passwordInput: string = ''; // User input for the password
  hiddenPassword: string = ''; // Variable to store the hidden password with stars

  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private shared: SharedService,
    private _formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {
    setTimeout(() => {
      this.show_ip = true;
    }, 0);
  }

  ngOnInit(): void {
    // Extract query parameters
    this.route.queryParams.subscribe(params => {
      const tempPassword = params['tempPassword'];
      this.hiddenPassword = tempPassword ? '*'.repeat(tempPassword.length) : '';
      // Replace 'your_password' with the actual password you want to validate
      this.deletePermission = (tempPassword === 'katrina');
    });

    // Load updates from the backend when component initializes
    this.dataService.getData().subscribe(dataEntries => {
      this.updates = dataEntries.map(entry => new intern_update(
        new Date(entry.date).toLocaleDateString('en-CA'),
        entry.day,
        entry.tasks.split(', '), // Assuming tasks is a comma-separated string
        [],
        0
      ));
      this.saveUpdatesToLocalStorage();
    });
  }

  new_entry(message: string, action: string) {
    this.snackbar.open(message, action, { duration: 2000 });

    // Check if an entry with the same date and day exists
    const existingUpdateIndex = this.updates.findIndex(update =>
      update.date === this.formattedDate && update.day === this.day_input
    );

    if (existingUpdateIndex !== -1) {
      // Append the new task to the existing entry
      this.updates[existingUpdateIndex].task.push(this.tasks_input);

      // Update the existing entry using DataService
      const existingUpdate = this.updates[existingUpdateIndex];
      const dataEntry: Data = {
        date: +new Date(existingUpdate.date).getTime(), // Convert formattedDate to timestamp
        day: existingUpdate.day,
        tasks: existingUpdate.task.join(', ')
      };

      this.dataService.updateData(dataEntry.date, dataEntry).subscribe(() => {
        this.saveUpdatesToLocalStorage();
      });
    } else {
      // Create new entry
      const newUpdate = new intern_update(
        this.formattedDate,
        this.day_input,
        [this.tasks_input],
        [],
        0
      );

      // Save new entry using DataService
      const dataEntry: Data = {
        date: +new Date(this.formattedDate).getTime(), // Convert formattedDate to timestamp
        day: this.day_input,
        tasks: this.tasks_input
      };

      this.dataService.createData(dataEntry).subscribe(createdData => {
        newUpdate.date = new Date(createdData.date).toLocaleDateString('en-CA');
        this.updates.push(newUpdate);
        this.saveUpdatesToLocalStorage();
      });
    }
  }

  saveUpdatesToLocalStorage() {
    // Save updates to local storage
    localStorage.setItem("internship_updates", JSON.stringify(this.updates));
  }

  onUpdateDay(event: Event) {
    this.day_input = (event.target as HTMLInputElement).value;
    this.updateButtonStatus();
  }

  onUpdateTask(event: Event) {
    this.tasks_input = (event.target as HTMLInputElement).value;
    this.updateButtonStatus();
  }

  onUpdateDate(event: any) {
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
    this.shared.setMessage(this.updates[n]);
    this.dialog.open(DialogComponent, {});
  }

  updateEntry(index: number) {
    const update = this.updates[index];
    const dataEntry: Data = {
      date: +new Date(update.date).getTime(),
      day: update.day,
      tasks: update.task.join(', ')
    };

    this.dataService.updateData(dataEntry.date, dataEntry).subscribe(() => {
      this.saveUpdatesToLocalStorage();
    });
  }

  deleteEntry(dateString: string) {
    if (this.deletePermission) {
      const date = +new Date(dateString).getTime();
      this.dataService.deleteData(date).subscribe(() => {
        this.updates = this.updates.filter(u => +new Date(u.date).getTime() !== date);
        this.saveUpdatesToLocalStorage();
      });
    } else {
      this.snackbar.open('You do not have permission to delete this entry', 'Close', { duration: 2000 });
    }
  }

  // Method to update delete permission dynamically
  updateDeletePermission() {
    const tempPassword = this.passwordInput;
    // Replace 'your_password' with the actual password you want to validate
    this.deletePermission = (tempPassword === 'katrina');
    // Update URL with the new password (optional)
    this.router.navigate([], {
      queryParams: { tempPassword: tempPassword },
      queryParamsHandling: 'merge',
    });
    this.hiddenPassword = '*'.repeat(tempPassword.length); // Update hidden password
  }
}







