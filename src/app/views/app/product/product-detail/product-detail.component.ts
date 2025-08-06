import { Component, OnInit } from '@angular/core';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  form: FormGroup;

  productId: string = "-1";

  name: string = "";
  price: string = "";

  constructor(
    private productReadService: ProductReadService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ){}

 async ngOnInit(){

    let productId = this.route.snapshot.paramMap.get("id");

    this.productId = productId!;

    console.log(`id do usuario ${productId}`);

    let product = await this.productReadService.findById(this.productId);
    if(product == null){
      console.error("produto não existe");
      this.router.navigate(["account/sign-in"])
      return;
    }
    console.log(product);

    this.name = product.name;
    this.price = product.price;
  }
}
