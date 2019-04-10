import { Injectable } from '@angular/core';
import { TwoColumns } from '../models/two-columns';
import { Observable } from 'rxjs';
import { AssotiativeValues } from '../models/assotiative-values';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  constructor(private _httpClient: HttpClient) { }

  saveTwoColumnsXmlFile(request: TwoColumns[]): Observable<Blob> {
    const href = '../api/twoColumns/SaveXmlFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

  saveAssotiativeValuesXmlFile(request: AssotiativeValues[]): Observable<Blob> {
    const href = '../api/assotiativeValues/SaveXmlFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

  uploadTwoColumnsXml(formData: FormData): Observable<TwoColumns[]> {
    const href = '../api/twoColumns/UploadXmlFile';
    return this._httpClient.post<TwoColumns[]>(href, formData);
  }

  uploadAssotiativeValueXml(formData: FormData): Observable<AssotiativeValues[]> {
    const href = '../api/assotiativeValues/UploadXmlFile';
    return this._httpClient.post<AssotiativeValues[]>(href, formData);
  }
}
