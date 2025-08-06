import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCreateService } from '../../../../services/product/product-create.service';
import { Product } from '../../../../domain/model/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private productCreateService: ProductCreateService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  nameMinLenght: number = 2;
  nameMaxLenght: number = 20;

  priceMinValue: number = 0.1;

  form: FormGroup;

  initializeForm(){
    this.form = this.formBuilder.group({
      name: ["", [
        Validators.required,
        Validators.minLength(this.nameMinLenght),
        Validators.maxLength(this.nameMaxLenght)
      ]],
      price: ["", [
        Validators.required,
        Validators.min(this.priceMinValue)
      ]]
    })
  }

  onSubmit() {
    let product: Product = {
      name: this.form.value.name,
      price: this.form.value.price
    };

    this.productCreateService.create(product).subscribe({
      next: response => {
        console.log('Produto criado com sucesso:', response);
        this.router.navigate(["product/list"])
      },
      error: error => {
        console.error('Erro ao criar produto:', error);
      }
    });
  }

}
