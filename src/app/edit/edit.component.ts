import { Component, OnInit } from '@angular/core';

import { Permissions } from '../permissions';
import { Connection, FormType } from '../connection';
import { ParamsService } from '../params.service';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  connection: Connection;

  permissions = Permissions;
  formTypes: {[k: string]: FormType} = {};

  constructor(
    private paramsService: ParamsService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
    this.paramsService.getParams()
      .subscribe(params => this.connection = Object.assign({}, params.connection));
    this.connectionService.getTypes()
      .subscribe(formTypes => this.formTypes = formTypes);
  }

  saveConnection(save: boolean): void {
    this.connectionService.saveConnection(save ? this.connection : null);
  }
}
