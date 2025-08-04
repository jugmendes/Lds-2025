import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReadService } from './user-read.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User } from '../../domain/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient,
              private userReadService: UserReadService
  ) {}

  async update(id: string, fullname: string): Promise<any>{
    let userToUpdate : User = await this.userReadService.findById(id);
    if(userToUpdate == null){
      throw new Error('Usuário não encontrado');
    }

    userToUpdate.fullname = fullname;

    return firstValueFrom(this.http.put<any>(`${environment.api_endpoint}/user${id}`, userToUpdate));
  }

  async updatePassword(id: string, oldPasswrod: string, newPassword: string): Promise<any> {
    let userToUpdate: User = await this.userReadService.findById(id);
    if(userToUpdate == null){
      throw new Error("Usuario nao encontrado");
    }

    if(oldPasswrod !== userToUpdate.password){
      throw new Error("Senha antiga invalida");
    }

    let data = {
      password: newPassword
    };

    return await  firstValueFrom(this.http.put<any>(`${environment.api_endpoint}/user/password/${id}`, data));
  }
}
