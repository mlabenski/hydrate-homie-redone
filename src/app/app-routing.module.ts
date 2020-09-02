import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminRouteGuard } from './admin-route.guard';
const routes: Routes = [
  {
    path: '', redirectTo: 'order-form', pathMatch: 'full'
  },
  {
    path: 'order-form',
    loadChildren: () => import('./order-form/order-form.module').then( m => m.OrderFormPageModule)
  },
  {
    path: 'confirmation-modal-mobile',
    loadChildren: () => import('./confirmation-modal-mobile/confirmation-modal-mobile.module').then( m => m.ConfirmationModalMobilePageModule)
  },
  {
    path: 'confirmation-modal-desktop',
    loadChildren: () => import('./confirmation-modal-desktop/confirmation-modal-desktop.module').then( m => m.ConfirmationModalDesktopPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AdminRouteGuard],
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
