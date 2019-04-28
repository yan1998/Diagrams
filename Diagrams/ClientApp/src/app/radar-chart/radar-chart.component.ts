import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AssotiativeValuesTable } from '../models/assotiative-values';
import { DiagramsDataService } from '../services/diagrams-data.service';

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

  constructor(private _diagramsDataService: DiagramsDataService) { }

  ngOnInit() {
    this.table = this._diagramsDataService.radarChartData;
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
