import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../user.model'
import { Router } from '@angular/router';

const AUTH_API_KEY = "AIzaSyCTarHDVFblmk4JYnaHUl8kFI9TYhycQk8";
const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

export interface AuthResponseData {
  kind: string;
  userId: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  idToken: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router){}

  signUp(email: string, password: string) {
    console.log("Sending Email + Password:", email , password)
    return this.http
    .post<AuthResponseData>(
      SIGN_UP_URL + AUTH_API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
    tap(resData => {
      console.log("resData: ", resData);
      // Destructuring the response values
      const { email, userId, idToken, expiresIn } = resData
          // pass res values into handleAuthentication
      this.handleAuthentication(email, userId, idToken, +expiresIn)
    }))
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
      SIGN_IN_URL + AUTH_API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        tap(resData => {
      const { email, userId, idToken, expiresIn } = resData;
      console.log("Login resData", resData);
      this.handleAuthentication(email, userId, idToken, +expiresIn);
      console.log("UserData: ", this.user)
    }));
  }

  logout() {
    this.user.next(null);
  }


  private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number) {
      console.log("Handle Authentication!")
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
        email,
        userId,
        idToken,
        expirationDate)
      this.user.next(user);
      console.log(user);

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return errorMessage;
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already'
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.'
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Incorrect Username or Password'
            break;
      }
      return errorMessage;
  }
}
