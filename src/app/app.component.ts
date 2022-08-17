import { Component } from '@angular/core';
import { MultiLevelBarConfig } from "src/app/multi-level-bar/model/multi-level-bar.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  multiLevelBarConfig: MultiLevelBarConfig = {
    allocated: 1234567,
    allocatedPrecision: 1,
    used: 123456,
    usedPrecision: 2,
    total: 12345678,
    totalPrecision: 3,
  };


  constructor() {
    setTimeout(() => {
      this.multiLevelBarConfig = {
        allocated: 52345672,
        allocatedPrecision: 1,
        used: 22345672,
        usedPrecision: 2,
        total: 123456781,
        totalPrecision: 3,
      };
    }, 2000);
  }
}
