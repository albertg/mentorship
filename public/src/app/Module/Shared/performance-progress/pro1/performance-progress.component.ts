import {Component,Input, Output, EventEmitter, Attribute, OnInit} from '@angular/core';

@Component({
  selector: 'app-performance-progress',
  templateUrl: './performance-progress.component.html',
  styleUrls: ['./performance-progress.component.css']
})
export class PerformanceProgressComponent implements OnInit {
  notestartedval;
  achievedval;
  inprogressval;
 
  @Input()
  title:string;
  @Input()
  completed:number;
  @Input()
  inprogress:number;
  @Input()
  notestarted:number;
  @Input()
  totalgoals:number;
  
  constructor() { }

  ngOnInit() {
    
  /*   if(this.inprogress==0 && this.notestarted==0 && this.achievedval==0){
      this.notestartedval=0;
      this.achievedval=0;
      this.inprogressval=0;
    }
     if(this.inprogress==0 && this.notestarted==0){
      this.notestartedval=0;
      this.achievedval=100;
      this.inprogressval=0;
    }

     if(this.achievedval==0 && this.notestarted==0){
      this.notestartedval=0;
      this.achievedval=0;
      this.inprogressval=100;
    }
     if(this.achievedval==0 && this.inprogressval==0){
      this.notestartedval=100;
     this.achievedval=0;
      this.inprogressval=0;
    } */
   
  }

}
