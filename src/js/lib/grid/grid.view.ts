import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity, ColumnRender } from './entities/column.entity';
import { MonthEntity, MonthRender } from './entities/month.entity';

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
}
export class GridView {
	root: RootModule;
	module: GridModule;
	columnEntity: ColumnEntity;
	monthEntity: MonthEntity;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
		this.columnEntity = new ColumnEntity(root);
		this.monthEntity = new MonthEntity(root);
	}

	get colWidth() {
		return 40 * this.root.view.scaleX;
	}

	get monthHeight() {
		return 40;
	}

	get columns(): RichedColumnRender[] {
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
				x,
				title: el.title,
				month: el.month,
				year: el.year,
			});
		}
		return data;
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

	render() {
		this.columns.forEach((x) => {
			this.columnEntity.renderItem(x, this.monthHeight, this.colWidth);
		});
		this.months.forEach((x) => {
			this.monthEntity.renderItem(x, this.monthHeight);
		});
		
	}

}