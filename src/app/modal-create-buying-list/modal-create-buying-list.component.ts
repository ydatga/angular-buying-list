import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-modal-create-buying-list',
  templateUrl: './modal-create-buying-list.component.html',
  styleUrls: ['./modal-create-buying-list.component.scss'],
})
export class ModalCreateBuyingListComponent implements OnInit {
  constructor(
    public _dialogRef: MatDialogRef<ModalCreateBuyingListComponent>,
    public api: ApiService,
    public store: StoreService,
    private router: Router
  ) {}
  user_id = this.store.user.id ? (this.store.user.id as number) : null;

  listName: string = '';
  place: string = '';
  deadline: string = '';
  ngOnInit(): void {
    if (!this.store.user.name) {
      this._dialogRef.close();
    }
  }

  // ダイアログを閉じる
  onClickCancel() {
    this._dialogRef.close();
  }

  async onClickCreate() {
    (
      await this.api.createList({
        user_id: this.user_id!,
        name: this.listName,
        place: this.place,
        deadline: this.deadline,
      })
    ).subscribe((value) => {
      console.log(value);
      this.router.navigateByUrl(`/buying-list/${value.id}`);
      this._dialogRef.close();
    });
  }
}
