import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  loading: boolean = true;
  errMsg: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.confirmEmail(this.route.snapshot.paramMap.get("email"), this.route.snapshot.paramMap.get("hash"))
      .subscribe(
        succ => {
          this.authService.succMsg.next(succ.body.message);
          this.router.navigate(["/auth/sign-in"]);
        },
        err => {
          if (err.status === 409) this.errMsg = `Error: ${err.error.message}. Please register again or contact the application administrator.`;
          if (err.status !== 409) this.errMsg = "Error occured. Please try again.";
          this.loading = false;
        }
      )
  }

  redirectToSignUp() {
    this.router.navigate(["/auth/sign-up"]);
  }

}
