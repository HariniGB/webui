import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {MenuItemListComponent} from './menu/menu-item-list/menu-item-list.component';
import {AddmenuComponent} from './menu/addmenu/addmenu.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LiveupdateComponent} from './liveupdate/liveupdate.component';
import {EditmenuComponent} from "./menu/editmenu/editmenu.component";
import {AdditemComponent} from "./item/additem/additem.component";
import {EdititemComponent} from "./item/edititem/edititem.component";
import {EditcategoryComponent} from "./category/editcategory/editcategory.component";
import {AddcategoryComponent} from "./category/addcategory/addcategory.component";
import {ListcategoriesComponent} from "./category/listcategories/listcategories.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./shared/security/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {EdittableComponent} from './table/edittable/edittable.component';
import {AddtableComponent} from './table/addtable/addtable.component';
import {ListtablesComponent} from './table/listtables/listtables.component';
import {ListrestaurantComponent} from './restaurant/listrestaurant/listrestaurant.component';
import {EditrestaurantComponent} from './restaurant/editrestaurant/editrestaurant.component';

/*const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuItemListComponent, canActivate: [AuthGuard]},
  {path: 'menu', component: MenuItemListComponent},
  {path: 'addmenu', component: AddmenuComponent, canActivate: [AuthGuard]},
  {path: 'addmenu', component: AddmenuComponent},
  {path: 'editmenu/:id', component: EditmenuComponent, canActivate: [AuthGuard]},
  {path: 'additem', component: AdditemComponent, canActivate: [AuthGuard]},
  {path: 'edititem/:id', component: EdititemComponent, canActivate: [AuthGuard]},
  {path: 'addcategory', component: AddcategoryComponent, canActivate: [AuthGuard]},
  {path: 'editcategory/:id', component: EditcategoryComponent, canActivate: [AuthGuard]},
  {path: 'category', component: ListcategoriesComponent, canActivate: [AuthGuard]},
  {path: 'liveupdate', component: LiveupdateComponent, canActivate: [AuthGuard]},
];*/

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuItemListComponent},
  {path: 'addmenu', component: AddmenuComponent},
  {path: 'editmenu/:id', component: EditmenuComponent},
  {path: 'additem', component: AdditemComponent},
  {path: 'edititem/:id', component: EdititemComponent},
  {path: 'addcategory', component: AddcategoryComponent},
  {path: 'editcategory/:id', component: EditcategoryComponent},
  {path: 'category', component: ListcategoriesComponent},
  {path: 'liveupdate', component: LiveupdateComponent},
  {path: 'addtable', component: AddtableComponent},
  {path: 'edittable/:id', component: EdittableComponent},
  {path: 'table', component: ListtablesComponent},
  {path: 'editrestaurant/:id', component: EditrestaurantComponent},
  {path: 'restaurant', component: ListrestaurantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
