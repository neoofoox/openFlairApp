import { Component } from '@angular/core';

import { NewsPage } from '../news/news';
import { KuenstlerPage } from '../kuenstler/kuenstler';
import { FaqPage } from '../faq/faq';
import { BuehnenPage } from '../buehnen/buehnen'; 
import { ProgrammPage } from '../programm/programm';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = KuenstlerPage;
  tab3Root = ProgrammPage;
  tab4Root = BuehnenPage;
  tab5Root = FaqPage;

  constructor() {

  }
}
