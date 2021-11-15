import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity, ColumnRender, ColumnRenderCommon } from './entities/column.entity';
import { MonthEntity, MonthRender } from './entities/month.entity';
import { RowEntity, RowRender } from './entities/row.entity';
import { ObjectList } from '../utils/interfaces';

interface RichedColumnRender extends ColumnRender {
	month: number;
	year: number;
	ts: number;
	isMiddleDayMonth: boolean;
}
export class GridView {

	root: RootModule;
	module: GridModule;

	columnEntity: ColumnEntity;
	monthEntity: MonthEntity;
	rowEntity: RowEntity;

	columns: RichedColumnRender[] = [];
	rows: RowRender[] = [];
	months: MonthRender[] = [];

	firstTsOnScreen = 0;

	dayTs = 24 * 60 * 60 * 1000;
	halfDayTs = 12 * 60 * 60 * 1000;
	quarterDayTs = 6 * 60 * 60 * 1000;
	threeHoursTs = 3 * 60 * 60 * 1000;
	hourTs = 60 * 60 * 1000;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
		this.columnEntity = new ColumnEntity(root);
		this.monthEntity = new MonthEntity(root);
		this.rowEntity = new RowEntity(root);
	}

	get colWidth() {
		if(['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1)
			return this.root.api.dayColWidth * this.root.view.scaleX;
		if(this.root.api.viewMode === 'week')
			return this.root.api.weekViewColWidth * this.root.view.scaleX;
		return this.root.api.monthViewColWidth * this.root.view.scaleX;
	}
	
	get colsOnScreen() {
		return this.root.view.canvasWidth / this.colWidth;
	}

	get colTs() {
		if(this.root.api.viewMode === 'day') return this.dayTs;
		if(this.root.api.viewMode === 'half-day') return this.halfDayTs;
		if(this.root.api.viewMode === 'quarter-day') return this.quarterDayTs;
		if(this.root.api.viewMode === 'three-hours') return this.threeHoursTs;
		if(this.root.api.viewMode === 'hour') return this.hourTs;
		else if(this.root.api.viewMode === 'week') return this.weekTs;
		return this.monthTs;
	}

	get weekTs() {
		return this.dayTs * 7;
	}

	get monthTs() {
		return this.dayTs * 30;
	}

	get tsHasOneX() {
		return this.colTs / this.colWidth;
	}

	get rowHeight() {
		return this.root.api.rowHeight * this.root.view.scaleY;
	}
	
	get monthHeight() {
		return this.root.api.monthHeight;
	}

	get dayHeight() {
		return this.root.api.dayHeight;
	}

	get headerHeight() {
		return this.monthHeight + this.dayHeight;
	}

	get rowsOffsetY() {
		return this.monthHeight + this.dayHeight;
	}

	fillColumns() {
		const offsetX = this.root.view.offsetX;
		
		const width = this.root.view.canvasWidth;
		const length = this.module.store.dates.length;
		const data: RichedColumnRender[] = [];
		
		for(let i = 0; i < length; i++) {
			const el = this.module.store.dates[i];
			const x = (i * this.colWidth) - offsetX;
			
			if(x < -this.colWidth) continue;
			if(x > (width + this.colWidth)) break;
			data.push({
				ts: el.ts,
				x,
				title: el.title,
				month: el.month,
				hour: el.hour,
				year: el.year,
				isStartMonth: el.isStartMonth,
				isMiddleDayMonth: el.isMiddleDayMonth,
				today: el.today,
				weekend: el.weekend,
			});
		}
		
		this.columns = data;
	}


	fillMonths() {
		const isMonthView = this.root.api.viewMode === 'month';
		const isPartDayView = ['half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1;
		const data = this.columns.reduce((prev: ObjectList<MonthRender>, {month, x, year, isMiddleDayMonth, title: taskTitle}) => {
			const xx = x + this.colWidth;
			let label: number | string = month + '.' + year;
			if(isMonthView) label = year;
			else if(isPartDayView) label = taskTitle + '.' + month;
			let title = this.getMonthTitle(month, year);
			if(isMonthView) title = year.toString();
			else if(isPartDayView) title = taskTitle + '.' + this.getMonthNumber(month);
			if(!prev[label]) {
				prev[label] = {
					title,
					x: x,
					xx: xx,
				};
				return prev;
			}
			if(prev[label].x > x) prev[label].x = x;
			if(prev[label].xx < xx) prev[label].xx = xx;
			if(isMiddleDayMonth) prev[label].middle = x + (this.colWidth / 2);
			return prev;
		}, {});
		this.months = Object.values(data);
	}

	getMonthTitle(month: number, year?: number) {
		const months = this.root.api.monthNames[this.root.api.lang] ?? this.root.api.monthNames['ru'];
		if(this.root.api.monthTitleShowYear && year) {
			return months[month] + ' ' + year;
		}
		return months[month];
	}

	getMonthNumber(month: number) {
		month++;
		if(month < 10) return '0' + month;
		return month.toString();
	}

	fillRows() {
		let odd = true;
		const height = this.root.view.canvasHeight;
		const data: RowRender[] = [];
		const headerOffset = this.rowsOffsetY + this.rowHeight;
		const offsetY = headerOffset - this.root.view.offsetY - this.rowHeight;
		const minY = this.rowsOffsetY - this.rowHeight;
		let i = Math.floor((-offsetY + minY) / this.rowHeight);
		let y = 0;
		do {
			y = (i * this.rowHeight) + offsetY;
			i++;
			odd = i % 2 === 1;
			if(y > height) break;
			if(y < minY) continue;
			data.push({ y, odd });
		} while(y <= height)
		this.rows = data;
	}

	updateStore() {
		this.fillColumns();
		this.fillRows();
		this.fillMonths();
		this.firstTsOnScreen = this.module.service.getFirstTsOnScreen();
	}

	renderGrid() {
		this.updateStore();
		this.rows.forEach(x => this.rowEntity.renderItem(x, this.rowHeight));

		const colCommon = this.getColumnCommonData();
		this.columns.forEach(x => this.columnEntity.renderCol(x, colCommon));
		
	}

	renderHeader() {

		const width = this.root.view.canvasWidth;

		this.root.ctx.fillStyle = '#ffffff';
		this.root.ctx.rect(0, 0, width, this.rowsOffsetY);
		this.root.ctx.fill();

		const colCommon = this.getColumnCommonData();
		this.columns.forEach(x => this.columnEntity.renderDay(x, colCommon));
		this.months.forEach(x => this.monthEntity.renderItem(x, this.monthHeight));
	}

	getColumnCommonData(): ColumnRenderCommon {
		return  {
			monthHeight: this.monthHeight,
			width: this.colWidth,
			dayHeight: this.dayHeight,
		}
	}

}