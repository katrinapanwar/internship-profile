export class intern_update {
    public date:string;
    public day:string;
    public task:string[];
    public checkData:boolean[] = [];
    public checked = 0
    constructor(date:string,day:string,task:string[], checkData:boolean[],checked:number) {
      this.date = date;
      this.day = day;
      this.task = task;
      this.checkData = checkData;
      this.checked = checked
    }
  }