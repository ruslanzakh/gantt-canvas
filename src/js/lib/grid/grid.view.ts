import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity, ColumnRender } from './entities/column.entity';
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
}
export class GridView {
	root: RootModule;
	module: GridModule;
	columnEntity: ColumnEntity;
	monthEntity: MonthEntity;
	rowEntity: RowEntity;
	columns: RichedColumnRender[] = [];
	firstVisibleTS: number = 0;
	lastVisibleTS: number = 0;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
		this.columnEntity = new ColumnEntity(root);
		this.monthEntity = new MonthEntity(root);
		this.rowEntity = new RowEntity(root);
	}

	get colWidth() {
		return 40 * this.root.view.scaleX;
	}

	get colTs() {
		return 24 * 60 * 60 * 1000;
	}

	get tsHasOneX() {
		return this.colTs / this.colWidth;
	}

	get rowHeight() {
		return 30 * this.root.view.scaleY;
	}
	

	get monthHeight() {
		return 40;
	}

	get dayHeight() {
		return 30;
	}

	get rowsOffsetX() {
		return this.monthHeight + this.dayHeight;
	}

	fillColumns() {
		const offsetX = this.root.view.offsetX;
		
		const width = this.root.canvas.width;
		const length = this.module.store.data.length;
		const data: RichedColumnRender[] = [];
		for(let i = 0; i < length; i++) {
			const el = this.module.store.data[i];
			const x = (i * this.colWidth) - offsetX;
			if(x > width) break;
			if(x < -this.colWidth) continue;
			data.push({
				ts: el.ts,
				x,
				title: el.title,
				month: el.month,
				year: el.year,
			});
		}
		this.columns = data;
	}


	get months(): MonthRender[] {
		const data = this.columns.reduce((prev, {month, x, year}) => {
			const xx = x + this.colWidth;
			const label = month + '.' + year;
			if(!prev[label]) {
				prev[label] = {
					title: MONTHS[month],
					x: x,
					xx: xx,
				};
				return prev;
			}
			if(prev[label].x > x) prev[label].x = x;
			if(prev[label].xx < xx) prev[label].xx = xx;
			return prev;
		}, {});
		return Object.values(data);
	}

	get rows(): RowRender[] {
		const data = [];
		let odd = true;
		for(let i = this.rowsOffsetX + this.rowHeight; i <= this.root.canvas.height; i += this.rowHeight) {
			data.push({y: i, odd});
			odd = !odd;
		}
		
		return data;
	}


	updateStore() {
		this.fillColumns();
		this.firstVisibleTS = this.columns[0].ts;
		this.lastVisibleTS = this.columns[this.columns.length - 1].ts + this.colTs;
	}

	render() {
		this.updateStore();
		this.rows.forEach((x) => {
			this.rowEntity.renderItem(x, this.rowHeight);
		});
		const colCommon = {
			monthHeight: this.monthHeight,
			width: this.colWidth,
			dayHeight: this.dayHeight,
		}
		this.columns.forEach((x) => {
			this.columnEntity.renderItem(x, colCommon);
		});
		this.months.forEach((x) => {
			this.monthEntity.renderItem(x, this.monthHeight);
		});

		
	}

}