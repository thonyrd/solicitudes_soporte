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

  it('filters tickets by subject or requester', () => {
    component.tickets.set([
      {
        id: 1,
        asunto: 'Error de red',
        solicitante: 'Ana',
        descripcion: 'Descripción',
        categoria: 'Redes',
        prioridad: 'Alta',
        estado: 'Pendiente',
        fechaRegistro: '2026-10-29'
      },
      {
        id: 2,
        asunto: 'Acceso al correo',
        solicitante: 'Luis',
        descripcion: 'Descripción',
        categoria: 'Software',
        prioridad: 'Baja',
        estado: 'Resuelto',
        fechaRegistro: '2026-10-29'
      }
    ]);

    component.busqueda.set('ana');
    expect(component.ticketsFiltrados().map((ticket) => ticket.id)).toEqual([1]);

    component.busqueda.set('correo');
    expect(component.ticketsFiltrados().map((ticket) => ticket.id)).toEqual([2]);
  });

  it('combines priority and status filters', () => {
    component.tickets.set([
      {
        id: 1,
        asunto: 'Error de red',
        solicitante: 'Ana',
        descripcion: 'Descripción',
        categoria: 'Redes',
        prioridad: 'Alta',
        estado: 'Pendiente',
        fechaRegistro: '2026-10-29'
      },
      {
        id: 2,
        asunto: 'Acceso al correo',
        solicitante: 'Luis',
        descripcion: 'Descripción',
        categoria: 'Software',
        prioridad: 'Alta',
        estado: 'Resuelto',
        fechaRegistro: '2026-10-29'
      }
    ]);

    component.filtroPrioridad.set('Alta');
    component.filtroEstado.set('Pendiente');

    expect(component.ticketsFiltrados().map((ticket) => ticket.id)).toEqual([1]);
  });

  it('maps ticket priorities and statuses to visual indicators', () => {
    expect(component.clasePrioridad('Baja')).toContain('priority-low');
    expect(component.clasePrioridad('Media')).toContain('priority-medium');
    expect(component.clasePrioridad('Alta')).toContain('priority-high');
    expect(component.progresoEstado('Pendiente')).toBe(25);
    expect(component.progresoEstado('En Proceso')).toBe(60);
    expect(component.progresoEstado('Resuelto')).toBe(100);
    expect(component.progresoEstado('Abierto')).toBe(25);
  });
});
