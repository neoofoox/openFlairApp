import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenFlairActServiceProvider } from '../../providers/open-flair-act-service/open-flair-act-service';

/**
 * Generated class for the KuenstlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var require: any;
var loki = require('lokijs');

@Component({
  selector: 'page-kuenstler',
  templateUrl: 'kuenstler.html',
})
export class KuenstlerPage {
  onlyFavorites: boolean = false;
  public acts: any;
  db: any;
  favs: any;
  
  constructor(public navCtrl: NavController, public actService: OpenFlairActServiceProvider) {
    this.loadActs();
    this.db = new loki('kuenstlerFavs');
    this.favs = this.db.addCollection('favs');    
  }
  toggleFav(kuenstler){
    //TODO: add this artist to Favs or remove it when existing.
    console.log("click");
    if(this.isFav(kuenstler)){
      this.favs.remove({id: kuenstler.id, name: kuenstler.name});
    } else {
      this.favs.insert({id: kuenstler.id, name: kuenstler.name});
    }
    
  }
  loadActs(){
    this.actService.load().then(data => {
      this.acts = data;
    });
  }
  isFav(kuenstler){
    return this.favs.find({id: kuenstler.id, name: kuenstler.name}).length > 0;
  }

  isFiltered(){
    return this.onlyFavorites;
  }

  filterFavs(){
    if(this.onlyFavorites){
      this.onlyFavorites = false;
    } else {
      this.onlyFavorites = true;
    }
  }

  convert2Array(val) {
    return Array.from(val);
  }

}