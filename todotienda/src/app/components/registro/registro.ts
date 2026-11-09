
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {

  nombre = '';
  correo = '';
  password = '';
  mensaje = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    this.mensaje = '';
    this.error = '';

    this.authService.registrar({
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    }).subscribe({
      next: (respuesta) => {
        this.mensaje = respuesta.mensaje;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.mensaje ||
          'No se pudo registrar el usuario.';
      }
    });
  }
}
