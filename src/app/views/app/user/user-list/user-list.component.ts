import { Component, OnInit } from '@angular/core';
import { UserReadService } from '../../../../services/user/user-read.service';
import { User } from '../../../../domain/model/user';

import { FontAwesomeModule } from '@Fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons'

import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDeleteService } from '../../../../services/user/user-delete.service';


@Component({
  selector: 'app-user-list',
  imports: [FontAwesomeModule, RouterLink ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  fa = fontawesome;

  users: User[] = [];

  constructor(
    private userReadService: UserReadService,
    private toastrService: ToastrService,
    private userDeleteService: UserDeleteService  
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(){
    console.log("preparando para obter os usuarios");
    
    let userList = await this.userReadService.findAll();
    if(userList == null){
      console.log("nenhum usuario encontrado");
      return;
    }

    this.users = userList;

    console.log(this.users);

    console.log("usuarios obtidos com sucesso");
  }

  async deleteUser(userId: string){
    try{
      console.log(`removendo o usuario com id: ${userId}`);
      console.log("usuario removido com sucesso");
  
      await this.userDeleteService.delete(userId);

      this.toastrService.success("usuario removido com sucesso!")

      this.loadUsers();
    } catch(error){
      console.log(error);
      
    }
  }
}
