import { Component, OnInit } from '@angular/core';
import { AsotiativeValues } from '../models/asotiative-values';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public isExpanded = true;
  public rows: AsotiativeValues[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[];
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public objectKeys = Object.keys;
  public barChartData: ChartDataSets[];
  public datasetNames: string[];
  public datasetNumber = 3;

  constructor() { }

  ngOnInit() {
    this.datasetNames = ['Set 1', 'Set 2'];
    this.rows = [
      { title: '2011', values: [59, 48]},
      { title: '2012', values: [80, 40]},
      { title: '2013', values: [81, 19]},
      { title: '2014', values: [56, 86]},
      { title: '2015', values: [55, 27]},
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.barChartData = [];
    this.barChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
      this.barChartLabels.push(row.title);
      let i = 0;
      this.datasetNames.forEach(datasetName => {
        if (isFirstStep) {
          const chartDataSets: ChartDataSets = {
            label: datasetName,
            data: [row.values[i]]
          };
          this.barChartData.push(chartDataSets);
        } else {
          (this.barChartData[i].data as number[]).push(row.values[i]);
        }
        i++;
      });
      isFirstStep = false;
    });
  }

  public addRow(): void {
    const values = [];
    for (let i = 0; i < this.datasetNames.length; i++) {
      values[i] = 0;
    }
    const row: AsotiativeValues = {
      title: null,
      values: values
    };
    this.rows.push(row);
    this.exportFromTable();
  }

  public removeRow(row: AsotiativeValues): void {
    const index = this.rows.indexOf(row);
    if (index > -1) {
       this.rows.splice(index, 1);
    }
    this.exportFromTable();
  }

  public addColumn(): void {
    this.datasetNames.push('Set ' + (this.datasetNumber++));
    this.rows.forEach(row => {
      row.values.push(0);
    });
    this.exportFromTable();
  }

  public removeColumn(index: number) {
    this.datasetNames.splice(index, 1);
    this.rows.forEach(row => {
      row.values.splice(index, 1);
    });
    this.exportFromTable();
  }

  public onKey(event: any): void {
    this.exportFromTable();
  }
}
