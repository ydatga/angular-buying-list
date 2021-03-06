import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(public apiService: ApiService) {}
  name: string = '';
  id: string = '';
  pass: string = '';

  ngOnInit(): void {}

  async onClickSubmit() {
    await (
      await this.apiService.createUser({
        name: this.name,
        login_id: this.id,
        pass: this.pass,
      })
    ).subscribe();
    console.log('onClickSubmit');
  }
}
