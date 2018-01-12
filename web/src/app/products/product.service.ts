import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Product } from './product.model';

import { findIndex } from 'lodash';

import {WakandaService} from '../wakanda.service';

import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../shared/confirm/confirm.component';



@Injectable()
export class ProductService {

    private products: Product[] = [];
    private items;
    private count: number;

    constructor(
        private wakanda: WakandaService,
        private dialog: MatDialog
    ) {}

async getClass() {
    const ds = await this.wakanda.catalog();
    return ds.Product;
  }

async getProducts(opts: {
        pageSize: number;
        start: number;
        filter?: string;
        params?: (string)[];
        orderBy?: string
    } = {
        pageSize: 10,
        start: 0
    }): Promise<Product[]> {
        const Product = await this.getClass();
        const res = await Product.query(opts);
    return res.entities;
  }

getProductByID(ID) {
   return this.products.find(product => product.ID === Number(ID));
  }


addProduct(product: Product) {
    // console.log(this.pItems);
    this.newProduct(product.name, product.description, product.price);
    }

async newProduct(newProductName, newProductDescription, newPrice) {
    const ds = await this.wakanda.catalog();
    const product = ds['Product'].create({
            name: newProductName,
            description: newProductDescription,
            price: newPrice
        });
        return  await product.save();
}

    updateProduct(editedProduct) {
        const that = this;
// debugger;
        this.wakanda.catalog().then(ds => {
            ds ['Product'].find(editedProduct.ID).then(emp => {
                emp.name = editedProduct.name;
                emp.description = editedProduct.description;
                emp.price = editedProduct.price;
                emp.save().then(function(){
                });
            });
        });
        return this.products;
    }


    async deleteProduct(product) {
// debugger;
        const that = this;
        const ds = await this.wakanda.catalog();
        const producttofind = ds['Product'].find(product.ID).then(emp => {
                emp.delete().then(function () {
            // alert('Product ID Deleted: ' + product.ID );
                });
            });
        const indexToFind = this.getProductByID(product.ID);
        this.products.splice(product.ID, 1);

        return this.products;
    }

}


