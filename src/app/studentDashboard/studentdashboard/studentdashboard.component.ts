import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent {
 

  constructor(private register : RegisterService, private router : Router){}

  status = 'Activity';


  // Nav Panel

  collapsed : boolean = false;

  toggleNav() :  void{
    this.collapsed != this.collapsed;
  }

  verified: boolean = true;
  lectures: boolean = false;
  analytics: boolean = false;
  attendance: boolean = false;
  setting: boolean = false;

  lect(){
    this.lectures = true;
    this.verified = false; 
    this.analytics = false; 
    this.attendance = false; 
    this.setting = false;
  }
  veri(){
    this.verified = true; 
    this.lectures = false; 
    this.analytics = false; 
    this.attendance = false; 
    this.setting = false;
  }
  time(){
    this.analytics = true;  
    this.lectures = false; 
    this.verified = false; 
    this.attendance = false; 
    this.setting = false;
  }
  atte(){
    this.attendance = true ;
    this.lectures = false; 
    this.verified = false; 
    this.analytics = false; 
    this.setting = false;
  }
  clck(){
    this.lectures = false; 
    this.verified = false; 
    this.analytics = false; 
    this.attendance = false;
    this.setting = false;
  }
 
  set(){
    this.setting = true ; 
    this.lectures = false; 
    this.verified = false; 
    this.analytics = false; 
    this.attendance = false;
  }
 

// Nav Bar

// ngOnInit(){
//   this.nav.hidden()
// }
   

  // // LogOut method for Education

  
  logout(){
    this.register.logout();
    this.router.navigate(['login'])
    alert('Logged Out');
  }


}
