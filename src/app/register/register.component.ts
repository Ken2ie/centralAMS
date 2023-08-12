import { Component, OnChanges, OnInit } from '@angular/core';
import { RegisterService } from '../api/register.service';
import { DepartmentsModule, ProgramsModule } from '../api/modules/departments.module';
import { Router } from '@angular/router';
import { error } from 'console';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private register : RegisterService, private router : Router){}

  // For getting the request results whenthe page loads
  
  ngOnInit(): void {
    this.getDepartments();
    this.getPrograms();
    this.checker();
    this.checkerTwo();
  }

  // First
  username! : String;
  studentEmail! : String;
  password! : String;
  confirmPassword! : String;

  // Second
  firstName! : String;
  lastName! : String;
  personalEmail! : String;
  contact! : String;
  
  // Third
  indexNumber! : String;
  department : String = "Select Department";
  program : String = "Select Program";
  year! : String;
  emailVisibility : boolean = true;
  
  dpId! : String;
  pgId! : String;
  
  start : boolean =  false;
  startBack : boolean =  false;
  nextOne : boolean =  false;
  nextTwo : boolean =  false;
  nextThree : boolean =  false;
  nextFour : boolean =  false;
  
  complete : boolean =  false;
  validation : boolean =  false;
  validationTwo : boolean =  false;
  
  alert : String = " ";

  // Department List Assigning to Array
  deptList: DepartmentsModule[] = [];

  // Department List Assigning to Array
  progList: ProgramsModule[] = [];


  usernameEmpty : String = " ";
  validityOne : String = " ";

  startNext(){
    this.start = true;
    this.nextOne = true;
  }

   re : any = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  checker(){
    //var emailRegx1 = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(test)\.com$/g;
  var emailRegx = /\b(?:(?![_.-])(?!.*[_.-]{2})[a-z0-9_.-]+(?<![_.-]))@(?:(?!-)(?!.*--)[a-z0-9-]+(?<!-)\.)*test\.com\b/i;
  //var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    // if (emailRegx.test(this.studentEmail)) {
        if (this.studentEmail.indexOf('@central.edu.gh', this.studentEmail.length - '@central.edu.gh'.length) !== -1) {
          this.validityOne = ''
          this.validation = true;
          } else {
          this.validityOne = 'Email Invalid, student email required'
        }
      // } 
      }
  
  checkerTwo(){
        if (this.personalEmail.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
          this.validityOne = ''
          this.validationTwo = true;
          } else {
          this.validityOne = 'Email Invalid, student email required'
        }
      // } 
      }

      leastCharacter(){
        if(this.password.length < 10){
          this.validityOne = "Characters must be at least 10 or more";
        }
        else if(this.password.length <= 0){
          this.validityOne == "Cannot be blank";
        }
        else{
          this.validityOne = '';
        }
      }
  
  nextToTwo(){
    if(this.username == null || this.studentEmail == null || this.password == null || this.confirmPassword == null){
      this.validityOne = "All Fields required"
      setTimeout(() => {
        this.validityOne = ""
      }, 4000);
    }

    else if(this.password != this.confirmPassword){
      this.validityOne = "Passwords don't match"
      setTimeout(() => {
        this.validityOne = ""
      }, 4000);
    }
    else if(this.username != null && this.studentEmail != null && this.password != null && this.confirmPassword != null){
      this.nextOne = false;
      this.nextTwo = true;
    }
  }
  
  nextToThree(){
    if(this.firstName == null || this.lastName == null || this.personalEmail == null || this.contact == null){
      this.validityOne = "All Fields required";
      setTimeout(() => {
        this.validityOne = ""
      }, 4000);
    } 
    else if(this.firstName != null && this.lastName != null && this.personalEmail != null && this.contact != null){
      this.nextTwo = false;
      this.nextThree = true;
      this.complete = true;
    }
  }
  
  previousToTwo(){
    this.nextTwo = true;
    this.nextThree = false;
  }
  previousToOne(){
    this.nextOne = true;
    this.nextTwo = false;
  }
  previousToStart(){
    this.startBack = false;
    this.nextOne = false;
  }

  getDepartments(){
    this.register.getDepartments().subscribe((res:any) => {
      this.deptList = res.items;
    });
  }
 
  getPrograms(){
    this.register.getPrograms().subscribe((res:any) => {
      this.progList = res.items;
    });
  }

  signup(){
    // if(this.indexNumber != '' && this.studentEmail != '' && this.personalEmail != '' && this.contact != '' && this.password != '' && this.confirmPassword != '' && this.firstName != '' && this.lastName != '' && this.department != '' && this.program != ''){
      this.register.registerStudents(this.indexNumber, this.studentEmail, this.password, this.confirmPassword, this.personalEmail, this.firstName, this.contact, this.lastName, this.department, this.year, this.program, this.emailVisibility).subscribe((res:any) => {
        console.log(res);
        this.router.navigate(['congratulations']);
        localStorage.setItem('userInfo', JSON.stringify(res));
       },error => {
       if(error){
        console.log(error);
         this.alert = error.message;
        }
      }
      );
    // }else{
    //   this.alert = "All Fields Required";
    // }
  }

  toLogin(){
    this.router.navigate(['login']);
  }
}
