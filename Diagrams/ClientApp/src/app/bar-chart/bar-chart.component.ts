import { Component, OnInit } from '@angular/core';
import { AssotiativeValuesTable } from '../models/assotiative-values';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

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
  public table: AssotiativeValuesTable;


  constructor() { }

  ngOnInit() {
    this.table = {
      setNames: ['Set 1', 'Set 2'],
      rows: [
        { title: '2011', values: [59, 48]},
        { title: '2012', values: [80, 40]},
        { title: '2013', values: [81, 19]},
        { title: '2014', values: [56, 86]},
        { title: '2015', values: [55, 27]},
      ]
    };
    this.exportFromTable(this.table);
  }

  private exportFromTable(changedTable: AssotiativeValuesTable): void {
    this.barChartData = [];
    this.barChartLabels = [];
    let isFirstStep = true;
    this.table = changedTable;
    this.table.rows.forEach(row => {
      this.barChartLabels.push(row.title);
      let i = 0;
      this.table.setNames.forEach(datasetName => {
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
}
