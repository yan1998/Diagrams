import { TestBed } from '@angular/core/testing';

import { GuiNotificatorService } from './gui-notificator.service';

describe('GuiNotificatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiNotificatorService = TestBed.get(GuiNotificatorService);
    expect(service).toBeTruthy();
  });
});
