import { Injectable } from '@angular/core';
import { UserCredentialDto } from '../../domain/dto/user-credential-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(credentials: UserCredentialDto) : Observable<any>{
    console.log("Autenticando o usuario");

    const headers = new HttpHeaders({
      "Content-type" : "application/json"
    });

    const body ={
      email: credentials.email,
      password: credentials.password,
    }

    return this.http.get<any>(`${environment.authentication_api_endpoint}/api/user/1`);
  }

  isAuthenticated(){

    let email = localStorage.getItem("email");
    if(email != null){
      console.log(`email encontrado: ${email}`);
      return true;
    }

     return false;
  }

  addDataToLocalStorage(user: UserCredentialDto){
    console.log("adicionando dados no cache...");
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.password);
  }

  logout(){
    localStorage.clear();
  }
}
