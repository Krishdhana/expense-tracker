import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseListPageRoutingModule } from './expense-list-routing.module';

import { ExpenseListPage } from './expense-list.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseListPageRoutingModule,
    SharedModule,
  ],
  declarations: [ExpenseListPage],
})
export class ExpenseListPageModule {}
