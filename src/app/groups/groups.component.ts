import { Component, OnInit } from '@angular/core';

import { Group, GroupService } from '../service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  addGroup() {
    const group = new Group
    group.select = true;
    this.groups = this.groups.map(group => {
      group.select = false;
      return group;
    })
    this.groups.push(group);
  }

  deleteGroup(no: number) {
    this.groups.splice(no, 1);
    this.saveGroups();
  }

  setGroup(no: number) {
    this.groupService.setGroup(no);
  }

  saveGroups() {
    this.groupService.saveGroups(this.groups);
  }
}
