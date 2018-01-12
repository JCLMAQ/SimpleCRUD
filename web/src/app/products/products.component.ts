import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import {Product} from './product.model';
import { clone } from 'lodash';

import {WakandaService} from '../wakanda.service';

@Component({
  selector: 'app-products',
  providers: [WakandaService, ProductService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  private products: Product[] = [];

  productForm = false;
  editProductForm = false;
  isNewForm: boolean;
  newProduct: any = {};
  editedProduct: any = {};

  constructor(
    private productService: ProductService,
    public wakanda: WakandaService) { }

  ngOnInit() {
    this.refreshTheList();
  }

  showEditProductForm(product: Product) {
    if (!product) {
      this.productForm = false;
      return;
    }
    this.editProductForm = true;
    this.editedProduct = clone(product);
    this.refreshTheList();
  }

  showAddProductForm() {
    // resets form if edited product
    if (this.products.length) {
      this.newProduct = {};
      }
      this.productForm = true;
      this.isNewForm = true;
  }

  async saveProduct(product: Product) {
// debugger;
   if (this.isNewForm) {
      // add a new product
     await this.productService.addProduct(product);
    }
    this.productForm = false;
    this.refreshTheList();
  }

  async removeProduct(product: Product) {
    await  this.productService.deleteProduct(product);
    this.refreshTheList();
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product);
    this.editProductForm = false;
    this.editedProduct = {};
    this.refreshTheList();
  }

  cancelNewProduct() {
    this.newProduct = {};
    this.productForm = false;
  }

  cancelEdits() {
    this.editedProduct = {};
    this.editProductForm = false;
  }

 async refreshTheList() {
  // this.products=[];
    this.products = await this.productService.getProducts();
  }
}

