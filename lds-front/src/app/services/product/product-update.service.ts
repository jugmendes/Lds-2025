import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductReadService } from './product-read.service';
import { Product } from '../../domain/model/product';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  constructor(
    private http: HttpClient,
    private productReadService: ProductReadService
  ) { }

  async update(id: string, name: string, price: string){
    let productToUpdate: Product = await this.productReadService.findById(id);
    if(productToUpdate == null){
      throw new Error("produto não encontrado");
    }

    productToUpdate.name = name;
    productToUpdate.price = price;
    
    return firstValueFrom(this.http.put<any>(`${environment.api_endpoint}/product/${id}`, productToUpdate));
  }
}
