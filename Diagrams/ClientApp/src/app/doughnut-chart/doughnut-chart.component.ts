import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { AsotiativeValues } from '../models/asotiative-values';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../services/gui-notificator.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels: Label[];
  public doughnutChartData: (number[])[];

  public isExpanded = false;
  public rows: AsotiativeValues[];

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService) { }

  ngOnInit() {
    this.rows = [
      { title: 'Download Sales', values: [350, 50, 150]},
      { title: 'In-Store Sales', values: [150, 250, 120]},
      { title: 'Mail-Order Sales', values: [250, 130, 70]}
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
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

  public addRow(): void {
    const values: number[] = [];
    for (let i = 0; i < this.rows[0].values.length; i++) {
      values.push(0);
    }
    const row: AsotiativeValues = {
      title: '',
      values: values
    };
    this.rows.push(row);
    this.exportFromTable();
  }

  public removeRow(row: AsotiativeValues): void {
    if (this.rows.length === 1) {
      const message = this._translate.instant('errors.1RowRemained');
      this._guiNotificatorService.showError(message);
      return;
    }
    const index = this.rows.indexOf(row);
    if (index > -1) {
       this.rows.splice(index, 1);
    }
    this.exportFromTable();
  }

  public addColumn(): void {
    this.rows.forEach(row => {
      row.values.push(0);
    });
    this.exportFromTable();
  }

  public removeColumn(index: number) {
    if (this.rows[0].values.length === 1) {
      const message = this._translate.instant('errors.1ColumnRemained');
      this._guiNotificatorService.showError(message);
      return;
    }
    this.rows.forEach(row => {
      row.values.splice(index, 1);
    });
    this.exportFromTable();
  }

  public onKey(event: any): void {
    this.exportFromTable();
  }

  public createRange(x: number): number[] {
    const items = [];
    for (let i = 0; i < x; i++) {
      items.push(i);
    }
    return items;
  }

}
