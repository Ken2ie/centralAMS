import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, filter } from 'rxjs';
import { RegisterService } from '../register.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private register : RegisterService, private router : Router) { }
  

  canActivate(): Observable <boolean> {
    return this.register.currentUser$.pipe(
      filter((currentUser) => currentUser !== undefined),
      map((currentUser) => {
      if(!currentUser){
        this.router.navigate(['repsOnly']);
        return false;
      }
     else if(currentUser){
        this.router.navigate(['dashboard']);
        return true
      }
      return true;
    })
    ); 
  }
  
  
}