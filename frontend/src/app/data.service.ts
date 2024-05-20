import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getData(): void {
    const url: string = "http://localhost:8000/";
    let result = this.httpClient.get(url).subscribe(data => {
      console.log(data);
    });
  }
}
