import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {};

  onLogout() {
    console.log("Before Log-out: ", this.authService.user);
    this.authService.logout;
    console.log("After Log-Out: ", this.authService.user);
    this.isAuthenticated = !this.isAuthenticated;
    this.router.navigate(['auth']);
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user
        // where !! means not-not where !user is not the user, and !!user is not- not the user.
});
}}
