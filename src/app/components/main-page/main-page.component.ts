import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import {} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCreateBuyingListComponent } from 'src/app/modal-create-buying-list/modal-create-buying-list.component';
import { Router } from '@angular/router';
import { ApiService, BuyingList } from 'src/app/service/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user = this.store.user;
  buying_list: BuyingList[] = [];
  search: String = 'name';
  keyword: String = '';
  constructor(
    private store: StoreService,
    public matdialog: MatDialog,
    private router: Router,
    private api: ApiService
  ) {}

  async ngOnInit() {
    this.refresh();
  }

  onChangeSearch(e: any) {
    console.log(e.target.value);
    this.search = e.target.value;
  }

  async refresh() {
    if (!this.user.name) {
      this.router.navigateByUrl('/');
    } else {
      (
        await this.api.getLists(
          this.store.user.id!,
          this.store.user.token!,
          this.search,
          this.keyword
        )
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

  async delete(id: number) {
    return (
      await this.api.deleteList({ id, token: this.store.user.token! })
    ).pipe((x) => x);
  }

  async onClickDelete(id: number) {
    (await this.delete(id)).subscribe((value) => {
      this.refresh();
    });
  }

  async onClickSearch() {
    this.refresh();
  }
}
