import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  url="";
  selectfile(event){
    if(event.target.files){
      var reader= new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event:any) =>{
        this.url= event.target.result
      }
    }
  }
  storeId: '';
  quickCode: ""
  description: "";
  imageUrl: "";
  longitude: "";
  latitude: "";
  opening = {};
  closing = {};
  deliveryChargesCode: '';
  onlyCodAvailable: '';
  minOrderAmount: '';
  deliveryCharges = [];
  selecteddeliveryCharges = null;
  imageURI:any;
  // imageFileName:any;
  constructor(private route: Router,
    private $http: HttpService,
    // public navCtrl: NavController,
    private $api: ApiRouting,
    // private transfer: FileTransfer,
    // private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) { }
    // uploadFile() {
    //   let loader = this.loadingCtrl.create({
    //     content: "Uploading..."
    //   });
    //   loader.present();
    //   const fileTransfer: FileTransferObject = this.transfer.create();
    
    //   let options: FileUploadOptions = {
    //     fileKey: 'ionicfile',
    //     fileName: 'ionicfile',
    //     chunkedMode: false,
    //     mimeType: "image/jpeg",
    //     headers: {}
    //   }
    
    //   fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
    //     .then((data) => {
    //     console.log(data+" Uploaded Successfully");
    //     this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    //     // loader.dismiss();
    //     this.presentToast("Image uploaded successfully");
    //   }, (err) => {
    //     console.log(err);
    //     // loader.dismiss();
    //     this.presentToast(err);
    //   });
    // }
    // presentToast(msg) {
    //   let toast = this.toastCtrl.create({
    //     message: msg,
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    
    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    
    //   toast.present();
    // }
    // getImage() {
    //   const options: CameraOptions = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    //   }
    
    //   this.camera.getPicture(options).then((imageData) => {
    //     this.imageURI = imageData;
    //   }, (err) => {
    //     console.log(err);
    //     this.presentToast(err);
    //   });
    // }
  ionViewDidEnter() {
    this.getdropdown()
  }

  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/address-details']);
  }

  getdropdown() {
    let url = this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
          this.deliveryCharges = data['deliveryChargesCollection'];

        }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });
      
  }
  basic() {
    const payload = {
      "storeId": parseInt( localStorage.getItem("storeId")),
      "quickCode": this.quickCode,
      "description": this.description,
      "imageUrl": this.imageUrl,
      "longitude": this.longitude,
      "latitude": this.latitude,
      "opening": this.opening,
      "closing": this.closing,
      "deliveryChargesCode": parseInt(this.selecteddeliveryCharges),
      "onlyCodAvailable": this.onlyCodAvailable,
      "minOrderAmount": parseFloat(this.minOrderAmount)
    };
    this.$http.httpCall().post(this.$api.goTo().basic(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
        if (res.status === 200) {
          alert("save data successfully")
          this.register();
          console.log("store details added.");
        }

      }, err => {
        debugger
      })
      .catch(error => {
        console.log(error);
      });
  }
}