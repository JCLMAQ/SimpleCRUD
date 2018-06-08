import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './shared/material.module';
import { RoutingModule } from './app-routing.module';


import {StoreModule} from '@ngrx/store';


import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakersListComponent } from './speakers/speakers-list/speakers-list.component';
import { SpeakersDetailComponent } from './speakers/speakers-detail/speakers-detail.component';
import { SpeakersService } from './speakers/speakers-shared/speakers.service';

import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsService } from './items/items-shared/items.service';

import { ProductsComponent } from './products/products.component';
import { ProductService } from './products/product.service';

import { AlligatorreducerComponent } from './alligatorreducer/alligatorreducer.component';
import { todoReducer } from './alligatorreducer/reducers/todo.reducer';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, SpeakersComponent, SpeakersListComponent, SpeakersDetailComponent, ItemsComponent, ItemsListComponent, ItemDetailComponent, 
    ProductsComponent,
    AlligatorreducerComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    RoutingModule,
    StoreModule.forRoot({ todoReducer }),
  ],
  providers: [SpeakersService, ItemsService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
