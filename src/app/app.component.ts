import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ApiService, User, res } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-buying-list';
  hello: Observable<res> | undefined;
  name: string = 'jiro';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.hello = this.api.hello$;
    this.hello.subscribe((next) => {
      this.name = next.users[0].name;
      console.log(JSON.stringify(next.users[0].name, null, '\t'));
    });
  }
}
