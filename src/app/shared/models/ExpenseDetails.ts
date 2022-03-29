import { Expense } from './Expense';

export interface ExpenseDetails {
  month: string;
  monthId: number;
  savings: number;
  income: number;
  spent: number;
  expenseList: Expense[];
}
