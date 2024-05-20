import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string = "http://localhost:8000";

  constructor(private httpClient: HttpClient) {

  }

  public getData(): Observable<string> {
    const url: string = this.baseUrl;
    let result = this.httpClient.get<string>(url);
    return result;
  }

  public getDataList(): Observable<Data[]> {
    const url: string = `${this.baseUrl}/data`;
    let result = this.httpClient.get<Data[]>(url);
    return result;
  }

  public getDataAsString(): Observable<string> {
    const url: string = `${this.baseUrl}/data-string`;
    let result = this.httpClient.get<string>(url);
    return result;
  }

  public getItem(item_id: number): Observable<any> {
    let url: string = `${this.baseUrl}/items/${item_id}`;
    return this.httpClient.get<any>(url);
  }

  public postData(formData: FormData): Observable<any> {
    const url: string = `${this.baseUrl}/post-data`;
    return this.httpClient.post<any>(url, formData);
  }

  public postJsonData(data: any): Observable<any> {
    const url: string = `${this.baseUrl}/post-json-data`;
    return this.httpClient.post<any>(url, data);
  }

  public uploadFile(formData: FormData): void {
    const url: string = `${this.baseUrl}/upload-file`;
    this.httpClient.post(url, formData).subscribe(response => {
      console.log('File uploaded successfully:', response);
    }, error => {
      console.error('Error uploading file:', error);
    });
  }

  public sendBinaryData(binaryData: ArrayBuffer): void {
    const url: string = `${this.baseUrl}/binary-data`;
    const headers = new HttpHeaders().set('Content-Type', 'application/octet-stream');

    this.httpClient.post<any>(url, binaryData, { headers }).subscribe(response => {
      console.log('Response:', response);
    });
  }
}
