import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { AssotiativeValuesTable } from '../models/assotiative-values';

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
  public table: AssotiativeValuesTable;

  constructor() { }

  ngOnInit() {
    this.table = {
      setNames: ['Set 1', 'Set 2', 'Set 3'],
      rows: [
        { title: 'January', values: [65, 28, 30]},
        { title: 'February', values: [59, 48, 80]},
        { title: 'March', values: [80, 40, 70]},
        { title: 'April', values: [81, 19, 90]},
        { title: 'May', values: [56, 86, 100]}
      ]
    };
    this.exportFromTable(this.table);
  }

  private exportFromTable(changedTable: AssotiativeValuesTable): void {
    this.lineChartData = [];
    this.lineChartLabels = [];
    let isFirstStep = true;
    this.table = changedTable;
    this.table.rows.forEach(row => {
      this.lineChartLabels.push(row.title);
      let i = 0;
      this.table.setNames.forEach(datasetName => {
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
}
