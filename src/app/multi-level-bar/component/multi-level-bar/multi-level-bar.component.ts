import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MultiLevelBarConfig } from "../../model/multi-level-bar.model";
import { auditTime, fromEvent, Observable, takeUntil } from "rxjs";
import { TuiDestroyService } from "@taiga-ui/cdk";
import { getElWidth } from "../../utttils/get-el-width";

@Component({
  selector: 'app-multi-level-bar',
  templateUrl: './multi-level-bar.component.html',
  styleUrls: ['./multi-level-bar.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiLevelBarComponent implements AfterViewChecked {
  hideUsedCapacityTitle = false;
  hideAllocatedCapacityTitle = false;
  private resize$ = fromEvent(window, 'resize').pipe(takeUntil(this.destroy$), auditTime(500));

  @Input() config!: MultiLevelBarConfig
  @ViewChild('UsedCapacity') usedCapacity: ElementRef | null = null;
  @ViewChild('AllocatedCapacity') allocatedCapacity: ElementRef | null = null;
  @ViewChild('UsedCapacityTitle') usedCapacityTitle: ElementRef | null = null;
  @ViewChild('AllocatedCapacityTitle') allocatedCapacityTitle: ElementRef | null = null;

  constructor(@Inject(TuiDestroyService) private readonly destroy$: Observable<void>, private cd: ChangeDetectorRef) {
    this.resize$.subscribe(() => this.showAndHideTitle());
  }

  ngAfterViewChecked(): void {
    this.showAndHideTitle();
  }

  private showAndHideTitle() {
    let hasChanges = false;
    const newHideUsedCapacityTitle = getElWidth(this.usedCapacity) < getElWidth(this.usedCapacityTitle);
    const newHideAllocatedCapacityTitle = getElWidth(this.allocatedCapacity) < getElWidth(this.allocatedCapacityTitle);
    if (newHideUsedCapacityTitle !== this.hideUsedCapacityTitle) {
      hasChanges = true;
      this.hideUsedCapacityTitle = newHideUsedCapacityTitle;
    }
    if (newHideAllocatedCapacityTitle !== this.hideAllocatedCapacityTitle) {
      hasChanges = true;
      this.hideAllocatedCapacityTitle = newHideAllocatedCapacityTitle
    }
    if (hasChanges) {
      this.cd.detectChanges();
    }
  }
}
