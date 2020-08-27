import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  loading = true;
  color: ThemePalette = 'warn';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const response = this.authService.authenticatedUser()
    if (response) {
      response.subscribe();
    }
  }

}
