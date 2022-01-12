import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShowUsersComponent } from './show-users/show-users.component';

@NgModule({
  declarations: [AppComponent, TestComponent, SignInComponent, ShowUsersComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
