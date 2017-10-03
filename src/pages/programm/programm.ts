import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Const from '../../app/constants';
import { OpenFlairActServiceProvider } from '../../providers/open-flair-act-service/open-flair-act-service';
import Gig from './gig';

/**
 * Generated class for the ProgrammPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * TODO: Toggle Options: Favorites, Stages. 
 * TODO: Schönere Farben finden.
 * TODO: Schöner gestalten. Timeline eher beachten. Termine überlappen sich, sind unterschiedlich lang. etc.
 * TODO: Programm persistieren und option zum manuellen refresh hinzufügen. 
 * TODO: Farbe des Segements anpassen. Müsste OF Rot werden.
 */

@Component({
  selector: 'page-programm',
  templateUrl: 'programm.html',
})

export class ProgrammPage {
  onlyFavorites: boolean = false;
  public acts: any;
  tag: string;
  db: any;
  gigs: Gig[]= [];
  mittwoch: Gig[] = [];
  donnerstag: Gig[] = [];
  freitag: Gig[] = [];
  samstag: Gig[] = [];
  sonntag: Gig[] = [];
  favs: any;
  constructor(public navCtrl: NavController, public actService: OpenFlairActServiceProvider) {
    let today = new Date();
    let wochentag = today.getDay();
    switch(wochentag){
      case Const.MONTAG:
      case Const.DIENSTAG:
      case Const.MITTWOCh:
        this.tag = 'Mittwoch';
        break;
      case Const.DONNERSTAG:
        this.tag = 'Donnerstag';
        break;
      case Const.FREITAG:
        this.tag = 'Freitag';
        break;
      case Const.SAMSTAG:
        this.tag = 'Samstag';
        break;
      case Const.SONNTAG:
        this.tag = 'Sonntag';
        break;
    }
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
          if ( begin != undefined && weekday != undefined 
            && stage != undefined && artist != undefined) {
            if(stage == "hr3 Bühne" || stage == "Seebühne" || stage == "Freibühne"){
              let gigToAdd = new Gig(begin, end, artist, stage, weekday);
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
      case Const.STAGE_SEE:
        return "stageSeebuehne";
      case Const.STAGE_HR3:
        return "stageHr3";
      case Const.STAGE_FREI:
        return "stageFreibuehne";
      case Const.STAGE_E_WERK:
      case Const.STAGE_ELEKTROGARTEN:
      case Const.STAGE_HOF:
      case Const.STAGE_INNENSTADT:
      case Const.STAGE_KLEINKUNSTZELT:
      case Const.STAGE_OF_SPIELFELD:
      case Const.STAGE_SCHLOSSPARK:
      case Const.STAGE_WALD:
      case Const.WALKACT:
      case Const.STAGE_WEINZELT:
      
      default:
        return "ofred";
    }
  }
}