import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-confirm-finish-modal',
  templateUrl: './confirm-finish-modal.component.html',
  styleUrls: ['./confirm-finish-modal.component.scss'],
})
export class ConfirmFinishModalComponent implements OnInit {
  constructor(
    public _dialogRef: MatDialogRef<ConfirmFinishModalComponent>,
    public api: ApiService,
    public store: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.store.user.name) {
      this._dialogRef.close();
    }
  }
  user_id = this.store.user.id ? (this.store.user.id as number) : null;

  listName: string = '';
  place: string = '';
  deadline: string = '';

  // ダイアログを閉じる
  onClickCancel() {
    this._dialogRef.close();
  }
  onClickConfirm() {
    this._dialogRef.close();
  }
}
