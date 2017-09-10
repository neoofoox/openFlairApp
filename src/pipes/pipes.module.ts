import { NgModule } from '@angular/core';
import { FormatTimeHhmmPipe } from './../pipes/format-time-hhmm/format-time-hhmm';
import { FormatOfNewsDatePipe } from './../pipes/format-of-news-date/format-of-news-date';
import { OrderByPipe } from './../pipes/order-by/order-by';
@NgModule({
	declarations: [FormatTimeHhmmPipe,
    FormatOfNewsDatePipe,
    OrderByPipe],
	imports: [],
	exports: [FormatTimeHhmmPipe,
    FormatOfNewsDatePipe,
    OrderByPipe]
})
export class PipesModule {}
