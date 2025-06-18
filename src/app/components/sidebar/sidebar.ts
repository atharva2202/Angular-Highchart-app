import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  showCharts = false;

  toggleCharts() {
    this.showCharts = !this.showCharts;
  }

  selectChart(type: string) {
    console.log(`Selected chart: ${type}`);
    // TODO: emit to parent or use Angular service for shared state
  }
}
