import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public errorMessage = '';
  formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ '' || '', [Validators.required, Validators.email] ],
    password: [ '123456', Validators.required ],
  });

  constructor( 
    private fb:FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.formSubmitted = true;
    this.userService.userLogin(this.loginForm.value as LoginForm).subscribe({
      next: (resp:any) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.error.msg   
      }
    });
  }

  invalidField( field:string ): boolean {
    if ( this.loginForm.get(field)?.invalid && this.formSubmitted ) {
      return true
    } else { 
      return false;
    }
  }

}
