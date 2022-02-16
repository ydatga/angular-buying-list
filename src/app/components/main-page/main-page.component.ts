import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import {} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCreateBuyingListComponent } from 'src/app/modal-create-buying-list/modal-create-buying-list.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

type BuyingList = {
  id: number;
  name: string;
  place: string;
  deadline: string;
};
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user = this.store.user;
  buying_list: BuyingList[] = [];
  constructor(
    private store: StoreService,
    public matdialog: MatDialog,
    private router: Router,
    private api: ApiService
  ) {}

  async ngOnInit() {
    if (!this.user.name) {
      this.router.navigateByUrl('/');
    } else {
      (
        await this.api.getLists(this.store.user.id!, this.store.user.token!)
      ).subscribe((value: any) => {
        this.buying_list = value.map((list: BuyingList) => list);
      });
    }
  }

  onClickCreateBuyingList() {
    const dialogConfig = new MatDialogConfig();
    const dialog = this.matdialog.open(
      ModalCreateBuyingListComponent,
      dialogConfig
    );
  }

  gotoList(id: number) {
    this.router.navigateByUrl(`/buying-list/${id}`);
  }

  onClickDelete(id: number) {}
}
