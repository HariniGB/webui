import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/models/category";
import {Menu} from "../../shared/models/menu";
import {Item} from "../../shared/models/item";
import {FileUpload} from "../../shared/models/fileupload";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../shared/services/fileupload.service";
import {ItemService} from "../../shared/services/item.service";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private globalutilService: GlobalutilService, private restaurantService: RestaurantService, private itemService: ItemService, private categoryService: CategoryService, private fileUploadService: FileUploadService) { }
  item: Item = new Item();
  selectedFiles: FileList;
  currentUpload: FileUpload;
  categories$ : Observable<Category[]>;
  public imagePath;
  imgURL: any;
  menuId: number;
  restaurantId: number;

  ngOnInit() {

      this.route.paramMap.subscribe(params => {
          this.menuId = +params.get('menuId');
          console.log('menuId :' + this.menuId);
      });
      this.restaurantId = this.globalutilService.getSessionRestaurantId();

      this.categories$ =  this.categoryService.readCategories(this.restaurantId);
      this.categories$.subscribe( data => console.log(data));
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

  saveItem(): void {
    //console.log(this.item);
    var itemMenu = new Menu();
    itemMenu.id = this.menuId;
    this.item.menu = itemMenu;
    this.itemService.createItem(this.item)
        .subscribe( data => {
          alert("Menu Item created successfully.");
          this.router.navigate(['/editmenuitems',this.menuId]);
        });
  };

  createItem(): void {
    if(this.selectedFiles) {
      this.upload().subscribe(downloadURL => {
          this.item.imagepath = downloadURL;
          this.saveItem();
        })
    }else {
      this.saveItem();
    }
  };
}
