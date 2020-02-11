import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from 'src/Models/order';
import { product } from 'src/Models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public chartrevenue : number[] =[];
  public static host: string ="https://localhost:5001/api/" 
  constructor( public http:HttpClient,) { }

  public GetListAllProduct() {
    return this.http.get<Order>(OrderService.host+ 'Order/GetOrderAll');
  }
  public AddOrder(data:Order){
    
    return this.http.post<Order>(OrderService.host+ 'Order/AddOrder' , data);
  }
  public GetProductById(Id:string){
    return this.http.get<Order>(OrderService.host+'Order/GetOrderById/'+ Id);
 }
 public editokorder(Id:string, data){
  return this.http.put<Order>(OrderService.host+'Order/EditOkOrder/'+ Id,data);
 }
 public editsendorder(Id:string, data){
  return this.http.put<Order>(OrderService.host+'Order/EditSendOrder/'+ Id,data);
 }
 public getallproduct( ){
  return this.http.get<product>(OrderService.host+'Product/GetProductAll');
 }
 public getProductbygroup( ){
  return this.http.get<Order>(OrderService.host+'Order/GetOrderbygroup');
 }
 public getorderlistbymonth(data){
  return this.http.get<Order>(OrderService.host+'Order/GetOrderdatebyfindall/'+ data);
 }
 public getorderallyear(data){
  return this.http.get<Order>(OrderService.host+'Order/GetOrderdatebyfindallbyyear/'+ data);
 }
 public getorderlistbydateyear(data:string , data2:string){
  return this.http.get<Order>(OrderService.host+'Order/GetOrderdatebyfindallbyyrearandmonth/' + data + '/' + data2);
 }

}

