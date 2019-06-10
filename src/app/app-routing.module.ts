import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionsComponent } from './connections/connections.component';
import { TablesComponent } from './tables/tables.component';
import { ColumnsComponent } from './columns/columns.component';

const routes: Routes = [
  { path: '', component: ConnectionsComponent },
  { path: ':connection', component: TablesComponent },
  { path: ':connection/:table', component: ColumnsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
