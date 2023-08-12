import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-nav-p',
  templateUrl: './nav-p.component.html',
  styleUrls: ['./nav-p.component.css']
})
export class NavPComponent {

  constructor(private register : RegisterService, private router : Router){}

  userInfo : any = localStorage.getItem('rid');
  data : any = JSON.parse(this.userInfo);

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file! : File; // Variable to store file

  // Inject service 



  userprofilepicture = `https://centralattendance.fly.dev/api/files/students/${this.data.id}/${this.data.profilePicture}`

  ngOnInit(): void {
    this.nouserprofile();
  }

  nouserp : boolean = false;

  nouserprofile(){
    if(this.data.profilePicture = null){
      this.nouserp = true;
    }
    else if(this.data.profilePicture != null){
      this.nouserp = false;
    }
  }

  // On file Select
  onChange(event:any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.register.postProfilePicture(this.data.id,this.file)
  }

  logout(){
    this.register.logout();
    this.router.navigate(['login'])
    alert('Logged Out');
  }
}
