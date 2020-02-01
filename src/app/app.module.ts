import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeLogInComponent } from './home-log-in/home-log-in.component';
import { AuthComponent } from './auth/auth.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AccountInfoComponent } from './home-log-in/account-info/account-info.component';
import { RoomsComponent } from './home-log-in/rooms/rooms.component';
import { UserRoomComponent } from './home-log-in/user-room/user-room.component';
import { HomeMenuComponent } from './home-log-in/home-menu/home-menu.component';
import { HomeContactComponent } from './home-log-in/home-contact/home-contact.component';
//  Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    HomeLogInComponent,
    AuthComponent,
    AddStudentComponent,
    AccountInfoComponent,
    RoomsComponent,
    UserRoomComponent,
    HomeMenuComponent,
    HomeContactComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
