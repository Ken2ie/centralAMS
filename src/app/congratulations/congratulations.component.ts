import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit{


  // Lottie Animation
  options: AnimationOptions = {    
    path: '/assets/lottie/congrats.json'  
  };  

  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
  
  ngOnInit(): void {
    console.log(this.data);
  }
  
  userInfo : any = localStorage.getItem('userInfo');
  data : any = JSON.parse(this.userInfo);
  
  name : String = this.data.firstName + " " + this.data.lastName;
  email : String = this.data.email;
}
