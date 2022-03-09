import { TestBed } from '@angular/core/testing';

import { SignapiService } from './signapi.service';

describe('SignapiService', () => {
  let service: SignapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
