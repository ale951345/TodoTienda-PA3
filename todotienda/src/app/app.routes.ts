
import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'gestionar-productos',
    component: GestionarProductosComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
