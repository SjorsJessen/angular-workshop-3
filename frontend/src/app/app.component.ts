import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-workshop-3';

  constructor(private dataService: DataService){

  }

  public getData(): void {
    this.dataService.getData();
  }
}
