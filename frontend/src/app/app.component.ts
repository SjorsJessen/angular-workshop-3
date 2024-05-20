import { Component, OnInit } from '@angular/core';
import { Data, DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'angular-workshop-3';

  public data: Observable<string> = new Observable<string>();
  public dataList: Observable<Data[]> = new Observable<Data[]>();
  public dataListAsString: Observable<string> = new Observable<string>();
  public itemData: Observable<string> = new Observable<string>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  public updateData(): void {
    this.data = this.dataService.getData();
    this.dataList = this.dataService.getDataList();
    this.dataListAsString = this.dataService.getDataAsString();
    this.dataService.getItem(123).subscribe(data => {
      console.log(data);
    });
    this.submitData();
    this.submitJsonData();
    const binaryData: ArrayBuffer = new ArrayBuffer(8);
    this.dataService.sendBinaryData(binaryData);
  }

  public submitData(): void {
    const formData = new FormData();
    formData.append('string_field', 'example string');
    formData.append('int_field', String(5));
    formData.append('bool_field', String(true));

    this.dataService.postData(formData).subscribe(response => {
      console.log(response)
    });
  }

  public submitJsonData(): void {
    const jsonData = {
      int_field: 1000,
      string_field: 'Angular message',
      bool_field: true
    };

    this.dataService.postJsonData(jsonData).subscribe(response => {
      console.log(response);
    });
  }
}
