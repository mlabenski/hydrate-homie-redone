import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationModalDesktopPageRoutingModule } from './confirmation-modal-desktop-routing.module';

import { ConfirmationModalDesktopPage } from './confirmation-modal-desktop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationModalDesktopPageRoutingModule
  ],
  declarations: [ConfirmationModalDesktopPage]
})
export class ConfirmationModalDesktopPageModule {}
