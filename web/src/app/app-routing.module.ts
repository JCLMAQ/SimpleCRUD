import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakersListComponent } from './speakers/speakers-list/speakers-list.component';
import { SpeakersDetailComponent } from './speakers/speakers-detail/speakers-detail.component';

import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';

import { ProductsComponent } from './products/products.component';
import {AlligatorreducerComponent} from './alligatorreducer/alligatorreducer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },

  { path: 'speakers', component: SpeakersComponent, children: [
    { path: 'speakersList', component: SpeakersListComponent, outlet: 'list' },
    { path: ':id', component: SpeakersDetailComponent, outlet: 'bio' }
  ] },
  { path: 'items', component: ItemsComponent, children: [
    { path: 'itemsList', component: ItemsListComponent, outlet: 'listItems' },
    { path: ':id', component: ItemDetailComponent, outlet: 'itemDetail' }
  ] },
  
  { path: 'products', component: ProductsComponent },
  { path: 'alligatorReducer', component: AlligatorreducerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }