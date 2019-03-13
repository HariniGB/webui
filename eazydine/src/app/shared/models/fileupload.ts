import {Injectable} from "@angular/core";

export class FileUpload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  restaurantId:number;
  menuId:number;
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
  }
}


