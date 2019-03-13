import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/models/category";
import {Menu} from "../../shared/models/menu";
import {Item} from "../../shared/models/item";
import {FileUpload} from "../../shared/models/fileupload";
import {Router} from "@angular/router";
import {FileUploadService} from "../../shared/services/fileupload.service";
import {ItemService} from "../../shared/services/item.service";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  constructor(private router: Router, private itemService: ItemService, private categoryService: CategoryService, private fileUploadService: FileUploadService) { }
  item: Item = new Item();
  selectedFiles: FileList;
  currentUpload: FileUpload;
  categories$ : Observable<Category[]>;
  public imagePath;
  imgURL: any;

  ngOnInit() {
   this.categories$ =  this.categoryService.readCategories(1);
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
    this.currentUpload.restaurantId = 1;
    this.currentUpload.menuId = 1;
    return this.fileUploadService.pushUpload(this.currentUpload);
  }

  saveItem(): void {
    //console.log(this.item);
    var itemMenu = new Menu();
    itemMenu.id = 2;
    this.item.menu = itemMenu;
    this.itemService.createItem(this.item)
        .subscribe( data => {
          alert("Menu Item created successfully.");
          this.router.navigate(['/menu']);
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
