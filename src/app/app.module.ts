import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AceEditorModule } from 'ng2-ace-editor';

import { httpInterCeptorProviders } from './http-interceptors';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { QueryComponent } from './query/query.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    QueryComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    AceEditorModule,
  ],
  providers: [httpInterCeptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
