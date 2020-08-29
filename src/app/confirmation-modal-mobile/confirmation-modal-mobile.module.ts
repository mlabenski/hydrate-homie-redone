import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationModalMobilePageRoutingModule } from './confirmation-modal-mobile-routing.module';

import { ConfirmationModalMobilePage } from './confirmation-modal-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationModalMobilePageRoutingModule
  ],
  declarations: [ConfirmationModalMobilePage]
})
export class ConfirmationModalMobilePageModule {}
