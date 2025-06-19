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
  chartKey: string = '';

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
    this.chartOptions = {};
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

      case 'area':
        this.chartOptions = this.getAreaChartOptions();
        break;
      case 'stacked-bar':
        this.chartOptions = this.getStackedBarChartOptions();
        break;
      default:
        this.chartOptions = this.getLineChartOptions();
    }

    this.chartKey = `${chartType}-${new Date().getTime()}`; // ✅ forces new component rendering
    this.updateFlag = true;
  }

  private getLineChartOptions(): Highcharts.Options {
    return {
      title: {
        text: 'U.S Solar Employment Growth',
        align: 'left',
      },

      subtitle: {
        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
        align: 'left',
      },

      yAxis: {
        title: {
          text: 'Number of Employees',
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2022',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        line: {
          dataLabels: {
            enabled: true, // ✅ Show data labels
          },
        },
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          name: 'Installation & Developers',
          type: 'line',
          data: [
            43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
            161454, 154610, 168960, 171558,
          ],
        },
        {
          name: 'Manufacturing',
          type: 'line',
          data: [
            24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726,
            34243, 31050, 33099, 33473,
          ],
        },
        {
          name: 'Sales & Distribution',
          type: 'line',
          data: [
            11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243,
            29213, 25663, 28978, 30618,
          ],
        },
        {
          name: 'Operations & Maintenance',
          type: 'line',
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            11164,
            11218,
            10077,
            12530,
            16585,
          ],
        },
        {
          name: 'Other',
          type: 'line',
          data: [
            21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
            10073, 11471, 11648,
          ],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  private getBarChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Corn vs wheat estimated production for 2023',
      },
      subtitle: {
        text:
          'Source: <a target="_blank" ' +
          'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
      },
      xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
        crosshair: true,
        accessibility: {
          description: 'Countries',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '1000 metric tons (MT)',
        },
      },
      tooltip: {
        valueSuffix: ' (1000 MT)',
      },
      legend: {
        enabled: false, // ✅ Disable legend here
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Corn',
          data: [387749, 280000, 129000, 64300, 54000, 34300],
          type: 'column',
        },
        {
          name: 'Wheat',
          data: [45321, 140000, 10000, 140500, 19500, 113500],
          type: 'column',
        },
      ],
    };
  }

  private getPieChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'pie',
        zooming: {
          type: 'xy',
        },
        panning: {
          enabled: true,
          type: 'xy',
        },
        panKey: 'shift',
      },
      title: {
        text: 'Egg Yolk Composition',
      },
      tooltip: {
        valueSuffix: '%',
      },
      subtitle: {
        text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,

          cursor: 'pointer',

          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7,
              },
              filter: {
                operator: '>',
                property: 'percentage',
                value: 10,
              },
            },
          ],
        },
      },
      series: [
        {
          name: 'Percentage',
          type: 'pie',

          data: [
            {
              name: 'Water',
              y: 55.02,
            },
            {
              name: 'Fat',
              sliced: true,
              selected: true,
              y: 26.71,
            },
            {
              name: 'Carbohydrates',
              y: 1.09,
            },
            {
              name: 'Protein',
              y: 15.5,
            },
            {
              name: 'Ash',
              y: 1.68,
            },
          ],
        },
      ],
    };
  }
  private getAreaChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'area',
      },
      accessibility: {
        description:
          'Image description: An area chart compares the nuclear ' +
          'stockpiles of the USA and the USSR/Russia between 1945 and ' +
          '2024. The number of nuclear weapons is plotted on the Y-axis ' +
          'and the years on the X-axis. The chart is interactive, and the ' +
          'year-on-year stockpile levels can be traced for each country. ' +
          'The US has a stockpile of 2 nuclear weapons at the dawn of the ' +
          'nuclear age in 1945. This number has gradually increased to 170 ' +
          'by 1949 when the USSR enters the arms race with one weapon. At ' +
          'this point, the US starts to rapidly build its stockpile ' +
          'culminating in 31,255 warheads by 1966 compared to the USSR’s 8,' +
          '400. From this peak in 1967, the US stockpile gradually ' +
          'decreases as the USSR’s stockpile expands. By 1978 the USSR has ' +
          'closed the nuclear gap at 25,393. The USSR stockpile continues ' +
          'to grow until it reaches a peak of 40,159 in 1986 compared to ' +
          'the US arsenal of 24,401. From 1986, the nuclear stockpiles of ' +
          'both countries start to fall. By 2000, the numbers have fallen ' +
          'to 10,577 and 12,188 for the US and Russia, respectively. The ' +
          'decreases continue slowly after plateauing in the 2010s, and in ' +
          '2024 the US has 3,708 weapons compared to Russia’s 4,380.',
      },
      title: {
        text: 'US and USSR nuclear stockpiles',
      },
      subtitle: {
        text:
          'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
          'target="_blank">FAS</a>',
      },
      xAxis: {
        allowDecimals: false,
        accessibility: {
          rangeDescription: 'Range: 1940 to 2024.',
        },
        labels: {
          align: 'center', // or 'left' / 'right'
          rotation: 0,
          style: {
            fontSize: '12px',
            color: '#444',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Nuclear weapon states',
          align: 'high', // ✅ Align the title at the top of the axis
          rotation: 0, // ✅ Make the title horizontal
          x: 0,
          y: -10,
          style: {
            color: '#333',
            fontSize: '14px',
          },
        },
        labels: {
          align: 'left', // ✅ Align the labels to the left of tick marks
          x: -10,
          style: {
            fontSize: '12px',
            color: '#666',
          },
        },
      },
      tooltip: {
        pointFormat:
          '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>' +
          'warheads in {point.x}',
      },
      plotOptions: {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      series: [
        {
          type: 'area',
          name: 'USA',
          data: [
            null,
            null,
            null,
            null,
            null,
            2,
            9,
            13,
            50,
            170,
            299,
            438,
            841,
            1169,
            1703,
            2422,
            3692,
            5543,
            7345,
            12298,
            18638,
            22229,
            25540,
            28133,
            29463,
            31139,
            31175,
            31255,
            29561,
            27552,
            26008,
            25830,
            26516,
            27835,
            28537,
            27519,
            25914,
            25542,
            24418,
            24138,
            24104,
            23208,
            22886,
            23305,
            23459,
            23368,
            23317,
            23575,
            23205,
            22217,
            21392,
            19008,
            13708,
            11511,
            10979,
            10904,
            11011,
            10903,
            10732,
            10685,
            10577,
            10526,
            10457,
            10027,
            8570,
            8360,
            7853,
            5709,
            5273,
            5113,
            5066,
            4897,
            4881,
            4804,
            4717,
            4571,
            4018,
            3822,
            3785,
            3805,
            3750,
            3708,
            3708,
            3708,
            3708,
          ],
        },
        {
          type: 'area',
          name: 'USSR/Russia',
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            1,
            5,
            25,
            50,
            120,
            150,
            200,
            426,
            660,
            863,
            1048,
            1627,
            2492,
            3346,
            4259,
            5242,
            6144,
            7091,
            8400,
            9490,
            10671,
            11736,
            13279,
            14600,
            15878,
            17286,
            19235,
            22165,
            24281,
            26169,
            28258,
            30665,
            32146,
            33486,
            35130,
            36825,
            38582,
            40159,
            38107,
            36538,
            35078,
            32980,
            29154,
            26734,
            24403,
            21339,
            18179,
            15942,
            15442,
            14368,
            13188,
            12188,
            11152,
            10114,
            9076,
            8038,
            7000,
            6643,
            6286,
            5929,
            5527,
            5215,
            4858,
            4750,
            4650,
            4600,
            4500,
            4490,
            4300,
            4350,
            4330,
            4310,
            4495,
            4477,
            4489,
            4380,
          ],
        },
      ],
    };
  }

  private getStackedBarChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'bar', // ✅ Chart type is bar
      },
      title: {
        text: 'Ferry passengers by vehicle type 2024',
        align: 'left',
      },
      xAxis: {
        categories: ['January', 'February', 'March', 'April', 'May'],
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: 'normal', // ✅ Stack bars
          dataLabels: {
            enabled: true,
          },
        },
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          type: 'bar', // ✅ Must explicitly declare
          name: 'Motorcycles',
          data: [74, 27, 52, 93, 1272],
        },
        {
          type: 'bar',
          name: 'Null-emission vehicles',
          data: [2106, 2398, 3046, 3195, 4916],
        },
        {
          type: 'bar',
          name: 'Conventional vehicles',
          data: [12213, 12721, 15242, 16518, 25037],
        },
      ],
    };
  }
}
