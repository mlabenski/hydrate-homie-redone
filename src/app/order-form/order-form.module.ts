import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderFormPageRoutingModule } from './order-form-routing.module';

import { OrderFormPage } from './order-form.page';
import { ScrollVanishDirective } from '../directives/scroll-vanish.directive';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OrderFormPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OrderFormPage, ScrollVanishDirective]
})
export class OrderFormPageModule {}
