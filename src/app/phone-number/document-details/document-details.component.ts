import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { File,FileEntry  } from '@ionic-native/File/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    private platform:Platform,
    private webview: WebView,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private file: File,
    private loadingController: LoadingController,
    private toastController : ToastController,
    private storage: Storage,
    private http : HttpClient) { }
  storeId: ''
  documentTypeId: ""
  documenttype = []
  selecteddocument=null;
  images = [];

  getdropdown() {
    let url =this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
            const res: any = data;
              if (res.status === 200) {
                data = JSON.parse(res.data);
                data= data['response'];
                this.documenttype = data['documentType'];                 
              }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.selectImage();
    });
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}
takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };

  this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  
              });
      } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
         
      }
  });

}
createFileName() {
  var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
  return newFileName;
}

startUpload(imgEntry) {
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast('Error while reading file.');
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
  const loading = await this.loadingController.create({
      message: 'Uploading image...',
  });
  await loading.present();

  this.http.post(this.$api.goTo().document(), {}, {})
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('File upload complete.')
          } else {
              this.presentToast('File upload failed.')
          }
      });
}
async presentToast(text) {
  const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
  });
  toast.present();
}
  ionViewDidEnter() {
    this.getdropdown()
  }

  register() {
    this.route.navigate(['./phone-number/view-registration']);
  }
uploaddocument(){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzMDExMiIsIlVzZXJOYW1lIjoiOTg3ODQxMzIxNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IlYzLjEiLCJDbGFpbVR5cGUgNCI6Ik1hbmFnZVN0b3JlIiwiUm9sZSI6Ik1lcmNoYW50QWRtaW4iLCJuYmYiOjE2NDQyOTgyMTMsImV4cCI6MTY0NDQ3ODIxMywiaWF0IjoxNjQ0Mjk4MjEzfQ.TWkjWEIRsPAXi_tYPP7AHVRL0Vr7QYidx0Gp4JleNMU");

var formdata = new FormData();
formdata.append("filename", "/C:/Users/Scrumbees101/Documents/b0175b8d-9901-42ab-a2f8-6e2e10292326.jpg");
formdata.append("storeId", "94");
formdata.append("documentTypeId", "800");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://api.suppeb.com/api/Store/DocumentUpload")
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
  document() {
    const payload = {
      "storeId": parseInt( localStorage.getItem("storeId")), 
    "documentTypeId": this.selecteddocument
    };
    this.$http.httpCall().post(this.$api.goTo().document(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
          if (res.status === 200) {
            alert("save data successfully")
            //this._storageService.setVerification(payload);
            this.register();
          }
        }, err => {
          debugger
        })   
        .catch(error => {
          console.log(error);
        });
      }
  }