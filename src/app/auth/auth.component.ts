import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from '../shared/auth/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // defines properties
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
    ){}


  // Create observable
  authObs: Observable<AuthResponseData>;

  authSubmit(authForm: NgForm){

    // Validation Check
    if (!authForm.valid) return;

    // Destructure the form input values
    const {email, password } = authForm.value;

    // property used for loading animation
    this.isLoading = true;
    //Conditional to see what mode we are in
    if (this.isLoginMode) {
      // Sign in logic
      this.authObs = this.authService.login(email, password);
      console.log(this.authObs);
    } else {
      // Sign Up logic
      this.authObs = this.authService.signUp(email, password);
    }
    // Observable logic with error handling
    this.authObs.subscribe({
      next: (resData) => this.router.navigate(['/']),
      error: (resData) => console.log("error" + resData)
      });
      // Reset the form
    authForm.reset();
  }

  toggleSignIn(){
    this.isLoginMode = !this.isLoginMode;
  };

};
