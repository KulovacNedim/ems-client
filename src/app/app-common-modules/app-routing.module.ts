import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';
import { AlreadyAuthGuard } from '../services/already-auth-gard.service';
import { StartupComponent } from '../auth/startup/startup.component';
import { AuthScreenComponent } from '../auth/auth-screen/auth-screen.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmailConfirmationComponent } from '../auth/email-confirmation/email-confirmation.component';

const appRoutes: Routes = [
    { path: '', component: StartupComponent },
    {
        path: 'auth', component: AuthScreenComponent,
        canActivate: [AlreadyAuthGuard],
        canActivateChild: [AlreadyAuthGuard],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'sign-in', component: SignInComponent },
            { path: 'email-confirmation/:email/:hash', component: EmailConfirmationComponent }
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
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}