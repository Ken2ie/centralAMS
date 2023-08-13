import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router : Router, private sanitizer: DomSanitizer){}

  toHome(){
    this.router.navigate(['']);
  }
  
  toLogin(){
    this.router.navigate(['login']);
  }

  fileUrl : any;
  ngOnInit() {
      const data = 'some text';
      const blob = new Blob([data], {
          type: 'application/octet-stream'
      });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
