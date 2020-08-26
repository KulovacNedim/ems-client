import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  loading = true;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    const response = this.auth.authenticatedUser()
    if (response) {
        response.subscribe((user: any) => {
        // if no user, display error msg
      });
    }
  }

}
