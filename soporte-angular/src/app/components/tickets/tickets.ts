import { Component, OnInit, signal } from '@angular/core';
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
