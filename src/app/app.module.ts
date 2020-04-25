import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';

import { httpInterCeptorProviders } from './http-interceptors';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { ConnectionsComponent } from './connections/connections.component';
import { TablesComponent } from './tables/tables.component';
import { ColumnsComponent } from './columns/columns.component';
import { PartsSidebarComponent } from './components/parts/sidebar/sidebar.component';
import { PartsIconComponent } from './parts/icon/icon.component';
import { PartsDialogComponent } from './parts/dialog/dialog.component';
import { PartsQueryComponent } from './parts/query/query.component';
import { PartsEditComponent } from './parts/edit/edit.component';
import { PaartsPagingComponent } from './parts/paging/paging.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    ConnectionsComponent,
    TablesComponent,
    ColumnsComponent,
    PartsSidebarComponent,
    PartsIconComponent,
    PartsDialogComponent,
    PartsQueryComponent,
    PartsEditComponent,
    PaartsPagingComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,

    MonacoEditorModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [httpInterCeptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
