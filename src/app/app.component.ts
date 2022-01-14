import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ApiService, User } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-buying-list';

  constructor(private api: ApiService) {}

  ngOnInit() {}
}
