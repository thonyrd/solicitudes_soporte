import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { EditarTicket } from './editar-ticket';
import { TicketsService } from '../../services/tickets';

describe('EditarTicket', () => {
  let component: EditarTicket;
  let fixture: ComponentFixture<EditarTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTicket],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => '1' }
            }
          }
        },
        {
          provide: TicketsService,
          useValue: {
            obtenerTicket: () => of({
              id: 1,
              asunto: 'Prueba',
              solicitante: 'Usuario',
              descripcion: 'Descripción',
              categoria: 'Software',
              prioridad: 'Media',
              estado: 'Pendiente',
              fechaRegistro: '2026-10-29T03:00:00.000Z'
            }),
            actualizarTicket: () => of({ mensaje: 'Actualizado' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.cargando()).toBe(false);
    expect(component.formulario.controls.asunto.value).toBe('Prueba');
    expect(component.formulario.controls.fechaRegistro.value).toBe('2026-10-29');
  });
});
