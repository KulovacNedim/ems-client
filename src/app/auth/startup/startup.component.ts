import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  loading = true;
  color: ThemePalette = 'warn';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const response = this.authService.autoLogin();
    if (response) {
      response.subscribe(() => {
        this.router.navigate(["/dashboard"]);
      });
    }
  }

}
