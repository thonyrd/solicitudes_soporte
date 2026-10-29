import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets';

@Component({
  selector: 'app-nuevo-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicket {
  error = signal('');

  formulario = new FormGroup({
    asunto: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    solicitante: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    prioridad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('Abierto', { nonNullable: true, validators: [Validators.required] }),
    fechaRegistro: new FormControl(new Date().toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  guardar(): void {
    this.error.set('');
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error.set('Completa todos los campos obligatorios antes de guardar.');
      return;
    }

    this.ticketsService.crearTicket(this.formulario.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (error) => {
        console.error(error);
        this.error.set(
          error.error?.mensaje
            ?? 'No fue posible registrar el ticket. Comprueba que la API y la base de datos estén disponibles.'
        );
      }
    });
  }
}
