import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets';

@Component({
  selector: 'app-editar-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicket implements OnInit {
  id = 0;
  cargando = signal(true);
  error = signal('');

  formulario = new FormGroup({
    asunto: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    solicitante: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    prioridad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaRegistro: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.error.set('Identificador de ticket inválido.');
      this.cargando.set(false);
      return;
    }

    this.ticketsService.obtenerTicket(this.id).subscribe({
      next: (ticket) => {
        this.formulario.patchValue({
          asunto: ticket.asunto,
          solicitante: ticket.solicitante,
          descripcion: ticket.descripcion,
          categoria: ticket.categoria,
          prioridad: ticket.prioridad,
          estado: ticket.estado,
          fechaRegistro: ticket.fechaRegistro.slice(0, 10)
        });
        this.cargando.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set('No fue posible cargar el ticket.');
        this.cargando.set(false);
      }
    });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.ticketsService.actualizarTicket(this.id, this.formulario.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (error) => {
        console.error(error);
        this.error.set('No fue posible actualizar el ticket.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tickets']);
  }
}
