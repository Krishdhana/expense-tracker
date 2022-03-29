import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [CommonModule, IonicModule, SettingPageRoutingModule, SharedModule],
  declarations: [SettingPage],
})
export class SettingPageModule {}
