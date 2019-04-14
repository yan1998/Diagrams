import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TwoColumns } from '../models/two-columns';
import { AssotiativeValuesTable } from '../models/assotiative-values';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private _httpClient: HttpClient) { }

  saveTwoColumnsJsonFile(request: TwoColumns[]): Observable<Blob> {
    const href = '../api/twoColumns/SaveJsonFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

  saveAssotiativeValuesJsonFile(request: AssotiativeValuesTable): Observable<Blob> {
    const href = '../api/assotiativeValues/SaveJsonFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

  uploadTwoColumnsJson(formData: FormData): Observable<TwoColumns[]> {
    const href = '../api/twoColumns/UploadJsonFile';
    return this._httpClient.post<TwoColumns[]>(href, formData);
  }

  uploadAssotiativeValuesJson(formData: FormData): Observable<AssotiativeValuesTable> {
    const href = '../api/assotiativeValues/UploadJsonFile';
    return this._httpClient.post<AssotiativeValuesTable>(href, formData);
  }

}
