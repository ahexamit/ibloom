import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './utills/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const Approutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // {path:'login',component:LoginComponent},
  {
    path: 'dashboard',
    component: FullComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/feature.module').then((m) => m.FeatureModule),
      },
    ],
  },
  
];
