import { Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketsService } from '../../services/tickets';

@Component({
  selector: 'app-tickets',
  imports: [],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {
  tickets = signal<Ticket[]>([]);
  cargando = signal(true);
  error = signal('');
  busqueda = signal('');
  filtroPrioridad = signal('Todas');
  filtroEstado = signal('Todos');
  ticketsFiltrados = computed(() => {
    const termino = this.busqueda().trim().toLocaleLowerCase();
    const prioridad = this.filtroPrioridad().toLocaleLowerCase();
    const estado = this.filtroEstado().toLocaleLowerCase();

    return this.tickets().filter((ticket) => {
      const coincideBusqueda = !termino
        || ticket.asunto.toLocaleLowerCase().includes(termino)
        || ticket.solicitante.toLocaleLowerCase().includes(termino);
      const coincidePrioridad = prioridad === 'todas'
        || ticket.prioridad.trim().toLocaleLowerCase() === prioridad;
      const coincideEstado = estado === 'todos'
        || ticket.estado.trim().toLocaleLowerCase() === estado;

      return coincideBusqueda && coincidePrioridad && coincideEstado;
    });
  });

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando.set(true);
    this.error.set('');

    this.ticketsService.obtenerTickets().subscribe({
      next: (datos) => {
        this.tickets.set(datos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set(
          error.error?.mensaje
            ?? 'No fue posible obtener los tickets. Comprueba que la API esté activa en http://localhost:3000.'
        );
        this.cargando.set(false);
      }
    });
  }

  actualizarBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  actualizarEstado(event: Event): void {
    this.filtroEstado.set((event.target as HTMLSelectElement).value);
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.filtroPrioridad.set('Todas');
    this.filtroEstado.set('Todos');
  }

  clasePrioridad(prioridad: string): string {
    switch (prioridad.trim().toLocaleLowerCase()) {
      case 'baja':
        return 'priority-badge priority-low';
      case 'media':
        return 'priority-badge priority-medium';
      case 'alta':
        return 'priority-badge priority-high';
      default:
        return 'priority-badge';
    }
  }

  progresoEstado(estado: string): number {
    switch (estado.trim().toLocaleLowerCase()) {
      case 'pendiente':
      case 'abierto':
        return 25;
      case 'en proceso':
        return 60;
      case 'resuelto':
        return 100;
      default:
        return 0;
    }
  }

  editar(id: number): void {
    this.router.navigate(['/editar-ticket', id]);
  }

  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar este ticket?')) return;

    this.ticketsService.eliminarTicket(id).subscribe({
      next: () => this.cargarTickets(),
      error: (error) => {
        console.error(error);
        alert('No fue posible eliminar el ticket.');
      }
    });
  }
}
