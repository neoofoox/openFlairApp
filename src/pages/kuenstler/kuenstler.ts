import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenFlairActServiceProvider } from '../../providers/open-flair-act-service/open-flair-act-service';

/**
 * Generated class for the KuenstlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-kuenstler',
  templateUrl: 'kuenstler.html',
})
export class KuenstlerPage {

  public acts: any;
  constructor(public navCtrl: NavController, public actService: OpenFlairActServiceProvider) {
    this.loadActs();
  }

  loadActs(){
    this.actService.load().then(data => {
      this.acts = data;
    });
  }
}