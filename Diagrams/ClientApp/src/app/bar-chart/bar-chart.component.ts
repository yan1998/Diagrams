import { Component, OnInit } from '@angular/core';
import { AssotiativeValues } from '../models/assotiative-values';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../services/gui-notificator.service';
import { JsonService } from '../services/json.service';
import { FileDownloaderService } from '../services/file-downloader.service';
import { XmlService } from '../services/xml.service';

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
      { title: '2011', values: [59, 48]},
      { title: '2012', values: [80, 40]},
      { title: '2013', values: [81, 19]},
      { title: '2014', values: [56, 86]},
      { title: '2015', values: [55, 27]},
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.barChartData = [];
    this.barChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
      this.barChartLabels.push(row.title);
      let i = 0;
      this.datasetNames.forEach(datasetName => {
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

  public uploadJsonFile(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._jsonService.uploadAssotiativeValuesJson(formData).subscribe((response: AssotiativeValues[]) => {
      this.rows = response;
      this.resetDataSetNumber(response[0].values);
      this.exportFromTable();
    });
  }

  public uploadXmlFile(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._xmlService.uploadAssotiativeValueXml(formData).subscribe((response: AssotiativeValues[]) => {
      this.rows = response;
      this.resetDataSetNumber(response[0].values);
      this.exportFromTable();
    });
  }

  private resetDataSetNumber(values: number[]): void {
    this.datasetNames = [];
    this.datasetNumber = values.length + 1;
    for (let i = 0; i < values.length; i++) {
      this.datasetNames.push(`Set ${i + 1}`);
    }
  }

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveAssotiativeValuesJsonFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/json' });
      this._fileDownloaderService.downloadBlob(blob, `BarChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`);
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
      this._fileDownloaderService.downloadBlob(blob, `BarChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xml`);
      this.isXmlDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isXmlDownloading = false;
    });
  }

}
