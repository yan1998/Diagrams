import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { AssotiativeValues } from '../models/assotiative-values';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../services/gui-notificator.service';
import { JsonService } from '../services/json.service';
import { XmlService } from '../services/xml.service';
import { FileDownloaderService } from '../services/file-downloader.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: { beginAtZero: true }
        }
      ]
    },
    annotation: {}
  };
  public lineChartLegend = true;
  public lineChartPlugins = [pluginAnnotations];

  public isExpanded = false;
  public rows: AssotiativeValues[];
  public datasetNames: string[];
  public datasetNumber = 4;
  public isJsonDownloading = false;
  public isXmlDownloading = false;

  constructor(private _translate: TranslateService,
    private _jsonService: JsonService,
    private _xmlService: XmlService,
    private _fileDownloaderService: FileDownloaderService,
    private _guiNotificatorService: GuiNotificatorService) { }

  ngOnInit() {
    this.datasetNames = ['Set 1', 'Set 2', 'Set 3'];
    this.rows = [
      { title: 'January', values: [65, 28, 30]},
      { title: 'February', values: [59, 48, 80]},
      { title: 'March', values: [80, 40, 70]},
      { title: 'April', values: [81, 19, 90]},
      { title: 'May', values: [56, 86, 100]}
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.lineChartData = [];
    this.lineChartLabels = [];
    let isFirstStep = true;
    this.rows.forEach(row => {
      this.lineChartLabels.push(row.title);
      let i = 0;
      this.datasetNames.forEach(datasetName => {
        if (isFirstStep) {
          const chartDataSets: ChartDataSets = {
            label: datasetName,
            data: [row.values[i]]
          };
          this.lineChartData.push(chartDataSets);
        } else {
          (this.lineChartData[i].data as number[]).push(row.values[i]);
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

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveAssotiativeValuesJsonFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/json' });
      this._fileDownloaderService.downloadBlob(blob, `LineChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`);
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
      this._fileDownloaderService.downloadBlob(blob, `LineChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xml`);
      this.isXmlDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isXmlDownloading = false;
    });
  }

}
