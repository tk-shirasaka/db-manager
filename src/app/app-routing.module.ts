import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups/groups.component';
import { ConnectionsComponent } from './connections/connections.component';
import { TablesComponent } from './tables/tables.component';
import { ColumnsComponent } from './columns/columns.component';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: ':group', component: ConnectionsComponent },
  { path: ':group/:connection', component: TablesComponent },
  { path: ':group/:connection/:table', component: ColumnsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
