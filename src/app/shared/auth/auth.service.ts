import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const AUTH_API_KEY = "";
const SIGN_UP_URL = "";
const SIGN_IN_URL = "";


Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient){}

  signUp(email: String, password: string) {
    return this.http.post(SIGN_UP_URL + AUTH_API_KEY, {
    email,
    password,
    returnSecureToken: true
  });
  }
}
