import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { product } from "src/Models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetProductAll() {
    return this.http.get<product>(ProductService.host + 'Product/GetProductAll');
  }
  public AddDataProduct(data: product) {
    console.log(data);
    return this.http.post<product>(ProductService.host + 'Product/AddProduct', data);

  }
  public GetProductByid(Id: string) {
    return this.http.get<product>(ProductService.host + 'Product/GetProductById/' + Id);
  }

  public EditDataProduct(Id: string, data) {
    return this.http.put<product>(ProductService.host + 'Product/EditProduct/' + Id, data);
  }

  public EditAddTotalProduct(Id: string, data) {
    return this.http.put<product>(ProductService.host + 'Product/EditAddTotalProduct/' + Id, data);
  }

  public DeleteDataPeoduct(Id: string) {
    return this.http.delete<product>(ProductService.host + 'Product/DeleteProduct/' + Id);
  }
  
  
}
