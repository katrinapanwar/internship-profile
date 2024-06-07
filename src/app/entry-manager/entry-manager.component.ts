import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-manager',
  templateUrl: './entry-manager.component.html',
  styleUrls: ['./entry-manager.component.css']
})
export class EntryManagerComponent {
  constructor(private router: Router) {}
}

