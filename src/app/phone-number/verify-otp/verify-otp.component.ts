import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
    
  startTimer(duration:number){
    this.timer=duration*60;
    setInterval(()=>{
      this.updatetimeValue()
    },1000);
  }
  updatetimeValue() 
  {
      let minutes: any= this.timer/60;
      let seconds: any= this.timer%60;
      minutes= String('0' + Math.floor(minutes)).slice(-2);
      seconds= String('0' + Math.floor(seconds)).slice(-2);
      const text =minutes + ':'+ seconds;
      this.time.next(text);
      --this.timer;
      if(this.timer<0){
        this.startTimer(1);
      } 
    }
    
  constructor(private route: Router) { }

  ngOnInit() {}

  register() {
    this.route.navigate(['./phone-number/registration']);
  }

}
