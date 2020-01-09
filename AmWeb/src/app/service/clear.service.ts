import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { clear } from "src/Models/clear";

@Injectable({
  providedIn: 'root'
})
export class ClearService {


  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetClearAll() {
    return this.http.get<clear>(ClearService.host + 'Clear/GetClearAll');
  }
  public AddClear(data: clear) {
    console.log(data);
    return this.http.post<clear>(ClearService.host + 'Clear/AddProductClear', data);
  } 
  public AddTotalClear(Id: string, data) {
    return this.http.put<clear>(ClearService.host + 'Clear/AddTotalClear/' + Id, data);
  }
}

