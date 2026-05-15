import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'triagem',
    loadComponent: () => import('./pages/triagem/triagem.page').then( m => m.TriagemPage)
  },
  {
    path: 'evidencias',
    loadComponent: () => import('./pages/evidencias/evidencias.page').then( m => m.EvidenciasPage)
  },
  {
    path: 'conclusao',
    loadComponent: () => import('./pages/conclusao/conclusao.page').then( m => m.ConclusaoPage)
  },
];
