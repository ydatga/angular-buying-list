import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCreateBuyingListComponent } from './modal-create-buying-list/modal-create-buying-list.component';
import { BuyingListComponent } from './components/buying-list/buying-list.component';
import { ConfirmFinishModalComponent } from './modals/confirm-finish-modal/confirm-finish-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignInComponent,
    ShowUsersComponent,
    LoginComponent,
    MainPageComponent,
    ModalCreateBuyingListComponent,
    BuyingListComponent,
    ConfirmFinishModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
