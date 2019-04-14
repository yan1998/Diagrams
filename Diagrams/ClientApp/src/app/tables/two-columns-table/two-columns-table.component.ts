import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TwoColumns } from '../../models/two-columns';
import { GuiNotificatorService } from '../../services/gui-notificator.service';
import { JsonService } from '../../services/json.service';
import { XmlService } from '../../services/xml.service';
import { FileDownloaderService } from '../../services/file-downloader.service';

@Component({
  selector: 'app-two-columns-table',
  templateUrl: './two-columns-table.component.html',
  styleUrls: ['./two-columns-table.component.css']
})
export class TwoColumnsTableComponent implements OnInit {

  public isExpanded = false;
  public isJsonDownloading = false;
  public isXmlDownloading = false;

  @Input() table: TwoColumns[];
  @Input() chartName: string;

  @Output() tableChanged: EventEmitter<TwoColumns[]> = new EventEmitter<TwoColumns[]>();

  constructor(private _translate: TranslateService,
    private _guiNotificatorService: GuiNotificatorService,
    private _jsonService: JsonService,
    private _xmlService: XmlService,
    private _fileDownloaderService: FileDownloaderService) { }

  ngOnInit() {
  }

  public addRow(): void {
    const row: TwoColumns = {
      title: '',
      value: 0
    };
    this.table.push(row);
    this.tableChanged.emit(this.table);
  }

  public removeRow(row: TwoColumns): void {
    if (this.table.length === 1) {
      const message = this._translate.instant('errors.1RowRemained');
      this._guiNotificatorService.showError(message);
      return;
    }
    const index = this.table.indexOf(row);
    if (index > -1) {
      this.table.splice(index, 1);
    }
    this.tableChanged.emit(this.table);
  }


  public uploadJsonFile(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._jsonService.uploadTwoColumnsJson(formData).subscribe((response: TwoColumns[]) => {
      this.table = response;
      this.tableChanged.emit(response);
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
      this.table = response;
      this.tableChanged.emit(response);
    });
  }

  public downloadJson() {
    this.isJsonDownloading = true;
    this._jsonService.saveTwoColumnsJsonFile(this.table).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/json' });
// tslint:disable-next-line: max-line-length
      this._fileDownloaderService.downloadBlob(blob, `${this.chartName}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`);
      this.isJsonDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isJsonDownloading = false;
    });
  }

  public downloadXml() {
    this.isXmlDownloading = true;
    this._xmlService.saveTwoColumnsXmlFile(this.table).subscribe(file => {
      const date = new Date();
      const blob = new Blob([file], { type: 'application/xml' });
// tslint:disable-next-line: max-line-length
      this._fileDownloaderService.downloadBlob(blob, `${this.chartName}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xml`);
      this.isXmlDownloading = false;
    }, (error) => {
      this._guiNotificatorService.showError('Server Error!');
      this.isXmlDownloading = false;
    });
  }

  public onKey(event: any): void {
    this.tableChanged.emit(this.table);
  }
}
