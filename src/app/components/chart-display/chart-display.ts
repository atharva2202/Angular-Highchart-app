import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import { Chart } from '../../services/chart';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';

/* import { highchartsLoader } from '../../highcharts-loader'; // ✅ your loader file */

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [CommonModule, HighchartsChartComponent],
  /* providers: [provideHighcharts(highchartsLoader)], */
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chart-display.html',
  styleUrl: './chart-display.css',
})
export class ChartDisplay implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  private subscription: Subscription = new Subscription();

  constructor(private Chart: Chart) {}

  ngOnInit() {
    this.subscription = this.Chart.getChartType().subscribe((chartType) => {
      if (chartType) {
        this.createChart(chartType);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createChart(chartType: string) {
    switch (chartType) {
      case 'line':
        this.chartOptions = this.getLineChartOptions();
        break;
      case 'bar':
        this.chartOptions = this.getBarChartOptions();
        break;
      case 'pie':
        this.chartOptions = this.getPieChartOptions();
        break;
      default:
        this.chartOptions = this.getLineChartOptions();
    }
    this.updateFlag = true;
  }

  private getLineChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'line',
        height: 400,
      },
      title: {
        text: 'Sample Line Chart',
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          name: 'Series 1',
          type: 'line',
          data: [10, 20, 15, 25, 30, 35],
        },
        {
          name: 'Series 2',
          type: 'line',
          data: [5, 15, 10, 20, 25, 30],
        },
      ],
    };
  }

  private getBarChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        height: 400,
      },
      title: {
        text: 'Sample Bar Chart',
      },
      xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
      yAxis: {
        title: {
          text: 'Revenue',
        },
      },
      series: [
        {
          name: '2023',
          type: 'column',
          data: [100, 150, 120, 180],
        },
        {
          name: '2024',
          type: 'column',
          data: [120, 170, 140, 200],
        },
      ],
    };
  }

  private getPieChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'pie',
        height: 400,
      },
      title: {
        text: 'Sample Pie Chart',
      },
      series: [
        {
          name: 'Market Share',
          type: 'pie',
          data: [
            { name: 'Product A', y: 40 },
            { name: 'Product B', y: 30 },
            { name: 'Product C', y: 20 },
            { name: 'Product D', y: 10 },
          ],
        },
      ],
    };
  }
}
