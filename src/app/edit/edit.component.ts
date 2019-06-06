import { Component, OnInit, Input } from '@angular/core';

import { Permissions } from '../permissions';
import { Connection, FormType } from '../connection';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() index: number;
  @Input() connection: Connection;

  permissions = Permissions;
  formTypes: {[k: string]: FormType} = {};

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connection = Object.assign({}, this.connection);
    this.connectionService.getTypes()
      .subscribe(formTypes => this.formTypes = formTypes);
  }

  saveConnection(save: boolean): void {
    this.connectionService.getConnections().subscribe(connections => {
      connections = connections.slice(0);
      save ? connections.splice(this.index, 1, this.connection) : connections.splice(this.index, 1);
      this.connectionService.saveConnection(connections).subscribe(_ => location.reload());
    });
  }
}
