import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, users } from '../service/api.service';
import { User } from '../types';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss'],
})
export class ShowUsersComponent implements OnInit {
  constructor(private httpClient: HttpClient, private api: ApiService) {
    var mes: string;
  }
  usersObserver: Observable<users> | undefined;
  users: User[] = [];

  ngOnInit(): void {
    this.usersObserver = this.api.users$;
  }

  onClickShow() {
    this.usersObserver?.subscribe((next) => {
      this.users = [...next.users];
    });
  }

  async delete(id: number) {
    return (await this.api.deleteUser(id)).pipe((x) => x);
  }

  async onClickDelete(id: number) {
    await (
      await this.delete(id)
    ).subscribe((next) => {
      this.onClickShow();
    });
  }
}
