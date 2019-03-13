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

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  item$: Observable<Item>;
  itemid: number;
  categories$: Observable<Category[]>;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  public imagePath;
  imgURL: any;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private categoryService: CategoryService, private fileUploadService: FileUploadService) { }

  ngOnInit() {
    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.itemid = + params.get('id');
      console.log('itemid ' + this.itemid);
      this.item$ = this.itemService.readItem(this.itemid);
    });
    this.categories$ =  this.categoryService.readCategories(1);
    this.categories$.subscribe( data => console.log(data));
  }

  saveUpdatedItem(updateditem: Item): void {
    let itemMenu = new Menu();
    itemMenu.id = 2;
    updateditem.menu = itemMenu;
    console.log(updateditem);
    this.itemService.updateItem(updateditem)
         .subscribe( data => {
           alert('Menu Item updated successfully.');
           this.router.navigate(['/menu']);
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
    this.currentUpload.restaurantId = 1;
    this.currentUpload.menuId = 1;
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
