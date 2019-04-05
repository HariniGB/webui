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
import {DisplayrestaurantComponent} from './restaurant/displayrestaurant/displayrestaurant.component';
import {EditrestaurantComponent} from './restaurant/editrestaurant/editrestaurant.component';
import {AddrestaurantComponent} from "./restaurant/addrestaurant/addrestaurant.component";
import {ListmenusComponent} from "./menu/listmenus/listmenus.component";
import {WaitlistComponent} from "./waitlist/waitlist.component";
import {SelectrestaurantComponent} from "./restaurant/selectrestaurant/selectrestaurant.component";

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
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'menu',
    children:[
      {
        path: '',
        component: ListmenusComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {path: 'addmenu', component: AddmenuComponent, canActivate: [AuthGuard]},
  {path: 'editmenu/:id', component: EditmenuComponent, canActivate: [AuthGuard]},
  {path: 'editmenuitems/:id', component: MenuItemListComponent, canActivate: [AuthGuard]},
  {path: 'editmenu/:menuId/additem', component: AdditemComponent, canActivate: [AuthGuard]},
  {path: 'editmenu/:menuId/edititem/:id', component: EdititemComponent, canActivate: [AuthGuard]},
  {path: 'addcategory', component: AddcategoryComponent, canActivate: [AuthGuard]},
  {path: 'editcategory/:id', component: EditcategoryComponent, canActivate: [AuthGuard]},
  {path: 'category', component: ListcategoriesComponent, canActivate: [AuthGuard]},
  {path: 'liveupdate', component: LiveupdateComponent, canActivate: [AuthGuard]},
  {path: 'waitlist', component: WaitlistComponent, canActivate: [AuthGuard]},
  {path: 'addtable', component: AddtableComponent, canActivate: [AuthGuard]},
  {path: 'edittable/:id', component: EdittableComponent, canActivate: [AuthGuard]},
  {path: 'table', component: ListtablesComponent, canActivate: [AuthGuard]},
  {path: 'editrestaurant/:id', component: EditrestaurantComponent, canActivate: [AuthGuard]},
  {path: 'displayrestaurant', component: DisplayrestaurantComponent, canActivate: [AuthGuard]},
  {path: 'selectrestaurant', component: SelectrestaurantComponent, canActivate: [AuthGuard]},
  {path: 'addrestaurant', component: AddrestaurantComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
