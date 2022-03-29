import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, ToastOptions } from '@ionic/angular';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  constructor(
    private toastService: ToastService,
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  settingsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    jobDesc: new FormControl(''),
    company: new FormControl(''),
    salary: new FormControl('', [Validators.required, Validators.minLength(4)]),
    hobby: new FormControl(''),
  });

  ionViewWillEnter() {
    let settings = this.storageService.getUserSettings();

    if (settings) {
      this.settingsForm.setValue(settings);
    }
  }

  updateChanges() {
    const toastOptions: ToastOptions = {
      message: 'Settings updated Successfully',
      icon: 'checkmark-outline',
    };
    this.toastService.openToast(toastOptions);
    this.storageService.setUserSettings(this.settingsForm.value);
    this.router.navigate(['/tabs/home']);
  }

  async onClearData() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure to delete all the data stored in this device ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          id: 'confirm',
          handler: () => {
            this.storageService.clearAllData();
            App.exitApp();
          },
        },
      ],
    });

    alert.present();
  }
}
