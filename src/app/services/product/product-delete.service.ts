import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductDeleteService {

  constructor(private http: HttpClient) { }

  delete(id: string){
    return firstValueFrom(
      this.http.delete(`${environment.api_endpoint}/product/${id}`)
    );
  }
}
