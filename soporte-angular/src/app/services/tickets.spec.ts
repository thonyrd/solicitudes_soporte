import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TicketsService } from './tickets';

describe('TicketsService', () => {
  let service: TicketsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TicketsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request tickets from the support API', () => {
    service.obtenerTickets().subscribe();

    const request = httpTestingController.expectOne(
      'http://localhost:3000/api/soportes'
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
