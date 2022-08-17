import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MultiLevelBarConfig } from "../../model/multi-level-bar.model";
import { auditTime, fromEvent } from "rxjs";

@Component({
  selector: 'app-multi-level-bar',
  templateUrl: './multi-level-bar.component.html',
  styleUrls: ['./multi-level-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiLevelBarComponent implements OnInit, AfterViewChecked {
  hideUsedCapacityTitle = false;
  hideAllocatedCapacityTitle = false;
  hideTotalCapacityTitle = false;
  usedCapacityWidth: number = 0;
  allocatedCapacityWidth: number = 0;
  @Input() config!: MultiLevelBarConfig

  @ViewChild('UsedCapacity') usedCapacity: ElementRef | null = null;
  @ViewChild('AllocatedCapacity') allocatedCapacity: ElementRef | null = null;
  @ViewChild('UsedCapacityTitle') usedCapacityTitle: ElementRef | null = null;
  @ViewChild('AllocatedCapacityTitle') allocatedCapacityTitle: ElementRef | null = null;
  @ViewChild('TotalCapacity') totalCapacity: ElementRef | null = null;
  @ViewChild('TotalCapacityTitle') totalCapacityTitle: ElementRef | null = null;

  constructor(private cd: ChangeDetectorRef) {
    fromEvent(window, 'resize').pipe(auditTime(500)).subscribe(() => this.reCalc());
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.reCalc();
  }

  reCalc() {
    this.calcElWidth();
    this.showAndHideTitle();
  }

  showAndHideTitle() {
    let hasChanges = false;
    const newHideUsedCapacityTitle = this.usedCapacity?.nativeElement.offsetWidth < this.usedCapacityTitle?.nativeElement.offsetWidth;
    const newHideAllocatedCapacityTitle = this.allocatedCapacity?.nativeElement.offsetWidth < this.allocatedCapacityTitle?.nativeElement.offsetWidth;
    const newHideTotalCapacityTitle = this.totalCapacity?.nativeElement.offsetWidth < this.totalCapacityTitle?.nativeElement.offsetWidth;
    if (newHideUsedCapacityTitle !== this.hideUsedCapacityTitle) {
      hasChanges = true;
      this.hideUsedCapacityTitle = newHideUsedCapacityTitle;
    }
    if (newHideAllocatedCapacityTitle !== this.hideAllocatedCapacityTitle) {
      hasChanges = true;
      this.hideAllocatedCapacityTitle = newHideAllocatedCapacityTitle
    }
    if (newHideTotalCapacityTitle !== this.hideTotalCapacityTitle) {
      hasChanges = true;
      this.hideTotalCapacityTitle = newHideTotalCapacityTitle
    }
    if (hasChanges) {
      this.cd.detectChanges();
    }
  }

  calcElWidth() {
    this.allocatedCapacityWidth = this.config.allocated * 100 / this.config.total;
    this.usedCapacityWidth = this.config.used * 100 / this.config.allocated
    this.cd.detectChanges();
  }
}
