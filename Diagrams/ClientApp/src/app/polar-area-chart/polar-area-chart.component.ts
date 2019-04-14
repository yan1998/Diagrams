import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { TwoColumns } from '../models/two-columns';

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

  constructor() { }

  ngOnInit() {
    this.table = [
      { title: 'Download Sales', value: 300 },
      { title: 'In-Store Sales', value: 500 },
      { title: 'Mail Sales', value: 100 },
      { title: 'Telesales', value: 40 },
      { title: 'Corporate Sales', value: 120 }
    ];
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
