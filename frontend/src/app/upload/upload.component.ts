// upload-file.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadFileComponent {
  constructor(private http: HttpClient, private dataService: DataService) {
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  public uploadFile() {
    const fileInput = this.fileInput.nativeElement as HTMLInputElement;
    console.log('File input:', fileInput);

    if (fileInput.files === null) return;
    const file = fileInput.files[0];
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    this.dataService.uploadFile(formData);
  }
}
