import { Component, OnInit } from '@angular/core';
import { UserReadService } from '../../../../services/user/user-read.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserUpdateService } from '../../../../services/user/user-update.service';

@Component({
  selector: 'app-user-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{

  form: FormGroup;

  userId: string = "-1";

  fullnameMinLenght: number = 2;
  fullnameMaxLenght: number = 10;

  constructor(
    private userReadService: UserReadService,
    private userUpdateService: UserUpdateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.initializeForm();
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get("id");

    this.userId = userId!;

    console.log(`id do usuario ${userId}`);
    this.loadUserById(userId!) 
  }


  initializeForm(){
    this.form = this.formBuilder.group({
      fullname: ["nome padrao", [
        Validators.required,
        Validators.minLength(this.fullnameMinLenght),
        Validators.maxLength(this.fullnameMaxLenght),
      ]]
    }); 
  }

  async loadUserById(userId: string){
    let user = await this.userReadService.findById(userId);
    console.log(user);

    this.form.controls["fullname"].setValue(user.fullname);
  }

  validateFields(){
    return this.form.controls["fullname"].valid;
  }

  async update(){
    console.log("atualizando dados");
    let user = {
      fullname: this.form.controls["fullname"].value,
      id: this.form.controls["id"].value
    }

    try{

    
    await this.userUpdateService.update(user.id, user.fullname);
    this.toastr.success("Dados salvos com sucesso");
    this.router.navigate(["user/list"])
    }catch{
      this.toastr.error("error-messag");
    }
  }
}
