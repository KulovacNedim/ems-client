import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // isAuthentcated$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.isAuthentcated$ = this.authService.isAuthentcated;
  }

  onLogout(){
    this.authService.logout();
  }

}
