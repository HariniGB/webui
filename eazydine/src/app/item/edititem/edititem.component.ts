import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {Observable} from 'rxjs';
import {Item} from '../../shared/models/item';
import {Menu} from '../../shared/models/menu';
import {FileUpload} from "../../shared/models/fileupload";
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../shared/services/item.service';
import {CategoryService} from '../../shared/services/category.service';
import {FileUploadService} from "../../shared/services/fileupload.service";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  item$: Observable<Item>;
  itemid: number;
  menuId: number;
  restaurantId: number;
  categories$: Observable<Category[]>;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  public imagePath;
  imgURL: any;

  constructor(private route: ActivatedRoute, private router: Router,  private globalUtilService: GlobalutilService,private itemService: ItemService, private categoryService: CategoryService, private fileUploadService: FileUploadService) { }

  ngOnInit() {

    this.restaurantId = this.globalUtilService.getSessionRestaurantId();
    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.itemid = + params.get('id');
      this.menuId = + params.get('menuId');
      console.log('itemid ' + this.itemid);
      console.log('menuId ' + this.menuId);
      this.item$ = this.itemService.readItem(this.itemid);
    });

    this.categories$ =  this.categoryService.readCategories(this.restaurantId);
    this.categories$.subscribe( data => console.log(data));
  }

  saveUpdatedItem(updateditem: Item): void {
    let itemMenu = new Menu();
    itemMenu.id = this.menuId;
    updateditem.menu = itemMenu;
    console.log(updateditem);
    this.itemService.updateItem(updateditem)
         .subscribe( data => {
           alert('Menu Item updated successfully.');
           this.router.navigate(['/editmenuitems', this.menuId]);
         });
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;

      var reader = new FileReader();
      this.imagePath = this.selectedFiles.item(0);
      reader.readAsDataURL(this.selectedFiles.item(0)); 
      reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  
  upload() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new FileUpload(file);
    this.currentUpload.name = this.currentUpload.file.name;
    this.currentUpload.restaurantId = this.restaurantId;
    this.currentUpload.menuId = this.menuId;
    return this.fileUploadService.pushUpload(this.currentUpload);
  }

  updateItem(updateditem: Item): void {
    if(this.selectedFiles) {
      this.upload().subscribe(downloadURL => {
          updateditem.imagepath = downloadURL;
          this.saveUpdatedItem(updateditem);
        })
    }else {
      this.saveUpdatedItem(updateditem);
    }
  };
}
