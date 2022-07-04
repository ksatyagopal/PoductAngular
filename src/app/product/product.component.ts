import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/Product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: Product[] = [];
  product: Product = {
    productId: 0,
    productName: "",
    cost: 0,
    supplierId: 0
  };

  productid:number = 0;
  constructor(private ps: ProductsService) { }

  flag: boolean[] = [false, false, false, false, false];

  ngOnInit(): void {
  }


  getList(): any {
    this.ps.getProducts().subscribe(data =>
      this.productList = data);
  }

  getById(): any {
    this.ps.getProductById(this.productid).subscribe(data =>
      this.product = data);   
  }

  postProduct(data: any): void {
    console.log("post method Called");  
    console.log(data.productName);  
    if(this.product.productName==undefined){
      console.log("not defined");
    }
    else{
    this.ps.createProduct(this.product).subscribe(data => {
      console.log(data);
    })
    }
  }

  putProduct(data: any): void {
    console.log("update method Called");    
    if(this.product.productName==undefined){
      console.log("not defined");
    }
    else{
    this.ps.updateProduct(this.productid, this.product).subscribe(data => {
      console.log(data);
    })
    }
  }

  changeProduct(data:any):void{
    console.log("product select" + this.productid);
    this.getById();
  }

  deleteProduct(data:any):void{
    console.log("prduct selected"+data);
    this.ps.deleteProduct(data).subscribe();
  }

  get(): void {
    this.getList();
    this.flag = [true, false, false, false, false];
  }
  post(): void {
    this.flag = [false, true, false, false, false];
  }
  put(): void {
    this.flag = [false, false, true, false, true];
  }
  del(): void {
    this.flag = [false, false, false, true, true];
  }

}
