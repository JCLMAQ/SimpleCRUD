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
//	private pItems;
	
	constructor(
		private wakandaService: WakandaService,
		private dialog: MatDialog
	){}



getProducts() {
		this.products = [];
		
        var that = this;
		this.wakandaService.getCatalog().then(ds=> {	   	
			ds['Product']
			.query()
			.then(res => {
				for(let entity of res['entities']) {				
							 //console.log(entity);
							 that.products.push({
			      				ID: entity['ID'],
			      				name: entity['name'],
			      				description: entity['description'],
			      				price: entity['price']
				      		});						
		    		}
		    	});	
		    }); 
		    
//		   this.pItems = this.products;
		   
     return this.products;   
    }

getProductByID(ID) {
 //  console.log('Product '+ ID + ' selected');
   return this.products.find(product => product.ID === Number(ID));
  }


addProduct(product: Product) {
	    // this.pItems.push(product);
	    // console.log(this.pItems);
	    this.newProduct(product.name, product.description,product.price);
    }
    
	newProduct(newProductName,newProductDescription,newPrice) {
        this.wakandaService.getCatalog().then(ds => {
            let product = ds['Product'].create({
                name: newProductName,
                description: newProductDescription,
                price: newPrice
            });

            product.save()
            .then(() => {
//                alert('saved')
//                console.log('Product '+ product['ID'] + ' created');
                this.products.push({
                    ID: product['ID'],
                    name: newProductName,
                    description: newProductDescription,
                     price:newPrice
                });
                newProductName = ""; //clear the input
                newProductDescription = "";
                newPrice = 0;
                
            });
        });
    }
    
    updateProduct(editedProduct){
 //   	console.log('Product '+ editedProduct.ID + ' selected'); 
    	var that=this;
    //	debugger;
    	
	 	this.wakandaService.getCatalog().then(ds=> {	
			ds ['Product'].find(editedProduct.ID).then(emp=>{
				emp.name = editedProduct.name;
				emp.description = editedProduct.description;
				emp.price = editedProduct.price;
				
				emp.save().then(function(){
//					console.log('Product ID :  '+ editedProduct.ID + ' updated');
				})
			});
	 	});
    	return this.products;
    }
    
    
    deleteProduct(product){   
 //  	console.log('Product '+ product.ID + ' selected');
    	//debugger;
    	var that=this;
	 	this.wakandaService.getCatalog().then(ds=> {	
			ds['Product'].find(product.ID).then(emp=> {
				emp.delete().then(function () {
//					alert('Product ID Deleted: ' + product.ID )
//			    	console.log('Product '+ product.ID + ' deleted');
				});
			});
	 	});
	 	var indexToFind = this.getProductByID(product.ID);
	 	this.products.splice(product.ID, 1);
	 	
	 	return this.products;
    }
}


