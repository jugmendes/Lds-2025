import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDeleteService } from '../../../../services/product/product-delete.service';

import { FontAwesomeModule } from '@Fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../../domain/model/product';


@Component({
  selector: 'app-product-list',
  imports: [
    FontAwesomeModule,
    RouterLink,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  
  fa = fontawesome;

  products: Product[] = [];

  constructor(
    private productReadService: ProductReadService,
    private toastrService : ToastrService,
    private productDeleteService: ProductDeleteService
  ){}

  ngOnInit(): void {
    this.loadProducts()
  }

  async loadProducts(){
    console.log("preparando para obter os produtos");
  
    let producList = await this.productReadService.findAll();
    if(producList == null){
      console.log("nenhum produto encontraddo");
      return;
    }

    this.products = producList;

    console.log(this.products);

    console.log("produtos obtidos com sucesso");
  }

  async deleteProduct(productId: string){
    try{
      console.log(`removendo o produto com id: ${productId}`);
      console.log("produto removido com sucesso");
      
      await this.productDeleteService.delete(productId);

      this.toastrService.success("produto removido com sucesso");

    }catch(error){
      console.log(error);
      
    }
  }

}
