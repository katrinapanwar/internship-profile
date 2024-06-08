import { Component, Input } from '@angular/core';

@Component({
  selector: 'old-entry',
  templateUrl: './old-entry.component.html',
  styleUrls: ['./old-entry.component.css']
})
export class OldEntryComponent {
  @Input() entries: { date: string, day: string, task: string }[] = [];
}
