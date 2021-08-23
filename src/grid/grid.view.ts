import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity, ColumnRender, ColumnRenderCommon } from './entities/column.entity';
import { MonthEntity, MonthRender } from './entities/month.entity';
import { RowEntity, RowRender } from './entities/row.entity';

const MONTHS = [
	'январь',
	'февраль',
	'март',
	'апрель',
	'май',
	'июнь',
	'июль',
	'август',
	'сентябрь',
	'октябрь',
	'ноябрь',
	'декабрь'
]

interface RichedColumnRender extends ColumnRender {
	month: number;
	year: number;
	ts: number;
	isMiddleMonth: boolean;
}
export class GridView {

	root: RootModule;
	module: GridModule;

	columnEntity: ColumnEntity;
	monthEntity: MonthEntity;
	rowEntity: RowEntity;

	columns: RichedColumnRender[] = [];
	rows: RowRender[];
	months: MonthRender[];

	firstTsOnScreen = 0;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
		this.columnEntity = new ColumnEntity(root);
		this.monthEntity = new MonthEntity(root);
		this.rowEntity = new RowEntity(root);
	}

	get colWidth() {
		return this.root.api.dayColWidth * this.root.view.scaleX;
	}
	
	get colsOnScreen() {
		return this.root.canvas.width / this.colWidth;
	}

	get colTs() {
		return 24 * 60 * 60 * 1000;
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
		
		const width = this.root.canvas.width;
		const length = this.module.store.dates.length;
		const data: RichedColumnRender[] = [];
		
		for(let i = 0; i < length; i++) {
			const el = this.module.store.dates[i];
			const x = (i * this.colWidth) - offsetX;
			
			if(x < -this.colWidth) continue;
			if(x > width) break;
			data.push({
				ts: el.ts,
				x,
				title: el.title,
				month: el.month,
				year: el.year,
				isStartMonth: el.isStartMonth,
				isMiddleMonth: el.isMiddleMonth,
				today: el.today,
			});
		}
		this.columns = data;
	}


	fillMonths() {
		const data = this.columns.reduce((prev, {month, x, year, isMiddleMonth}) => {
			const xx = x + this.colWidth;
			const label = month + '.' + year;
			if(!prev[label]) {
				prev[label] = {
					title: this.getMonthTitle(month, year) ,
					x: x,
					xx: xx,
				};
				return prev;
			}
			if(prev[label].x > x) prev[label].x = x;
			if(prev[label].xx < xx) prev[label].xx = xx;
			if(isMiddleMonth) prev[label].middle = x + (this.colWidth / 2);
			return prev;
		}, {});
		this.months = Object.values(data);
	}

	getMonthTitle(month: number, year: number) {
		if(this.root.api.monthTitleShowYear) {
			return MONTHS[month] + ' ' + year;
		}
		return MONTHS[month];
	}

	fillRows() {
		let odd = true;
		const height = this.root.canvas.height;
		const data: RowRender[] = [];
		const length = this.root.api.tasks.length;
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
		this.firstTsOnScreen = this.module.service.getTsByX(0);
	}

	renderGrid() {
		this.updateStore();
		this.rows.forEach(x => this.rowEntity.renderItem(x, this.rowHeight));

		const colCommon = this.getColumnCommonData();
		this.columns.forEach(x => this.columnEntity.renderCol(x, colCommon));
		
	}

	renderHeader() {

		const { width } = this.root.canvas;

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