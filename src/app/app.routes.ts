import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
];
