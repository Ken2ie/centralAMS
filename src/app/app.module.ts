import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CongratulationsComponent } from './congratulations/congratulations.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LoadingInterceptor } from './loading.interceptor';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { RepsOnlyComponent } from './reps/reps-only/reps-only.component';
import { DashboardComponent } from './reps/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavTwoComponent } from './nav-two/nav-two.component';
import { GuardService } from './api/guard/guard.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './studentDashboard/login/login.component';
import { StudentdashboardComponent } from './studentDashboard/studentdashboard/studentdashboard.component';
import { HomeComponent } from './studentDashboard/studentdashboard/home/home.component';
import { NavPComponent } from './studentDashboard/studentdashboard/nav-p/nav-p.component';
import { LecturesComponent } from './studentDashboard/studentdashboard/lectures/lectures.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Export this function
export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    RegisterComponent,
    CongratulationsComponent,
    LoaderSpinnerComponent,
    RepsOnlyComponent,
    DashboardComponent,
    NavbarComponent,
    NavTwoComponent,
    LoginComponent,
    StudentdashboardComponent,
    HomeComponent,
    NavPComponent,
    LecturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }), 
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [GuardService, {
    // provide: HTTP_INTERCEPTORS, LocationStrategy, useClass: LoadingInterceptor && HashLocationStrategy, ,   
     provide: LocationStrategy && HTTP_INTERCEPTORS, useClass: HashLocationStrategy && LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
