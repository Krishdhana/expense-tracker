import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/Expense';
import { UserExpenseStats } from '../models/UserExpenseStats';
import { UserSettings } from '../models/UserSettings';
import { ExpenseDetails } from '../models/ExpenseDetails';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage, private router: Router) {
    this.initStorage();
  }

  private _storage: Storage;
  userExpenseStats: UserExpenseStats = {} as UserExpenseStats;
  totalExpenseList$ = new BehaviorSubject<ExpenseDetails[]>([]);

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;

    let userStats = await this.getItem('userExpenseStats');
    if (userStats) {
      this.userExpenseStats = { ...userStats };
    } else {
      this.userExpenseStats = this.createNewUserObj();
      this.userExpenseStats.expenseDetails[0].monthId = new Date().getMonth();
      this.userExpenseStats.expenseDetails[0].month = this.getMonthString(
        new Date().getMonth()
      );
      this.saveAll();
      this.router.navigateByUrl('/tabs/welcome');
    }

    this.checkActiveMonth();
    this.totalExpenseList$.next(this.userExpenseStats.expenseDetails);
  }

  createNewUserObj() {
    return {
      userSettings: {
        name: '',
        jobDesc: '',
        company: '',
        salary: 0,
        hobby: '',
      },
      expenseDetails: [
        {
          month: '',
          income: 0,
          monthId: 0,
          savings: 0,
          spent: 0,
          expenseList: [],
        },
      ],
    };
  }

  checkActiveMonth() {
    let monthId = new Date().getMonth();

    if (this.userExpenseStats.expenseDetails[0].monthId < monthId) {
      let expenseDetails: ExpenseDetails = {
        month: this.getMonthString(monthId),
        monthId: monthId,
        income: this.userExpenseStats.userSettings.salary,
        savings: this.userExpenseStats.userSettings.salary,
        spent: 0,
        expenseList: [],
      };
      this.userExpenseStats.expenseDetails.unshift({
        ...expenseDetails,
      });
    }

    this.saveAll();
  }

  public storeItem(key: string, value: any) {
    this.storage.set(key, value);
  }

  public async getItem(key: string) {
    return await this.storage.get(key);
  }

  addNewExpense(expense: Expense, monthIndex?: number) {
    this.userExpenseStats.expenseDetails[0].expenseList.unshift(expense);
    this.calculateAmountStats();
  }

  updateExpense(expense: Expense, index: number) {
    this.userExpenseStats.expenseDetails[0].expenseList.splice(
      index,
      1,
      expense
    );
    this.calculateAmountStats();
  }

  removeExpenseFromList(index: number) {
    this.userExpenseStats.expenseDetails[0].expenseList.splice(index, 1);
    this.calculateAmountStats(0);
  }

  calculateAmountStats(monthIndex = 0) {
    let totalSpent = 0;

    this.userExpenseStats.expenseDetails[monthIndex].expenseList.forEach(
      (expense: Expense) => {
        totalSpent += expense.amountSpent;
      }
    );

    this.userExpenseStats.expenseDetails[monthIndex].spent = totalSpent;
    this.userExpenseStats.expenseDetails[monthIndex].savings =
      this.userExpenseStats.expenseDetails[monthIndex].income - totalSpent;
    this.totalExpenseList$.next(this.userExpenseStats.expenseDetails);
  }

  getUserSettings() {
    return { ...this.userExpenseStats.userSettings };
  }

  setUserSettings(userSettings: UserSettings) {
    this.userExpenseStats.userSettings = userSettings;
    this.userExpenseStats.expenseDetails[0].income = userSettings.salary;
    this.calculateAmountStats();
  }

  setWelcomeInfos(obj: any) {
    this.userExpenseStats.userSettings.name = obj.name;
    this.userExpenseStats.userSettings.salary = +obj.income;
    this.userExpenseStats.expenseDetails[0].income = +obj.income;
    this.calculateAmountStats();
  }

  saveAll() {
    this.storeItem('userExpenseStats', this.userExpenseStats);
  }

  async clearAllData() {
    await this.storage.clear();
  }

  getMonthString(monthID: number) {
    switch (monthID) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  }
}
