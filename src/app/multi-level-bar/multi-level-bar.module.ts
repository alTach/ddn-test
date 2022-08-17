import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLevelBarComponent } from "./component/multi-level-bar/multi-level-bar.component";
import { BytesToPipe } from "./pipe/bytes-to.pipe";
import { PercentOfPipe } from './pipe/percent-of.pipe';

@NgModule({
  declarations: [MultiLevelBarComponent, BytesToPipe, PercentOfPipe],
  exports: [MultiLevelBarComponent],
  imports: [
    CommonModule
  ]
})
export class MultiLevelBarModule { }
