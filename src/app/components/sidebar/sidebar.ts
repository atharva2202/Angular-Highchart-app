// sidebar.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from '../../services/chart';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  showCharts = false;
  selectedChart = '';

  constructor(private chartService: Chart) {}

  toggleCharts() {
    this.showCharts = !this.showCharts;
  }

  selectChart(type: string) {
    this.selectedChart = type;
    this.chartService.setChartType(type);
  }
}
