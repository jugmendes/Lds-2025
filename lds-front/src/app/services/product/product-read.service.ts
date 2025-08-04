import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user';
import { environment } from '../../../environment/environment.development';
import { Product } from '../../domain/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductReadService {

  constructor(private http: HttpClient) { }

  findAll(): Promise<any>{
  
      // para consumir este metodo, basta utilizar a palavra chave: await
      // exemplo:
      // let variavel = await userReadService.findAll();
  
      return  firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/product`));
    }
  
    findById(id : string): Promise<Product>{
      return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/product/${id}`))
    }
  
    findByEmail(email : string): Promise<Product>{
      return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/product?email=${email}}`))
    }
}
