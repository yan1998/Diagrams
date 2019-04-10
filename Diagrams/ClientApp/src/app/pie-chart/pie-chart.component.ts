import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { TwoColumns } from '../models/two-columns';
import { GuiNotificatorService } from '../services/gui-notificator.service';
import { TranslateService } from '@ngx-translate/core';
import { JsonService } from '../services/json.service';
import { FileDownloaderService } from '../services/file-downloader.service';
import { XmlService } from '../services/xml.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    legend: {
      position: 'bottom'
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];

  public rows: TwoColumns[];
  public isExpanded = false;
  public isJsonDownloading = false;
  public isXmlDownloading = false;

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService,
    private _jsonService: JsonService,
    private _xmlService: XmlService,
    private _fileDownloaderService: FileDownloaderService) { }

  ngOnInit() {
    this.rows = [
      { title: 'Sales', value: 30 },
      { title: 'In-Store Sales', value: 50 },
      { title: 'Mail Sales', value: 10 }
    ];
    this.exportFromTable();
  }

  private exportFromTable(): void {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.rows.forEach(row => {
      this.pieChartLabels.push(row.title);
      this.pieChartData.push(row.value);
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

    this._jsonService.uploadTwoColumnsJson(formData).subscribe((response: TwoColumns[]) => {
      this.rows = response;
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

    this._xmlService.uploadTwoColumnsXml(formData).subscribe((response: TwoColumns[]) => {
      this.rows = response;
      this.exportFromTable();
    });
  }

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveTwoColumnsJsonFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/json' });
      this._fileDownloaderService.downloadBlob(blob, `PieChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`);
      this.isJsonDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isJsonDownloading = false;
    });
  }

  public downloadXml() {
    this.isXmlDownloading = true;
    this._xmlService.saveTwoColumnsXmlFile(this.rows).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/xml' });
      this._fileDownloaderService.downloadBlob(blob, `PieChart-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xml`);
      this.isXmlDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isXmlDownloading = false;
    });
  }

}
