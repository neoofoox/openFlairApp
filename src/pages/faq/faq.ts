import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenFlairFaqServiceProvider } from '../../providers/open-flair-faq-service/open-flair-faq-service';
/**
 * Generated class for the FaqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  public faqs: any;
  constructor(public navCtrl: NavController, public faqService: OpenFlairFaqServiceProvider) {
    this.loadFaqs();
  }

  loadFaqs(){
    this.faqService.load().then(data => {
      this.faqs = data;
    });
  }

}
