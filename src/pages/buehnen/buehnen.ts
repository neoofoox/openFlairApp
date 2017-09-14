import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenFlairActServiceProvider } from '../../providers/open-flair-act-service/open-flair-act-service';
/**
 * Generated class for the BuehnenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buehnen',
  templateUrl: 'buehnen.html',
})
export class BuehnenPage {
  onlyFavorites: boolean = false;
  public acts: any;
  db: any;
  seebuehne: Gig[] = [];
  hr3: Gig[] = [];
  freibuehne: Gig[] = [];
  other: Gig[] = [];
  favs: any;
  constructor(public navCtrl: NavController, public actService: OpenFlairActServiceProvider) {
    this.loadGigs();
  }
  loadGigs(){
    this.actService.load().then(data => {
      this.acts = data;
      this.acts.forEach(element => {
        let artist = element.act.name;
        let gigs = element.act.gigs;
        gigs.forEach(gig => {
          let begin = gig.begin.integer_time;
          let weekday = gig.day_name;
          let stage = gig.stage_name;
          let gigToAdd: Gig = new Gig();
          if ( begin != undefined && weekday != undefined 
            && stage != undefined && artist != undefined) {
              gigToAdd.artist = artist;
              gigToAdd.begin = begin;
              gigToAdd.stage = stage;
              gigToAdd.weekday = weekday
              switch(stage){
                case "Seebühne":
                  this.seebuehne.push(gigToAdd);
                  break;
                case "hr3 Bühne":
                  this.hr3.push(gigToAdd);
                  break;
                case "Freibühne":
                  this.freibuehne.push(gigToAdd);
                  break;
                default:
                  this.other.push(gigToAdd);
              }
            }
        });
      });
    });
  }

}

class Gig {
  begin: string = "";
  artist: string = "";
  stage: string = "";
  weekday: string = "";

  public Gig(begin:string, artist:string, stage:string, weekday: string){
    this.begin = begin;
    this.artist = artist;
    this.stage = stage;
    this.weekday = weekday;
  }
}
