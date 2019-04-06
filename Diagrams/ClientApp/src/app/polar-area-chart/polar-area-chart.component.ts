import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { TwoColumns } from '../models/two-columns';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css']
})
export class PolarAreaChartComponent implements OnInit {

  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet;
  public polarAreaLegend = true;

  public rows: TwoColumns[];
  public isExpanded = false;

  constructor() { }

  ngOnInit() {
    this.rows = [
      { title: 'Download Sales', value: 300 },
      { title: 'In-Store Sales', value: 500 },
      { title: 'Mail Sales', value: 100 },
      { title: 'Telesales', value: 40 },
      { title: 'Corporate Sales', value: 120 }
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.polarAreaChartLabels = [];
    this.polarAreaChartData = [];
    this.rows.forEach(row => {
      this.polarAreaChartLabels.push(row.title);
      this.polarAreaChartData.push(row.value);
    });
  }

  public addRow(): void {
    const row: TwoColumns = {
      title: '',
      value: 0
    };
    this.rows.push(row);
    this.exportFromTable();
  }

  public removeRow(row: TwoColumns): void {
    const index = this.rows.indexOf(row);
    if (index > -1) {
      this.rows.splice(index, 1);
    }
    this.exportFromTable();
  }

  public onKey(event: any): void {
    this.exportFromTable();
  }

}
