import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from './Models/Product';
import { Order } from './Models/Order';
import {User} from './Models/User'

@Injectable({
  providedIn: 'root'
})

export class CallApiService {

  public nameUser :string;
  public levelUser :string;
  
  // public static host: string = "https://bosjazz555.appspot.com/api/";
  public static host: string ="https://localhost:5001/api/" 
  constructor(public http: HttpClient) { }

  public GetListAllProduct() {
    return this.http.get<Order>(CallApiService.host+ 'Order/GetOrderAll');
  }
  public AddOrder(data:Order){
    console.log(data);
    return this.http.post<Order>(CallApiService.host+ 'Order/AddOrder' , data);
  }
  public GetProductById(Id:string){
    return this.http.get<Order>(CallApiService.host+'Order/GetOrderById/'+ Id);
 }
 public editokorder(Id:string, data){
  return this.http.put<Order>(CallApiService.host+'Order/EditCancelOrder/'+ Id,data);
 }
 public editsendorder(Id:string, data){
  return this.http.put<Order>(CallApiService.host+'Order/EditAcceptOrder/'+ Id,data);
 }
 public getallproduct( ){
  return this.http.get<Product>(CallApiService.host+'Product/GetProductAll');
 }
 public GetProductBydata(data:string ){
  return this.http.get<Product>(CallApiService.host+'Product/GetProductBydata/'+ data);
 }
 public GetProductid(Id:string ){
  return this.http.get<Product>(CallApiService.host+'Product/GetProductById/'+Id);
 }
 public CancelSellTotalProduct(id: string, data){
  return this.http.put<Order>(CallApiService.host+'Order/CancelSellTotalProduct/'+ id,data);
 }
 public GetOrderbyUsername(data:string){
  return this.http.get<Product>(CallApiService.host+'Order/GetOrderbyUsername/'+ data);
 }
 //////////////////////////////////////////////////////////////////////////////////////
 public GetUserData(){
   return this.http.get<User>(CallApiService.host+'User/GetUserAll' )
 }
}
