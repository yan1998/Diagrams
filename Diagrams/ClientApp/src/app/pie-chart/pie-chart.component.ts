import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { TwoColumns } from '../models/two-columns';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    legend: {
      position: 'bottom'
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public table: TwoColumns[];

  constructor() { }

  ngOnInit() {
    this.table = [
      { title: 'Sales', value: 30 },
      { title: 'In-Store Sales', value: 50 },
      { title: 'Mail Sales', value: 10 }
    ];
    this.exportFromTable(this.table);
  }

  public exportFromTable(changedTable: TwoColumns[]): void {
    this.table = changedTable;
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.table.forEach(row => {
      this.pieChartLabels.push(row.title);
      this.pieChartData.push(row.value);
    });
  }
}
