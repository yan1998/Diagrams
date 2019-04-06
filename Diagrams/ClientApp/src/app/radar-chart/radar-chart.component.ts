import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AsotiativeValues } from '../models/asotiative-values';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../services/gui-notificator.service';

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

  public isExpanded = false;
  public rows: AsotiativeValues[];
  public datasetNames: string[];
  public datasetNumber = 3;

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService) { }

  ngOnInit() {
    this.datasetNames = ['Set 1', 'Set 2'];
    this.rows = [
      { title: 'Eating', values: [65, 28]},
      { title: 'Drinking', values: [59, 48]},
      { title: 'Sleeping', values: [80, 40]},
      { title: 'Designing', values: [81, 19]},
      { title: 'Coding', values: [56, 86]},
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.radarChartData = [];
    this.radarChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
      this.radarChartLabels.push(row.title);
      let i = 0;
      this.datasetNames.forEach(datasetName => {
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

  public addRow(): void {
    const values = [];
    for (let i = 0; i < this.datasetNames.length; i++) {
      values[i] = 0;
    }
    const row: AsotiativeValues = {
      title: null,
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
    this.datasetNames.push('Set ' + (this.datasetNumber++));
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
    this.datasetNames.splice(index, 1);
    this.rows.forEach(row => {
      row.values.splice(index, 1);
    });
    this.exportFromTable();
  }

  public onKey(event: any): void {
    this.exportFromTable();
  }

}
