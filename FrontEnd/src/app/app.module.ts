import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AddEditContactComponent } from './contact/add-edit-contact/add-edit-contact.component';
import { ShowContactComponent } from './contact/show-contact/show-contact.component';
import { DetailContactComponent } from './contact/detail-contact/detail-contact.component';
import { ContactApiService } from './contact-api.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ShowContactComponent,
    DetailContactComponent,
    AddEditContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
