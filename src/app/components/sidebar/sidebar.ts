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
    console.log('showCharts:', this.showCharts); // Add this for debugging
  }

  selectChart(type: string) {
    console.log(`Selected chart: ${type}`);
    this.selectedChart = type;
    this.chartService.setChartType(type);
  }
}
