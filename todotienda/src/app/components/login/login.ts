
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  correo = '';
  password = '';
  mensaje = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.mensaje = '';
    this.error = '';

    this.authService.login({
      correo: this.correo,
      password: this.password
    }).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta);
        this.mensaje = respuesta.mensaje;

        if (respuesta.usuario.rol === 'admin') {
          this.router.navigate(['/gestionar-productos']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.error = err.error?.mensaje ||
          'No se pudo iniciar sesión.';
      }
    });
  }
}
