import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AssotiativeValues } from '../models/assotiative-values';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../services/gui-notificator.service';
import { JsonService } from '../services/json.service';
import { FileDownloaderService } from '../services/file-downloader.service';
import { XmlService } from '../services/xml.service';

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
  public rows: AssotiativeValues[];
  public datasetNames: string[];
  public datasetNumber = 3;
  public isJsonDownloading = false;
  public isXmlDownloading = false;

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService,
    private _jsonService: JsonService,
    private _xmlService: XmlService,
    private _fileDownloaderService: FileDownloaderService) { }

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
    const row: AssotiativeValues = {
      title: null,
      values: values
    };
    this.rows.push(row);
    this.exportFromTable();
  }

  public removeRow(row: AssotiativeValues): void {
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

  public removeColumn(index: number): void {
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

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveAssotiativeValuesJsonFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/json' });
      this._fileDownloaderService.downloadBlob(blob, `RadarChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`);
      this.isJsonDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isJsonDownloading = false;
    });
  }

  public downloadXml() {
    this.isXmlDownloading = true;
    this._xmlService.saveAssotiativeValuesXmlFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/xml' });
      this._fileDownloaderService.downloadBlob(blob, `RadarChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xml`);
      this.isXmlDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isXmlDownloading = false;
    });
  }

}
