import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-two',
  templateUrl: './nav-two.component.html',
  styleUrls: ['./nav-two.component.css']
})
export class NavTwoComponent {

  constructor(private router : Router){}

  toHome(){
    this.router.navigate(['']);
  }

  toRegister(){
    this.router.navigate(['register']);
  }

}
