import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {}

  welcomeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    income: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.storageService.setWelcomeInfos(this.welcomeForm.value);
    this.router.navigateByUrl('tabs/home');
  }
}
