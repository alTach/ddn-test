import { Pipe, PipeTransform } from '@angular/core';

type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

function getDecimal(num: 3 | 2 | 1 ) {
  switch (num) {
    case 2: return 1;
    case 1: return 2;
    default: return 0;
  }
}

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that can be a number or a map for each unit.
 * Usage:
 *   bytes | fileSize:precision
 * @example
 * // returns 1 KB
 * {{ 1500 | fileSize }}
 * @example
 * // returns 2.1 GB
 * {{ 2100000000 | fileSize }}
 * @example
 * // returns 1.46 KB
 * {{ 1500 | fileSize:2 }}
 */
@Pipe({
  name: 'bytesTo'
})
export class BytesToPipe implements PipeTransform {
  private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  transform(bytes: number | null = 0, precision: 3 | 2 | 1): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite((bytes as number))) return '?';

    let unitIndex = 0;

    while ((bytes as number) >= 1024) {
      (bytes as number) /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];
    const decimal = getDecimal(precision);

    return `${(bytes as number).toFixed(decimal)} ${unit}`;
  }
}
