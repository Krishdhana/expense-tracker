import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastOptions } from '@ionic/angular';
import { Expense } from 'src/app/shared/models/Expense';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  @Input() expenseName: string;
  @Input() amountSpent: string;
  @Input() updateExpenseIndex: string;
  @Input() MonthIndex: string;

  expense: Expense = {} as Expense;
  isUpdateMode = false;

  ngOnInit(): void {
    if (this.expenseName && this.amountSpent) {
      this.expense.expenseName = this.expenseName;
      this.expense.amountSpent = +this.amountSpent;
      this.expenseForm.setValue(this.expense);
      this.isUpdateMode = true;
    }
  }

  expenseForm = this.formBuilder.group({
    expenseName: ['', Validators.required],
    amountSpent: ['', Validators.required],
  });

  onAddExpense() {
    if (this.isUpdateMode) {
      this.storageService.updateExpense(
        this.expenseForm.value,
        +this.updateExpenseIndex
      );
    } else {
      this.storageService.addNewExpense(this.expenseForm.value);
    }

    const toastOptions: ToastOptions = {
      message: this.isUpdateMode
        ? 'Expense Updated'
        : 'New Expense added to your list',
      icon: 'checkmark-outline',
    };

    this.toastService.openToast(toastOptions);
    this.modalController.dismiss();
  }
}
