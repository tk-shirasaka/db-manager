import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';

import { httpInterCeptorProviders } from './http-interceptors';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { QueryComponent } from './query/query.component';
import { GroupsComponent } from './groups/groups.component';
import { ConnectionsComponent } from './connections/connections.component';
import { TablesComponent } from './tables/tables.component';
import { ColumnsComponent } from './columns/columns.component';
import { PartsSidebarComponent } from './components/parts/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    QueryComponent,
    GroupsComponent,
    ConnectionsComponent,
    TablesComponent,
    ColumnsComponent,
    PartsSidebarComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    MonacoEditorModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [httpInterCeptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
