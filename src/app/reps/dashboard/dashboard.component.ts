import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router : Router, private register :RegisterService){}

  repData: any;

  id! : String;

  ngOnInit(): void {

    this.register.setUser();

    this.getTimeTable();

   this.chechState();
  }

  home(){
    this.router.navigate([''])
  }

  userInfo : any = localStorage.getItem('rid');
  data : any = JSON.parse(this.userInfo);


  timetable : any;
  result : any;
  sem : any;
  chechState(){
    if(this.itemLength == 0){
      this.noCourse = true;
      console.log(this.noCourse)
    }else{
      this.noCourse = false;
      console.log(this.noCourse)
    }
  }
  
  filterSemOne(){
   this.sem = "Semester 1";
   this.getTimeTable();
   this.chechState();
   setTimeout(() => {
     this.chechState();
   }, 2000);
  }
  
  filterSemTwo(){
    setTimeout(() => {
      this.chechState();
    }, 1000);
    this.sem = "Semester 2";
    this.getTimeTable();
  }
 
  noCourse : boolean = false;

  itemLength : number = 0;
  
  getTimeTable(){
   this.register.getCourses(`?filter=(Program='${this.data.program}')`).subscribe((res:any) => {
     this.result = res.items.filter((obj:any) => {
      return obj.Year === this.data.year && obj.Semester === this.sem;
    });
    this.timetable = this.result;
    this.itemLength = this.result.length
    console.log(this.itemLength)
  })
  }

  // Lottie Animation
  options: AnimationOptions = {    
    path: '/assets/lottie/add.json'  
  };  

  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }


  // Check State
  
  addIs: boolean = false;
  add(){
    this.addIs = true;
  }

  editIs : boolean = false;

  coursee : any;
  cours : any;
  code : any;
  day : any;
  semesterr : any;
  start : any;
  end : any;

  confirm : boolean = false;

  decline(){
      this.confirm = false;
      this.editIs = false;
  }
  
  error: String = "";

  edit(j:any){
    this.editIs = true;

    this.coursee = [
      {
        id : j.id,
        code: j.code,
        cours : j.Course,
      day : j.Day,
      semseterr : j.Semseter,
      start : j.StartTime,
      end : j.EndTime
      }
    ];

  }
  
  confirming(){
      this.register.editCourse(this.coursee[0].id, this.code, this.cours, this.day, this.semesterr, this.start, this.end).subscribe((res:any) => {
        console.log(res); 
        this.error = "Successful";
        this.editIs = false;
        this.getTimeTable();
      }, error => {;
        if(error){
          console.log(error);
          this.error = "Update not Successful"
        }
      });
  }

  declineAdd(){
    this.addIs = false;
  }

  
  
  confirmingAdd(){
      this.register.addCourse(this.code, this.cours, this.data.program, this.day, this.semesterr, this.start, this.end).subscribe((res:any) => {
        console.log(res); 
        this.error = "Successful";
        this.code = '';
        this.cours = '';
        this.day = '';
        this.start = '';
        this.semesterr = '';
        this.end = '';
        this.editIs = false;
        this.getTimeTable();
      }, error => {;
        if(error){
          console.log(error);
          this.error = "Update not Successfu"
        }
      });
  }
  
  logout(){
    this.register.logout();
    this.router.navigate(['repsOnly']);
  }

  deletee(j:String){
    console.log(j)
    this.register.deleteCourse(j).subscribe((res:any)=>{
      console.log(res);
      this.getTimeTable();
    });
  }
}
