import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from '../models/fileupload' ;
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import {catchError, mergeMap, last} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private basePath:string = '/restaurant';

  constructor(private afStorage: AngularFireStorage) { }

  pushUpload(upload: FileUpload) : Observable<any> {
    const filePath = this.basePath +'/' + upload.restaurantId + '/menu/' + upload.menuId + '/'+ upload.file.name;
    const task = this.afStorage.upload(filePath, upload.file);
    const fileRef = this.afStorage.ref(filePath);
    return <Observable<any>>task.snapshotChanges().pipe(
        last(),
        mergeMap(() => {
            const url = fileRef.getDownloadURL();
            return url;
        })
    );
  }
}
