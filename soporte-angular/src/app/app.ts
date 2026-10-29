import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './components/cabecera/cabecera';
import { Menu } from './components/menu/menu';

@Component({
  imports: [RouterOutlet, Cabecera, Menu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('soporte-angular');
}
