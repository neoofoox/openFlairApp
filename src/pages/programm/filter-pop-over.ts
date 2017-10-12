import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

declare var require: any;
var loki = require('lokijs');
var localforage = require('localforage');

@Component({
    selector: 'page-filter-pop-over',
    templateUrl: 'filter-pop-over.html',
})

export class FilterPopOverPage {
    contentEle: any;
    textEle: any;
    db: any;
    selection: any;
    hr3checked: true;

    constructor(private navParams: NavParams) {
        this.loadPersistedData();
        this.db = new loki('selectedStages');
        this.selection = this.db.addCollection('selected');
    }

    ngOnInit() {
        if (this.navParams.data) {
            this.contentEle = this.navParams.data.contentEle;
            this.textEle = this.navParams.data.textEle;
        }
    }

    selectStage(stage) {
        if (this.isStageSelected(stage)) {
            this.selection.findAndRemove({ name: stage });
            console.log("selektion aufgehoben");
        } else {
            this.selection.insert({ name: stage });
            console.log("selektion erfolgt");
        }
        this.persistData();
    }

    isStageSelected(stage) {
        var booool = this.selection.find({ name: stage }).length > 0;
        if (booool) {
            console.log('ist selektiert');
        } else {
            console.log('ist NICHT selektiert');
        }
        return booool;
    }

    persistData() {
        localforage.setItem('selectedStages', JSON.stringify(this.db)).then(function (value) {
            console.log("Daten gespeichert");
        }).catch(function (err) {
            console.log("Fehler beim Speichern der selektierten Bühnen");
        });
    }

    loadPersistedData() {
        var me = this;
        localforage.getItem('selectedStages').then(function (value) {
            me.db.loadJSON(value);
            me.selection = me.db.getCollection('selected');
            console.log("Daten geladen");
        }).catch(function (err) {
            console.log("Fehler beim Laden der selektierten Bühnen")
        })
    }
    convert2Array(val) {
        return Array.from(val);
      }

}