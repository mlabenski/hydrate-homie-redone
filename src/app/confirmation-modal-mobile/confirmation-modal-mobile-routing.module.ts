import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationModalMobilePage } from './confirmation-modal-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationModalMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationModalMobilePageRoutingModule {}
