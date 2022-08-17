import { ElementRef } from "@angular/core";

export const getElWidth = (el: ElementRef | null) => el?.nativeElement.offsetWidth;
