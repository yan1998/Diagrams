import { Component, OnInit } from '@angular/core';
import { AssotiativeValuesTable } from '../models/assotiative-values';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DiagramsDataService } from '../services/diagrams-data.service';

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


  constructor(private _diagramsDataService: DiagramsDataService) { }

  ngOnInit() {
    this.table = this._diagramsDataService.barChartData;
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
