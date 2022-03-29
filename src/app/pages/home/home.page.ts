import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  ToastOptions,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AmountStats } from 'src/app/shared/models/AmountStats';
import { Expense } from 'src/app/shared/models/Expense';
import { ExpenseDetails } from 'src/app/shared/models/ExpenseDetails';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AddExpensePage } from '../add-expense/add-expense.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private actionSheetController: ActionSheetController,
    private toastService: ToastService
  ) {}

  expenseDetails: ExpenseDetails[] = [];
  amountStats: AmountStats = {} as AmountStats;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.storageService.totalExpenseList$.subscribe(
        (expenseDetails: ExpenseDetails[]) => {
          if (expenseDetails.length) {
            this.expenseDetails = expenseDetails;
            console.log(this.expenseDetails);
          }
        }
      )
    );
  }

  async openAddExpenseModal(expense?: Expense, index?: number) {
    const modal = await this.modalController.create({
      component: AddExpensePage,
      swipeToClose: true,
      componentProps: expense
        ? {
            ...expense,
            updateExpenseIndex: index,
            monthIndex: this.expenseDetails[0].monthId,
          }
        : {},
    });

    await modal.present();
  }

  async onSelectExpense(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: `${this.expenseDetails[0].expenseList[index].expenseName}`,
      buttons: [
        {
          text: 'Update',
          role: 'destructive',
          icon: 'caret-up-circle-outline',
          id: 'update-button',
          data: {
            type: 'update',
          },
          handler: () => {
            this.openAddExpenseModal(
              this.expenseDetails[0].expenseList[index],
              index
            );
            const toastOptions: ToastOptions = {
              message: 'Expense has been updated Successfully',
            };
            this.toastService.openToast(toastOptions);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.storageService.removeExpenseFromList(index);
            const toastOptions: ToastOptions = {
              message: 'Expense Removed',
            };
            this.toastService.openToast(toastOptions);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
    actionSheet.onDidDismiss().then((res) => {
      this.storageService.saveAll();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((data) => {
      data.unsubscribe();
    });
  }
}
