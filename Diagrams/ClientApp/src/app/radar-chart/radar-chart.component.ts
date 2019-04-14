import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AssotiativeValuesTable } from '../models/assotiative-values';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[];
  public radarChartData: ChartDataSets[];
  public table: AssotiativeValuesTable;

  constructor() { }

  ngOnInit() {
    this.table = {
      setNames: ['Set 1', 'Set 2'],
      rows: [
        { title: 'Eating', values: [65, 28]},
        { title: 'Drinking', values: [59, 48]},
        { title: 'Sleeping', values: [80, 40]},
        { title: 'Designing', values: [81, 19]},
        { title: 'Coding', values: [56, 86]},
      ]
    };
    this.exportFromTable(this.table);
  }

  private exportFromTable(changedTable: AssotiativeValuesTable): void {
    this.radarChartData = [];
    this.radarChartLabels = [];
    let isFirstStep = true;
    this.table = changedTable;
    this.table.rows.forEach(row => {
      this.radarChartLabels.push(row.title);
      let i = 0;
      this.table.setNames.forEach(datasetName => {
        if (isFirstStep) {
          const chartDataSets: ChartDataSets = {
            label: datasetName,
            data: [row.values[i]]
          };
          this.radarChartData.push(chartDataSets);
        } else {
          (this.radarChartData[i].data as number[]).push(row.values[i]);
        }
        i++;
      });
      isFirstStep = false;
    });
  }
}
