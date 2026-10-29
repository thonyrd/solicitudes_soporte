import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Tickets } from './tickets';
import { TicketsService } from '../../services/tickets';

describe('Tickets', () => {
  let component: Tickets;
  let fixture: ComponentFixture<Tickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tickets],
      providers: [
        provideRouter([]),
        {
          provide: TicketsService,
          useValue: {
            obtenerTickets: () => of([
              {
                id: 1,
                asunto: 'Prueba',
                solicitante: 'Usuario',
                descripcion: 'Descripción',
                categoria: 'Software',
                prioridad: 'Media',
                estado: 'Pendiente',
                fechaRegistro: '2026-10-29'
              }
            ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.cargando()).toBe(false);
    expect(component.tickets()).toHaveLength(1);
  });
});
