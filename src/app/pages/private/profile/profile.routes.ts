import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./profile.page'),
  },
  {
    path: 'edit-user-data',
    loadComponent: () => import('./edit-user-data/edit-user-data.page'),
  },
  {
    path: 'change-password',
    loadComponent: () => import('./change-password/change-password.page'),
  },
] satisfies Routes;