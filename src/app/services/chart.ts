import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Chart {
  private currentChartType = new BehaviorSubject<string>('');

  setChartType(type: string) {
    this.currentChartType.next(type);
  }

  getChartType() {
    return this.currentChartType.asObservable();
  }
}
