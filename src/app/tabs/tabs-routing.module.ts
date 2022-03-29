import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('../pages/welcome/welcome.module').then(
            (m) => m.WelcomePageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'expense-list',
        loadChildren: () =>
          import('../pages/expense-list/expense-list.module').then(
            (m) => m.ExpenseListPageModule
          ),
      },

      {
        path: 'setting',
        loadChildren: () =>
          import('../pages/setting/setting.module').then(
            (m) => m.SettingPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
