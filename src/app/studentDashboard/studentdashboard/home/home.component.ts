import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { RegisterService } from 'src/app/api/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private register : RegisterService){}

  public chart: any;

  
 today = (new Date()).getDay();

 monday = 'Monday';
 tuesday = 'Tuesday';
 wed = 'Wednesday';
 thursday = 'Thursday';
 friday = 'Friday';
 saturday = 'Saturday';

  ngOnInit(): void {
    this.createChart();
    this.getTimeTable();
  }

   // Lottie Animation
  options: AnimationOptions = {    
    path: '/assets/lottie/nolecturess.json'  
  };  

  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }

  userInfo : any = localStorage.getItem('rid');
  data : any = JSON.parse(this.userInfo);

  result : any;
  timetable : any;
  itemLength : any;
  sem : String = 'Semester 1';

  getTimeTable(){
    this.register.getCourses(`?filter=(Program='${this.data.program}')`).subscribe((res:any) => {
      this.result = res.items.filter((obj:any) => {
        console.log(this.result)
       return obj.Year === this.data.year && obj.Semester === this.sem;
     });
     this.timetable = this.result;
     this.itemLength = this.result.length
    //  console.log(this.itemLength)
   })
   }


  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
