import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Permissions } from '../../permissions';
import { Connection, FormType } from '../../connection';
import { ConnectionService } from '../../connection.service';

@Component({
  selector: 'app-parts-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class PartsEditComponent implements OnInit {

  connection: Connection;

  permissions = Permissions;
  formTypes: {[k: string]: FormType} = {};

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.connectionService.getConnection(connection)
      .subscribe(connection => this.connection = Object.assign({}, connection));
    this.connectionService.getTypes()
      .subscribe(formTypes => this.formTypes = formTypes);
  }

  saveConnection(save: boolean): void {
    this.connectionService.saveConnection(save ? this.connection : null);
  }
}
