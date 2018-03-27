import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private modalController: ModalController) {

  }

  ionViewWillEnter(){
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  scanOnclick() {
    let modal = this.modalController.create('ScanQrPage');
    modal.present();
  }
}
