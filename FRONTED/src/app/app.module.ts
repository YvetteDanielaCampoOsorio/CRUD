import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GetRowsComponent } from './get-rows/get-rows.component';
import { AddRowComponent } from './add-row/add-row.component';
import { UpdateRowComponent } from './update-row/update-row.component';
import { DeleteRowComponent } from './delete-row/delete-row.component';

@NgModule({
  declarations: [
    AppComponent,
    GetRowsComponent,
    AddRowComponent,
    UpdateRowComponent,
    DeleteRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
