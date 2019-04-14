import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GuiNotificatorService } from '../../services/gui-notificator.service';
import { JsonService } from '../../services/json.service';
import { XmlService } from '../../services/xml.service';
import { FileDownloaderService } from '../../services/file-downloader.service';
import { AssotiativeValues, AssotiativeValuesTable } from '../../models/assotiative-values';

@Component({
  selector: 'app-assotiative-values-table',
  templateUrl: './assotiative-values-table.component.html',
  styleUrls: ['./assotiative-values-table.component.css']
})
export class AssotiativeValuesTableComponent implements OnInit {

  public datasetNumber = 3;
  public isJsonDownloading = false;
  public isXmlDownloading = false;

  @Input() table: AssotiativeValuesTable;
  @Input() chartName: string;

  @Output() tableChanged: EventEmitter<AssotiativeValuesTable> = new EventEmitter<AssotiativeValuesTable>();

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService,
    private _jsonService: JsonService,
    private _xmlService: XmlService,
    private _fileDownloaderService: FileDownloaderService) { }

  ngOnInit() {
  }

  public addRow(): void {
    const values = [];
    for (let i = 0; i < this.table.setNames.length; i++) {
      values[i] = 0;
    }
    const row: AssotiativeValues = {
      title: null,
      values: values
    };
    this.table.rows.push(row);
    this.tableChanged.emit(this.table);
  }

  public removeRow(row: AssotiativeValues): void {
    if (this.table.rows.length === 1) {
      const message = this._translate.instant('errors.1RowRemained');
      this._guiNotificatorService.showError(message);
      return;
    }
    const index = this.table.rows.indexOf(row);
    if (index > -1) {
       this.table.rows.splice(index, 1);
    }
    this.tableChanged.emit(this.table);
  }

  public addColumn(): void {
    this.table.setNames.push('Set ' + (this.datasetNumber++));
    this.table.rows.forEach(row => {
      row.values.push(0);
    });
    this.tableChanged.emit(this.table);
  }

  public removeColumn(index: number) {
    if (this.table.rows[0].values.length === 1) {
      const message = this._translate.instant('errors.1ColumnRemained');
      this._guiNotificatorService.showError(message);
      return;
    }
    this.table.setNames.splice(index, 1);
    this.table.rows.forEach(row => {
      row.values.splice(index, 1);
    });
    this.tableChanged.emit(this.table);
  }

  public onKey(event: any): void {
    this.tableChanged.emit(this.table);
  }

  public uploadJsonFile(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._jsonService.uploadAssotiativeValuesJson(formData).subscribe((response: AssotiativeValuesTable) => {
      this.table = response;
      this.tableChanged.emit(this.table);
    });
  }

  public uploadXmlFile(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._xmlService.uploadAssotiativeValueXml(formData).subscribe((response: AssotiativeValuesTable) => {
      this.table = response;
      this.tableChanged.emit(this.table);
    });
  }

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveAssotiativeValuesJsonFile(this.table).subscribe(file => {
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
    this._xmlService.saveAssotiativeValuesXmlFile(this.table).subscribe(file => {
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
