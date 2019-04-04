import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { AsotiativeValues } from '../models/asotiative-values';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: { beginAtZero: true }
        }
      ]
    },
    annotation: {}
  };
  public lineChartLegend = true;
  public lineChartPlugins = [pluginAnnotations];

  public isExpanded = false;
  public rows: AsotiativeValues[];
  public datasetNames: string[];
  public datasetNumber = 4;

  constructor() { }

  ngOnInit() {
    this.datasetNames = ['Set 1', 'Set 2', 'Set 3'];
    this.rows = [
      { title: 'January', values: [65, 28, 30]},
      { title: 'February', values: [59, 48, 80]},
      { title: 'March', values: [80, 40, 70]},
      { title: 'April', values: [81, 19, 90]},
      { title: 'May', values: [56, 86, 100]},
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.lineChartData = [];
    this.lineChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
      this.lineChartLabels.push(row.title);
      let i = 0;
      this.datasetNames.forEach(datasetName => {
        if (isFirstStep) {
          const chartDataSets: ChartDataSets = {
            label: datasetName,
            data: [row.values[i]]
          };
          this.lineChartData.push(chartDataSets);
        } else {
          (this.lineChartData[i].data as number[]).push(row.values[i]);
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
