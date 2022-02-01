import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}
  id: string = '';
  pass: string = '';

  ngOnInit(): void {}

  onClickSignIn() {
    this.router.navigateByUrl('sign-in');
  }

  onClickShowUser() {
    this.router.navigateByUrl('users');
  }

  async onClickLogin() {
    (await this.api.login(this.id, this.pass)).subscribe((value) => {
      console.log(value);
    });
  }
}
