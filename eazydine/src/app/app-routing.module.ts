import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuItemListComponent} from './menu/menu-item-list/menu-item-list.component';
import {AddmenuComponent} from './menu/addmenu/addmenu.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LiveupdateComponent} from './liveupdate/liveupdate.component';
import {EditmenuComponent} from "./menu/editmenu/editmenu.component";
import {AdditemComponent} from "./item/additem/additem.component";
import {EdititemComponent} from "./item/edititem/edititem.component";

const routes: Routes = [
  {path: 'menu', component: MenuItemListComponent},
  {path: 'addmenu', component: AddmenuComponent},
  {path: 'editmenu/:id', component: EditmenuComponent},
  {path: 'additem', component: AdditemComponent},
  {path: 'edititem/:id', component: EdititemComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: DashboardComponent},
  {path: 'liveupdate', component: LiveupdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
