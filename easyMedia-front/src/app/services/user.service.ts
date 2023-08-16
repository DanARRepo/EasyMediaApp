import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = (environment.production) ? environment.prod_url : environment.dev_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private http:HttpClient,
    private router:Router
  ) { }

  validateToken(): Observable<boolean>  {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'token': token
      }
    }).pipe(
      tap( (resp:any) => localStorage.setItem('token', resp.token) ),
      map( resp => true ),
      catchError(err => of(false))
    );
  }

  createUser(formData:RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap( (resp: any) => localStorage.setItem('token',resp.token) )
      );
  }

  userLogin( formDta:LoginForm ) {
    return this.http.post(`${base_url}/auth/login`, formDta)
      .pipe(
        tap( (resp:any) => localStorage.setItem('token',resp.token) )
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
