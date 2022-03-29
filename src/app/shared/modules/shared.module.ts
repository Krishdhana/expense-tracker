import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {
  // static forRoot(): ModuleWithProviders<any> {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [StorageService],
  //   };
  // }
}
