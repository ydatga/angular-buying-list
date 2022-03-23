import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmFinishModalComponent } from 'src/app/modals/confirm-finish-modal/confirm-finish-modal.component';
import { ApiService, BuyingList } from 'src/app/service/api.service';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-buying-list',
  templateUrl: './buying-list.component.html',
  styleUrls: ['./buying-list.component.scss'],
})
export class BuyingListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public store: StoreService,
    public matdialog: MatDialog
  ) {}

  list!: BuyingList;
  list_id!: number;
  itemName: string = '';
  itemPrice: number = 0;
  itemNum: number = 0;
  totalPrice: number = 0;
  checkCnt: number = 0;

  async ngOnInit() {
    let id: string | null;
    this.route.paramMap.subscribe((params) => {
      id = params.get('id');
      if (!id) {
        this.router.navigateByUrl('/main');
      }
      this.list_id = parseInt(id!);
    });
    this.loadList();
  }

  async loadList() {
    (
      await this.api.getList(this.list_id, {
        user_id: this.store.user.id!,
        token: this.store.user.token!,
      })
    ).subscribe((value) => {
      this.totalPrice = 0;
      this.checkCnt = 0;
      this.list = value.value;
      const item = value.value.items;
      item.forEach((elem: any) => {
        this.totalPrice += elem.price;
        if (elem.check) this.checkCnt++;
      });
      if (
        this.checkCnt === this.list.items.length &&
        this.list.items.length > 0
      ) {
        this.showFinish();
      }
      console.log(this.list);
    });
  }
  async delete(id: number) {
    return (
      await this.api.deleteThing({ id, token: this.store.user.token! })
    ).pipe((x) => x);
  }

  async deleteItem(id: number) {
    (await this.delete(id)).subscribe((value) => {
      this.loadList();
    });
  }

  async addItem() {
    (
      await this.api.createThing({
        create_info: {
          list_id: this.list_id,
          name: this.itemName,
          price: this.itemPrice,
          count: this.itemNum,
        },
        authInfo: {
          user_id: this.store.user.id!,
          token: this.store.user.token!,
        },
      })
    ).subscribe((value) => {
      this.itemName = '';
      this.itemPrice = 0;
      this.itemNum = 0;
    });
    this.loadList();
  }

  async toggle(id: number) {
    (await this.api.toggle({ id, token: this.store.user.token! })).subscribe(
      (value) => {
        console.log(value);
        this.loadList();
      }
    );
  }

  async onChangeName(e: any) {
    await (
      await this.api.updateList({
        id: this.list_id,
        token: this.store.user.token!,
        updateInfo: { name: e.target.value },
      })
    ).subscribe((value) => {
      console.log(value);
    });
  }
  async onChangePlace(e: any) {
    await (
      await this.api.updateList({
        id: this.list_id,
        token: this.store.user.token!,
        updateInfo: { place: e.target.value },
      })
    ).subscribe((value) => {
      console.log(value);
    });
  }
  async onChangeDate(e: any) {
    await (
      await this.api.updateList({
        id: this.list_id,
        token: this.store.user.token!,
        updateInfo: { deadline: e.target.value },
      })
    ).subscribe((value) => {
      console.log(value);
    });
  }

  showFinish() {
    const dialogConfig = new MatDialogConfig();
    const dialog = this.matdialog.open(
      ConfirmFinishModalComponent,
      dialogConfig
    );
  }
}
