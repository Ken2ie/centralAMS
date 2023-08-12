import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeroComponent } from './hero/hero.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { RepsOnlyComponent } from './reps/reps-only/reps-only.component';
import { DashboardComponent } from './reps/dashboard/dashboard.component';
import { GuardService } from './api/guard/guard.service';
import { StudentdashboardComponent } from './studentDashboard/studentdashboard/studentdashboard.component';
import { LoginComponent } from './studentDashboard/login/login.component';

const routes: Routes = [
  {path: '' , component : HeroComponent},
  {path: 'register' , component : RegisterComponent},
  {path: 'congratulations' , component : CongratulationsComponent},
  {path: 'repsOnly' , component : RepsOnlyComponent},
  {path: "dashboard", component : DashboardComponent},
  {path: "studentDashboard", component : StudentdashboardComponent},
  {path: "login", component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
