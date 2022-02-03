import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import {} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCreateBuyingListComponent } from 'src/app/modal-create-buying-list/modal-create-buying-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user = this.store.user;
  constructor(
    private store: StoreService,
    public matdialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.user.name) {
      this.router.navigateByUrl('/');
    }
  }

  onClickCreateBuyingList() {
    const dialogConfig = new MatDialogConfig();
    const dialog = this.matdialog.open(
      ModalCreateBuyingListComponent,
      dialogConfig
    );
  }
}
