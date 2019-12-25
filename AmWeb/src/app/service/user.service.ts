import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { user } from "src/Models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public statusUser:string;
  public nameUser:string;
  
  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetUserAll() {
    return this.http.get<user>(UserService.host + 'User/GetUserAll');
  }
  public AddDataUser(data: user) {
    console.log(data);
    return this.http.post<user>(UserService.host + 'User/AddUser', data);

  }
  public GetUserByid(Id: string) {
    return this.http.get<user>(UserService.host + 'User/GetUserById/' + Id);
  }

  public EditDataUser(Id: string, data) {
    return this.http.put<user>(UserService.host + 'User/EditUser/' + Id, data);
  }

  public DeleteDataUser(Id: string) {
    return this.http.delete<user>(UserService.host + 'User/DeleteUser/' + Id);
  }
}
