import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-old-entry',
  templateUrl: './old-entry.component.html',
  styleUrls: ['./old-entry.component.css']
})
export class OldEntryComponent {
  @Input() entries: { day: string, task: string }[] = [];
}

