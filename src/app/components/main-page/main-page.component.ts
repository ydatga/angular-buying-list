import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import {} from '@angular/material';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user = this.store.user;
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  onClickCreateBuyingList() {}
}
