import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeLogInComponent } from './home-log-in/home-log-in.component';
import { AuthComponent } from './auth/auth.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AuthGuard } from './shared/auth.guard';
import { AccountInfoComponent } from './home-log-in/account-info/account-info.component';
import { RoomsComponent } from './home-log-in/rooms/rooms.component';
import { UserRoomComponent } from './home-log-in/user-room/user-room.component';
import { HomeContactComponent } from './home-log-in/home-contact/home-contact.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'loggedIn',
    component: HomeLogInComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/loggedIn/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'account-info', component: AccountInfoComponent},
      {path: 'rooms', component: RoomsComponent},
      {path: 'contact', component: HomeContactComponent},
      {path: 'user-room', component: UserRoomComponent},
      {path: 'reg', component: AddStudentComponent},
      {path: 'auth', component: AuthComponent}
    ]
  },
  {path: 'home', component: HomeComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
