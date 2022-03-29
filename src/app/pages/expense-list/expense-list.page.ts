import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/shared/models/Expense';
import { ExpenseDetails } from 'src/app/shared/models/ExpenseDetails';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit, OnDestroy {
  constructor(private storageService: StorageService) {}

  expenseDetails: ExpenseDetails[] = [] as ExpenseDetails[];
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.storageService.totalExpenseList$.subscribe(
        (expenseDetails: ExpenseDetails[]) => {
          this.expenseDetails = expenseDetails;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((data) => {
      data.unsubscribe();
    });
  }
}
