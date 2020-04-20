import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectionService } from '../../../connection.service';

@Component({
  selector: 'app-parts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class PartsSidebarComponent implements OnInit {

  public paths: { href: string[]; name: string; icon: string; }[] = [];
  public edit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if ("connection" in params) {
      this.connectionService.getConnection(params.connection).subscribe(connection => {
        this.paths.unshift({
          href: ["/"],
          name: connection.description,
          icon: "fa-folder-open"
        })
      });
    }
    if ("table" in params) {
      this.paths.push({
        href: ["/", params.connection],
        name: params.table,
        icon: "fa-list"
      })
    }
  }
}
