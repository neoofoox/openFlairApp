import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OpenFlairActServiceProvider } from '../../providers/open-flair-act-service/open-flair-act-service';

/**
 * Generated class for the KuenstlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var require: any;
var loki = require('lokijs');
var localforage = require('localforage');

@Component({
  selector: 'page-kuenstler',
  templateUrl: 'kuenstler.html',
})
export class KuenstlerPage {
  onlyFavorites: boolean = false;
  public acts: any;
  public preFilteredActs: any;
  db: any;
  favs: any;
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public actService: OpenFlairActServiceProvider) {
    this.loadPersistedData();
    this.loadActs();
    this.db = new loki('kuenstlerFavs');
    this.favs = this.db.addCollection('favs');    
  }
  toggleFav(kuenstler){
    if(this.isFav(kuenstler)){
      this.favs.findAndRemove({id: kuenstler.id, name: kuenstler.name});
    } else {
      this.favs.insert({id: kuenstler.id, name: kuenstler.name});
    }
    this.persistData();
    
  }
  loadActs(){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.actService.load().then(data => {
      this.preFilteredActs = data;
      this.acts = data;
      loading.dismiss();
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
  persistData(){
    localforage.setItem('kuenstlerFavs', JSON.stringify(this.db)).then(function (value) {
      //Speichern erfolgreich
    }).catch(function(err) {
      //Fehler beim Speichern
    });
  }
  loadPersistedData(){
    var me = this;
    localforage.getItem('kuenstlerFavs').then(function(value) {
      console.log('the full database has been retrieved');
      me.db.loadJSON(value);
      me.favs = me.db.getCollection('favs');
    }).catch(function(err){
      //Fehler beim laden der Daten
    });
  }
  convert2Array(val) {
    return Array.from(val);
  }
  stageColor(gig){
    switch(gig.stage_name){
      case "Seebühne":
        return "stageSeebuehne";
      case "hr3 Bühne":
        return "stageHr3";
      case "Freibühne":
        return "stageFreibuehne";
      case "E-Werk":
      case "Elektrogarten":
      case "Hofbühne":
      case "Innenstadt":
      case "Kleinkunstzelt":
      case "OF-Spielfeld":
      case "Schlossparkbühne":
      case "Waldbühne":
      case "Walkacts":
      case "Weinzelt":
      
      default:
      return "ofred";
    }
  }
  searchKuenstler(ev: any){
    let val = ev.target.value;
    if(val && val.trim != ''){
      this.acts = this.preFilteredActs.filter((act) => {
        return (act.act.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.acts = this.preFilteredActs;
    }
  }

}