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
  formTypes: FormType[] = [];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connection = Object.assign({}, this.connection);
    this.connectionService.getTypes()
      .subscribe(formTypes => this.formTypes = formTypes);
  }

  saveConnection(): void {
    this.connectionService.getConnections().subscribe(connections => {
      connections[this.index] = this.connection;
      this.connectionService.saveConnection(connections).subscribe(_ => location.reload());
    });
  }
}
