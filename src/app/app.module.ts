import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {
  RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings,
  RECAPTCHA_LANGUAGE
} from 'ng-recaptcha';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthGuard } from './auth/auth-guard.service';
import { AlreadyAuthGuard } from './auth/already-auth-gard.service';
import { AuthService } from './auth/auth.service';
import { StartupComponent } from './auth/startup/startup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthScreenComponent } from './auth/auth-screen/auth-screen.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: StartupComponent },
  {
    path: 'auth', component: AuthScreenComponent,
    canActivate: [AlreadyAuthGuard],
    canActivateChild: [AlreadyAuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sign-in', component: SignInComponent }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    StartupComponent,
    AuthScreenComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [AuthService,
    AuthGuard,
    AlreadyAuthGuard,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Lcvn8cZAAAAAJfOWmk4M1trV-MH56grl5iaE635', size: 'invisible' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'hr',

    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
