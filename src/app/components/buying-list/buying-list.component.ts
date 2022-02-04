import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-buying-list',
  templateUrl: './buying-list.component.html',
  styleUrls: ['./buying-list.component.scss'],
})
export class BuyingListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  list!: any;

  async ngOnInit() {
    let id = null;
    this.route.paramMap.subscribe((params) => {
      id = params.get('id');
    });
    console.log(`id:${id}`);
  }
}
