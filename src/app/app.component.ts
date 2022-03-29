import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storageService: StorageService
  ) {
    this.platform.pause.subscribe((data) => this.storageService.saveAll());
  }
}
