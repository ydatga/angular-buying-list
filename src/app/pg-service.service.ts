import { Injectable } from '@angular/core';
import { Pool, Client } from 'pg';

@Injectable({
  providedIn: 'root',
})
export class PgServiceService {
  constructor(private client: Client) {
    this.client = new Client({
      host: 'ec2-52-86-177-34.compute-1.amazonaws.com',
      database: 'dao1khuvdt51k',
      user: 'sujwaphpdhhilw',
      password:
        '1f20602f67ed91a5555cee0f025b05cc4b4bd54892687e6281a269446a15fada',
    });
    client.connect();
  }

  // async test() {
  //   const result = await this.client.query('SELECT * FROM "users"');
  //   console.log(result);
  // }
}
