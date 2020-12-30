import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-common-modules/app-routing.module';
import { AppMaterialModule } from './app-common-modules/app-material.module';

import { AppComponent } from './app.component';
import { AuthScreenComponent } from './auth/auth-screen/auth-screen.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartupComponent } from './auth/startup/startup.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { notificationsReducer } from './dashboard/app-bar/notifications/store/notifications.reducer';

import { AuthGuard } from './services/auth-guard.service';
import { AlreadyAuthGuard } from './services/already-auth-gard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';

import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RECAPTCHA_LANGUAGE,
} from 'ng-recaptcha';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { AppBarComponent } from './dashboard/app-bar/app-bar.component';
import { LeftMenuComponent } from './dashboard/left-menu/left-menu.component';
import { SidenavService } from './services/sidenav.service';
import { RoleNotSetComponent } from './role-not-set/role-not-set.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { from } from 'rxjs';
import { NotificationsComponent } from './dashboard/app-bar/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    StartupComponent,
    AuthScreenComponent,
    NotFoundComponent,
    EmailConfirmationComponent,
    AppBarComponent,
    LeftMenuComponent,
    RoleNotSetComponent,
    NotificationsComponent,
  ],
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      notifications: notificationsReducer,
    }),
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlreadyAuthGuard,
    SidenavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Lcvn8cZAAAAAJfOWmk4M1trV-MH56grl5iaE635',
        size: 'invisible',
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'hr',
    },
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
