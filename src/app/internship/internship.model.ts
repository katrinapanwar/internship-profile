export class intern_update {
  public date: string;
  public day: string;
  public task: string[];
  public checkData: boolean[] = [];
  public checked = 0;
  public tags: string[];  // Add the tags property

  constructor(date: string, day: string, task: string[], checkData: boolean[], checked: number, tags: string[]) {
    this.date = date;
    this.day = day;
    this.task = task;
    this.checkData = checkData;
    this.checked = checked;
    this.tags = tags;  // Initialize the tags property
  }
}
