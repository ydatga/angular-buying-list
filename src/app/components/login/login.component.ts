import { Component, OnInit } from '@angular/core';

type BuyingList = {
  name: string;
  place: string;
  deadline: string;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
