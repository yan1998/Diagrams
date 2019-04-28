import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { TwoColumns } from '../models/two-columns';
import { DiagramsDataService } from '../services/diagrams-data.service';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css']
})
export class PolarAreaChartComponent implements OnInit {

  public polarAreaChartLabels: Label[];
  public polarAreaChartData: number[];
  public polarAreaLegend = true;
  public table: TwoColumns[];

  constructor(private _diagramsDataService: DiagramsDataService) { }

  ngOnInit() {
    this.table = this._diagramsDataService.polarAreaChartData;
    this.exportFromTable(this.table);
  }

  private exportFromTable(changedTable: TwoColumns[]): void {
    this.table = changedTable;
    this.polarAreaChartLabels = [];
    this.polarAreaChartData = [];
    this.table.forEach(row => {
      this.polarAreaChartLabels.push(row.title);
      this.polarAreaChartData.push(row.value);
    });
  }
}
