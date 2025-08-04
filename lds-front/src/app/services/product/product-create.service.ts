import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../domain/model/product';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService {

  constructor(private http: HttpClient) { }

  create(product: Product){
    console.log(product);
    return this.http.post(`${environment.api_endpoint}/product`, product);
  }
  
}