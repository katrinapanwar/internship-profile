import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from "../dialog/dialog.component";
import { SharedService } from '../shared/shared.service';
import { FormBuilder } from "@angular/forms";
import { intern_update } from './internship.model';
import { DataService, Data } from '../services/data.service'; // Ensure correct import

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
  deletePermission: boolean = false;
  passwordInput: string = '';
  hiddenPassword: string = '';

  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private shared: SharedService,
    private _formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    setTimeout(() => {
      this.show_ip = true;
    }, 0);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tempPassword = params['tempPassword'];
      this.hiddenPassword = tempPassword ? '*'.repeat(tempPassword.length) : '';
      this.deletePermission = (tempPassword === 'katrina');
    });

    this.dataService.getData().subscribe(dataEntries => {
      this.updates = dataEntries.map(entry => new intern_update(
        new Date(entry.date).toLocaleDateString('en-CA'),
        entry.day,
        entry.tasks.split(', '),
        entry.checkData || [],
        entry.checked || 0,
        entry.tags || []
      ));
      this.saveUpdatesToLocalStorage();
    });
  }

  new_entry(message: string, action: string) {
    this.snackbar.open(message, action, { duration: 2000 });

    const existingUpdateIndex = this.updates.findIndex(update =>
      update.date === this.formattedDate && update.day === this.day_input
    );

    if (existingUpdateIndex !== -1) {
      this.updates[existingUpdateIndex].task.push(this.tasks_input);
      const existingUpdate = this.updates[existingUpdateIndex];
      const dataEntry: Data = {
        date: existingUpdate.date,
        day: existingUpdate.day,
        tasks: existingUpdate.task.join(', '),
        checkData: existingUpdate.checkData,
        checked: existingUpdate.checked,
        tags: existingUpdate.tags
      };

      this.dataService.updateData(dataEntry.date, dataEntry).subscribe(() => {
        this.saveUpdatesToLocalStorage();
      });
    } else {
      const newUpdate = new intern_update(
        this.formattedDate,
        this.day_input,
        [this.tasks_input],
        [],
        0,
        []
      );

      const dataEntry: Data = {
        date: newUpdate.date,
        day: this.day_input,
        tasks: this.tasks_input,
        checkData: newUpdate.checkData,
        checked: newUpdate.checked,
        tags: newUpdate.tags
      };

      this.dataService.createData(dataEntry).subscribe(createdData => {
        newUpdate.date = new Date(createdData.date).toLocaleDateString('en-CA');
        this.updates.push(newUpdate);
        this.saveUpdatesToLocalStorage();
      });
    }
  }

  saveUpdatesToLocalStorage() {
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
      this.formattedDate = this.selectedDate.toLocaleDateString('en-CA');
    } else {
      this.formattedDate = "";
    }
    this.updateButtonStatus();
  }

  updateButtonStatus() {
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
    this.dialog.open(DialogComponent, {
      data: {
        tags: this.updates[n].tags
      }
    });
  }

  updateEntry(index: number) {
    const update = this.updates[index];
    const dataEntry: Data = {
      date: update.date,
      day: update.day,
      tasks: update.task.join(', '),
      checkData: update.checkData,
      checked: update.checked,
      tags: update.tags
    };

    this.dataService.updateData(dataEntry.date, dataEntry).subscribe(() => {
      this.saveUpdatesToLocalStorage();
    });
  }

  deleteEntry(dateString: string) {
    if (this.deletePermission) {
      this.dataService.deleteData(dateString).subscribe(() => {
        this.updates = this.updates.filter(u => u.date !== dateString);
        this.saveUpdatesToLocalStorage();
      });
    } else {
      this.snackbar.open('You do not have permission to delete this entry', 'Close', { duration: 2000 });
    }
  }

  updateDeletePermission() {
    const tempPassword = this.passwordInput;
    this.deletePermission = (tempPassword === 'katrina');
    this.router.navigate([], {
      queryParams: { tempPassword: tempPassword },
      queryParamsHandling: 'merge',
    });
    this.hiddenPassword = '*'.repeat(tempPassword.length);
  }
}



































































