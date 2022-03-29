import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async openToast(options: ToastOptions) {
    const toast = await this.toastController.create({
      message: options.message,
      duration: 3000,
      icon: options.icon,
      cssClass: 'mb-5',
    });
    toast.present();
  }
}
