import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { AssotiativeValuesTable } from '../models/assotiative-values';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels: Label[];
  public doughnutChartData: (number[])[];
  public table: AssotiativeValuesTable;

  constructor() { }

  ngOnInit() {
    this.table = {
      setNames: ['Set1', 'Set2', 'Set3'],
      rows: [
        { title: 'Download Sales', values: [350, 50, 150]},
        { title: 'In-Store Sales', values: [150, 250, 120]},
        { title: 'Mail-Order Sales', values: [250, 130, 70]}
      ]
    };
    this.exportFromTable(this.table);
  }

  private exportFromTable(changedTable: AssotiativeValuesTable): void {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    let isFirstStep = true;
    this.table = changedTable;
    this.table.rows.forEach(row => {
      this.doughnutChartLabels.push(row.title);
      for (let i = 0; i < row.values.length; i++) {
        if (isFirstStep) {
          this.doughnutChartData.push([row.values[i]]);
        } else {
          this.doughnutChartData[i].push(row.values[i]);
        }
      }
      isFirstStep = false;
    });
  }

  public createRange(x: number): number[] {
    const items = [];
    for (let i = 0; i < x; i++) {
      items.push(i);
    }
    return items;
  }
}
