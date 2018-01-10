import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import {Product} from './product.model';
import { clone } from 'lodash';

import {WakandaService} from '../wakanda.service';

@Component({
  selector: 'app-products',
  providers:[WakandaService, ProductService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  private products: Product[] = [];
  
  productForm: boolean = false;
  editProductForm: boolean = false;
  isNewForm: boolean;
  newProduct: any = {};
  editedProduct: any = {};

  constructor(
  	private productService: ProductService, 
  	public wakandaService: WakandaService) { }

  ngOnInit() {
//	this.products = this.productService.getProducts();
	this.refreshTheList();
  //	debugger;
  }
  
  showEditProductForm(product: Product) {
    if(!product) {
      this.productForm = false;
      return;
    }
    this.editProductForm = true;
    this.editedProduct = clone(product);
    this.refreshTheList();
  }

  showAddProductForm() {
    // resets form if edited product
    if(this.products.length) {
      this.newProduct = {};
    }
    this.productForm = true;
    this.isNewForm = true;
  }

  saveProduct(product: Product) {
    if(this.isNewForm) {
      // add a new product
      this.productService.addProduct(product);
    }
    this.productForm = false;
     this.refreshTheList();
  }

  removeProduct(product: Product) {
    this.productService.deleteProduct(product);
    this.refreshTheList();
  }

  updateProduct(product:Product) {
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
  
  refreshTheList(){
  	this.products=[];
  	this.products = this.productService.getProducts();
  }
}

