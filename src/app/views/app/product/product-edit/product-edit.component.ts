import { Component, OnInit } from '@angular/core';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { ProductUpdateService } from '../../../../services/product/product-update.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{

  productId: string = "-1";

  form: FormGroup;

  nameMinLenght: number = 2;
  nameMaxLenght: number = 20;

  priceMinValue: number = 0.1;

  constructor(
    private productReadService: ProductReadService,
    private productUpdateSerive: ProductUpdateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router:  Router,
    private route: ActivatedRoute
  ){
    this.initializeForm();
  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id");

    this.productId = productId!;

    console.log(`id do produto: ${productId}`);
    this.loadProductById(productId!)
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      name: ["name", [
        Validators.required,
        Validators.minLength(this.nameMinLenght),
        Validators.maxLength(this.nameMaxLenght)
      ]],
      price: ["price", [
        Validators.required,
        Validators.min(this.priceMinValue)
      ]]
    })
  }

  async loadProductById(productId: string){
    let product = await this.productReadService.findById(productId);
    console.log(product);

    this.form.controls["name"].setValue(product.name);
    this.form.controls["price"].setValue(product.price);
  }

  validateFields(){
    return this.form.controls["name"].valid && this.form.controls["price"];
  }

  async update(){
    console.log("atualizando dados");

    let product = {
      name: this.form.controls["name"].value,
      price: this.form.controls["price"].value,
      id: this.productId
    }

    try{
      await this.productUpdateSerive.update(product.id,  product.name, product.price);
      this.toastr.success("dados salvos com sucesso");
      this.router.navigate(["product/list"])
    }catch{
      this.toastr.error("error-message");
    }
  }
}
