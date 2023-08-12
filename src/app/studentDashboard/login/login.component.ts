import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
        this.rep = "Welcome Student";
        this.router.navigate(['studentDashboard']);
        localStorage.setItem('rid', JSON.stringify(res.record));
        localStorage.setItem('tokenn', JSON.stringify(res.token));
      }
      else{
        this.router.navigate(['studentDashboard']);
        this.rep = "Welcome Class Rep";
        localStorage.setItem('rid', JSON.stringify(res.record));
        localStorage.setItem('tokenn', JSON.stringify(res.token));
      }
    }, error => {
      if(error){
        this.rep = "Authentication Failed, please check and try again"
      }
    }
    
    )
  }
}
