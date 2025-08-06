import { Component, OnInit } from '@angular/core';
import { UserReadService } from '../../../services/user/user-read.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'app-myprofile',
  imports: [],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit{

  email: string = "";
  fullname: string = "";

  constructor(private userReadService: UserReadService,
              private router: Router,
              private authenticationService: AuthenticationService,
  ){}

  async ngOnInit(){
    let user = await this.userReadService.findById("2");
    if(user == null){
      console.error("ocorreu um erro desconhecido");
      this.authenticationService.logout();
      this.router.navigate(["account/sign-in]"])
      return;
    }
    console.log(user);

    this.email = user.email;
    this.fullname = user.fullname;
  }
}
