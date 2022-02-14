import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
    public store: StoreService
  ) {}
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
      if (value.success) {
        localStorage.setItem(`${environment.APP_NAME}_user_id`, value.id);
        localStorage.setItem(`${environment.APP_NAME}_user_name`, value.name);
        localStorage.setItem(`${environment.APP_NAME}_token`, value.token);
        this.store.refreshData();
        this.router.navigateByUrl('main');
      }
    });
  }
}
