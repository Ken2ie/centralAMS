import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit {

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    // thi
  }

   // Register for Students
   registerStudents(indexNumber: String, email : String, password : String, passwordConfirm : String, studentPersonalEmail : String, firstName: String, contact: String, lastName:String, department : String, year : String, program : String, emailVisibility : boolean){
    return  this.http.post('STUDENTS/ROUTE/COLLECTION', {indexNumber, email, password, passwordConfirm, studentPersonalEmail, firstName, contact, location, lastName, department, year, program, emailVisibility});
   }
   
   // Register for Students
   registerLecturers(username: string, email : string, password : string, passwordConfirm : string, place : string, hostels: string, contact: string, location:string){
    return  this.http.post('TEACHERS/ROUTE/COLLECTION', {username, email, password, passwordConfirm, place, hostels, contact, location});
   }

  //  Get List of Departments
  getDepartments(){
    return  this.http.get(`DEPARTMENTS/ROUTE/COLLECTION`);
  }

  //  Get List of Departments
  getPrograms(){
    return  this.http.get(`PROGRAMS/ROUTE/COLLECTION`);
  }

  //  Get Student's Details
  getStudentDetails(id:String){
    return  this.http.get(`TIMETABLE/ROUTE/COLLECTION:${id}`);
  }

  //  Get List of Course from timetable
  getCourses(filter : String){
    return  this.http.get(`TIMETABLE/ROUTE/COLLECTION`);
  }

  // Auth
  auth(identity : String, password : String){
    return  this.http.post('STUDENT/AUTH', {identity, password});
   }
  
   // Add Courses
  addCourse(code : String, Course : String, Program : String, Day : String, Semester : String, StartTime :  String, EndTime : String){
    return  this.http.post(`TIMETABLE/ROUTE/COLLECTION`, {code, Course, Program, Day, Semester, StartTime, EndTime});
   }
   
   // Edit Courses
  editCourse(id : String, code: String, Course : String, Day : String, Semester : String, StartTime :  String, EndTime : String){
    return  this.http.patch(`TIMETABLE/ROUTE/COLLECTION`, id, {code, Course, Day, Semester, StartTime, EndTime});
   }
   
   // Delete Courses
  deleteCourse(id : String){
    return  this.http.delete(`TIMETABLE/ROUTE/COLLECTION`, id);
   }


   //  Setting User Token

   currentUser$ = new BehaviorSubject < {user : string} | null | undefined > (undefined);

   token = localStorage.getItem('tokenn');

   setUser(){
      if(this.token){
        this.currentUser$.next({user: 'User'})
      }else{
        this.currentUser$.next(null);
      }
   }

   isLoggedIn() {
    if (localStorage.getItem('tokenn')) {
      return true;
    }
    return false;
  }


  logout() {
    localStorage.removeItem('tokenn');
    localStorage.removeItem('rid');
  }


  userInfo : any = localStorage.getItem('rid');
  data : any = JSON.parse(this.userInfo);

  url = `STUDENT/ROUTE/COLLECTION`

  // Upload Picture

   // Returns an observable
   upload(profilePicture:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("profile", profilePicture, profilePicture.name);
    
    // Make http post request over api
    // with formData as req
    return this.http.patch(this.url, this.data.id, formData)
  }
  
  postProfilePicture(id : String, profilePicture : File){
  // const formData = new FormData(); 
    
  // Store form name as "file" with file data
  // formData.append("profile", profilePicture, profilePicture.name);
  return  this.http.patch(`TIMETABLE/ROUTE/COLLECTION`, id, {profilePicture});
 }
   
}
