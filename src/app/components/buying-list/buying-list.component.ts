import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
    public store: StoreService
  ) {}

  list!: BuyingList;
  list_id!: number;
  itemName: string = '';
  itemPrice: number = 0;
  itemNum: number = 0;

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
      this.list = value.value;
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
      }
    );
  }
}
