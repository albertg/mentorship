import {Component,Input, Output, EventEmitter, Attribute, OnInit} from '@angular/core';

@Component({
  selector: 'app-pro2',
  templateUrl: './pro2.component.html',
  styleUrls: ['./pro2.component.css']
})
export class Pro2Component implements OnInit {

  notestartedval;
  achievedval;
  inprogressval;
 
  @Input()
  title:string;
  @Input()
  achieved:number;
  @Input()
  inprogress:number;
  @Input()
  notestarted:number;
  @Input()
  totalgoals:number;
  
  constructor() { }

  ngOnInit() {
    
    // console.log('achieved' +this.achieved);
    // console.log('inprogress' +this.inprogress);
    // console.log('notestarted' +this.notestarted);
    // console.log('totalgoals' +this.totalgoals);
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
