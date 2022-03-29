import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnDestroy {
  subscription!: Subscription;

  constructor(
    public router: Router,
    private platform: Platform,
    private storageService: StorageService
  ) {
    this.subscription = this.platform.pause.subscribe((data) => {
      this.storageService.saveAll();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
