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
  //TODO: toogle Favorites.
  //TODO: save gigs to local Storage & make option menü for manuall reloading.
  onlyFavorites: boolean = false;
  public acts: any;
  db: any;
  gigs: Gig[]= [];
  mittwoch: Gig[] = [];
  donnerstag: Gig[] = [];
  freitag: Gig[] = [];
  samstag: Gig[] = [];
  sonntag: Gig[] = [];
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
          let end = gig.end.integer_time;
          let weekday = gig.day_name;
          let stage = gig.stage_name;
          let gigToAdd: Gig = new Gig();
          if ( begin != undefined && weekday != undefined 
            && stage != undefined && artist != undefined) {
              gigToAdd.artist = artist;
              gigToAdd.begin = begin;
              gigToAdd.end = end;
              gigToAdd.stage = stage;
              gigToAdd.weekday = weekday;
              this.gigs.push(gigToAdd);
              switch(weekday){
                case "Mittwoch":
                  this.mittwoch.push(gigToAdd);
                  break;
                case "Donnerstag":
                  this.donnerstag.push(gigToAdd);
                  break;
                case "Freitag":
                  this.freitag.push(gigToAdd);
                  break;
                case "Samstag":
                  this.samstag.push(gigToAdd);
                  break;
                case "Sonntag":
                  this.sonntag.push(gigToAdd);
                  break;
              }
            }
        });
        this.mittwoch.sort(this.compare);
        this.donnerstag.sort(this.compare);
        this.freitag.sort(this.compare);
        this.samstag.sort(this.compare);
        this.sonntag.sort(this.compare);
      });
    });
    
  }
  compare(a,b) {
    return (a.begin > b.begin) ? 1 : ((b.begin > a.begin) ? -1 : 0);
  }

  stageColor(stage){
    switch(stage){
      case "Seebühne":
        return "stageSeebuehne";
      case "hr3 Bühne":
        return "stageHr3";
      case "Freibühne":
        return "stageFreibuehne";
      // case "E-Werk":
      // case "Elektrogarten":
      // case "Hofbühne":
      // case "Innenstadt":
      // case "Kleinkunstzelt":
      // case "OF-Spielfeld":
      // case "Schlossparkbühne":
      // case "Waldbühne":
      // case "Walkacts":
      // case "Weinzelt":
      
      default:
        return "ofred";
    }
  }

}


class Gig {
  begin: string = "";
  end: string = "";
  artist: string = "";
  stage: string = "";
  weekday: string = "";

  public Gig(begin:string, end:string, artist:string, stage:string, weekday: string){
    this.begin = begin;
    this.end = end;
    this.artist = artist;
    this.stage = stage;
    this.weekday = weekday;
  }
}
