import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';

import { RegisterForm } from '../../interfaces/register-form.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: [ '', Validators.required ],
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', Validators.required ],
    password2: [ '', Validators.required ],
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {}

  createUser() {
    if (this.registerForm.invalid) return;

    this.userService.createUser( (this.registerForm.value as RegisterForm) ).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err:any) => {
        console.error(err);
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  samePasswords( passName1:string, passName2:string ) {
    return (FormGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control: FormControl = FormGroup.get(passName1) as FormControl;
      const pass2Control: FormControl = FormGroup.get(passName2) as FormControl;
 
      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ isNotEqual: true });
        return { isNotEqual: true };
      } else {
        pass2Control?.setErrors(null);
        return null;
      }
    };
  }


}
