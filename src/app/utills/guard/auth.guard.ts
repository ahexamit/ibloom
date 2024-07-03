import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(state);
  console.log(route);

  const router = inject(Router);
  const token: any = localStorage.getItem("token")
  if (token) {
    return true
  } else {
    router.navigate(['login'])
    localStorage.clear()
    return false
  }
};
