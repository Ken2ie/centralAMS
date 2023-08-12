import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-reps-only',
  templateUrl: './reps-only.component.html',
  styleUrls: ['./reps-only.component.css']
})
export class RepsOnlyComponent implements OnInit {

  
  constructor(private register : RegisterService, private router : Router){}
  
  data = [];
  
  
  
  ngOnInit(): void {
    setTimeout(() => {
      this.register.setUser();
    }, 2000); 
  }
  
  usernameOrEmail! : String;
  password! : String;

  repBool : boolean = false;

  rep: String = "";
  
  login(){
    this.register.auth(this.usernameOrEmail, this.password).subscribe((res:any) => {
      this.repBool = res.record.Rep;
      console.log(this.repBool);
      // console.log(res);
      if(this.repBool == true){
        this.rep = "You are a Class Rep";
        this.router.navigate(['dashboard']);
        localStorage.setItem('rid', JSON.stringify(res.record));
        localStorage.setItem('tokenn', JSON.stringify(res.token));
      }
      else{
        this.rep = "You are not a Class Rep";
      }
    }, error => {
      if(error){
        this.rep = "Authentication Failed, please check and try again"
      }
    }
    
    )
  }
  
}
