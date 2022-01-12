import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss'],
})
export class ShowUsersComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    var mes: string;
  }

  ngOnInit(): void {}

  onClickShow() {
    console.log(JSON.stringify(this.httpClient.get('api/show'), null, '\t'));
  }
}
