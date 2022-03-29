import { ExpenseDetails } from './ExpenseDetails';
import { UserSettings } from './UserSettings';

export interface UserExpenseStats {
  userSettings: UserSettings;
  expenseDetails: ExpenseDetails[];
}
