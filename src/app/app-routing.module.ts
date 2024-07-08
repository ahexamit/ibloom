import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/feature.module').then((m) => m.FeatureModule),
      },
    ],
  },
];
