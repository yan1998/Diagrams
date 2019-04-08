import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TwoColumns } from '../models/two-columns';
import { AssotiativeValues } from '../models/assotiative-values';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private _httpClient: HttpClient) { }

  saveTwoColumnsJsonFile(request: TwoColumns[]): Observable<Blob> {
    const href = '../api/twoColumns/SaveJsonFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

  saveAssotiativeValuesJsonFile(request: AssotiativeValues[]): Observable<Blob> {
    const href = '../api/assotiativeValues/SaveJsonFile';
    return this._httpClient.post(href, request, { responseType: 'blob' });
  }

}
