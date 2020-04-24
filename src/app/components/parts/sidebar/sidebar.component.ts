import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupService } from '../../../group.service';
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
    private groupService: GroupService,
    private connectionService: ConnectionService,
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if ("group" in params) {
      this.groupService.getGroups().subscribe(groups => {
        this.paths.push({
          href: ["/"],
          name: groups[params.group].description,
          icon: "fa-folder-open"
        })
      });
    }
    if ("connection" in params) {
      this.connectionService.getConnection(params.connection).subscribe(connection => {
        this.paths.splice(1, 0, {
          href: ["/", params.group],
          name: connection.description,
          icon: "fa-folder-open"
        });
      });
    }
    if ("table" in params) {
      this.paths.push({
        href: ["/", params.group, params.connection],
        name: params.table,
        icon: "fa-list"
      })
    }
  }
}
