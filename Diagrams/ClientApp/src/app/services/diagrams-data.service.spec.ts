import { TestBed } from '@angular/core/testing';

import { DiagramsDataService } from './diagrams-data.service';

describe('DiagramsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagramsDataService = TestBed.get(DiagramsDataService);
    expect(service).toBeTruthy();
  });
});
