import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { TwoColumn } from '../models/two-column';

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
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public rows: TwoColumn[];

  constructor() { }

  ngOnInit() {
    this.rows = [
      { title: 'Sales', value: 300 },
      { title: 'In-Store Sales', value: 500 },
      { title: 'Mail Sales', value: 100 }
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.rows.forEach(row => {
      this.pieChartLabels.push(row.title);
      this.pieChartData.push(row.value);
    });
  }

  public refreshChart(): void {
    this.exportFromTable();
  }

  public addRow(): void {
    const row: TwoColumn = {
      title: 'New row',
      value: 0
    };
    this.rows.push(row);
    this.exportFromTable();
  }

  public removeRow(row: TwoColumn): void {
    const index = this.rows.indexOf(row);
    if (index > -1) {
       this.rows.splice(index, 1);
    }
    this.exportFromTable();
  }
}
