import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Product } from 'Models/Product';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:44379/api/Products/";

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }


  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'

      })
    });
  }

  getProductById(data: number): Observable<Product> {
    return this.http.get<Product>(this.url + "getProductByID?id=" + data);
  }

  updateProduct(id: number, product: Product): Observable<any> {

    return this.http.put<any>(this.url +"?id="+ id, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    });
  }

  deleteProduct(id: number): Observable<any> {

    return this.http.delete<any>(this.url +"?id="+ id);
  }
}
