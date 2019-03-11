import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { MenuItemListComponent } from './menu/menu-item-list/menu-item-list.component';
import { AddmenuComponent } from './menu/addmenu/addmenu.component';
import { EditmenuComponent } from './menu/editmenu/editmenu.component';
import { HeaderComponent } from './header/header.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { LiveupdateComponent } from './liveupdate/liveupdate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MenuService} from './shared/services/menu.service';
import {RestaurantService} from './shared/services/restaurant.service';
import {ItemService} from './shared/services/item.service';
import {CategoryService} from './shared/services/category.service';
import {TableService} from './shared/services/table.service';
import {FormsModule} from '@angular/forms';
import { AdditemComponent } from './item/additem/additem.component';
import { EdititemComponent } from './item/edititem/edititem.component';
import {OrderModule} from 'ngx-order-pipe';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { ListcategoriesComponent } from './category/listcategories/listcategories.component';
import { AddtableComponent } from './table/addtable/addtable.component';
import { EdittableComponent } from './table/edittable/edittable.component';
import { ListtablesComponent } from './table/listtables/listtables.component';
import { EditrestaurantComponent } from './restaurant/editrestaurant/editrestaurant.component';
import { ListrestaurantComponent } from './restaurant/listrestaurant/listrestaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemListComponent,
    AddmenuComponent,
    EditmenuComponent,
    HeaderComponent,
    MainnavComponent,
    LiveupdateComponent,
    DashboardComponent,
    AdditemComponent,
    EdititemComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ListcategoriesComponent,
    AddtableComponent,
    EdittableComponent,
    ListtablesComponent,
    EditrestaurantComponent,
    ListrestaurantComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [MenuService, RestaurantService, ItemService, CategoryService, TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
