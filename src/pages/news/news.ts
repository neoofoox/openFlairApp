import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenFlairNewsServiceProvider } from '../../providers/open-flair-news-service/open-flair-news-service';
/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public news: any;
  constructor(public navCtrl: NavController, public newsService: OpenFlairNewsServiceProvider) {
    this.loadNews();
  }

  loadNews(){
    this.newsService.load().then(data => {
      this.news = data;
    });
  }

}
