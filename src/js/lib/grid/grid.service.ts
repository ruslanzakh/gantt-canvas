import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, getDateWithSet, setDate } from '../utils/date';

export class GridService {
	root: RootModule;
	module: GridModule;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	addDatesBefore(offsetX) {
		if(offsetX > this.root.canvas.width) return;
		
		const data = this.module.store.dates;
		const { colsOnScreen, colWidth } = this.module.view;
		const length = -offsetX / colWidth;
		const date = getDate(data[0]?.ts);
		setDate(date, -1);
		this.module.store.add(date, true);
		
		for(let i = 0; i < length + colsOnScreen; i++) {
			offsetX += colWidth;
			setDate(date, -1);
			this.module.store.add(date, true);
		}
		this.root.view.offsetX = offsetX;
	}

	addDatesAfter(offsetX) {
		const data = this.module.store.dates;
		const fullDataWidth = this.getFullAvailableWidth();
		const { colsOnScreen, colWidth } = this.module.view;
		const width = fullDataWidth - this.root.canvas.width - colWidth
		if(offsetX < width) return;
		const length = ((offsetX - width) / colWidth);
		const date = getDate(data[data.length - 1].ts);
		for(let i = 0; i < length + colsOnScreen; i++) {
			setDate(date, 1);
			this.module.store.add(date);
		}
	}

	showCurrentDay() {
		const columnLength = this.module.view.colsOnScreen / 3;
		const date = getDate();
		setDate(date, -columnLength);
		
		const dateTs = date.getTime();
		const index = this.module.store.dates
			.map((({ts}) => ts))
			.indexOf(dateTs);
		const offsetX = index * this.module.view.colWidth;
		this.root.view.handleSetOffsetX(offsetX, false);
	}

	getPosXByTs(ts: number): number {
		const firstTs = this.getTsByX(0);
		const diff = ts - firstTs;
		return diff / this.module.view.tsHasOneX;
	}

	getPosXByFullDayTs(ts: number, end = false): number {
		const date = getDate(ts, end);
		return this.getPosXByTs(date.getTime());
	}

	getTsByX(x: number): number {
		const colWidth = this.module.view.colWidth
		const col = this.module.view.columns
			.find(el => el.x <= x && el.x + colWidth > x);
		return col?.ts || 0;
	}

	getTsByOffsetDiff(x: number): number {
		const columns = this.module.view.columns;
		if(!columns.length) return 0;
		const colHasTs = columns[1].ts - columns[0].ts;
		const colWidth = this.module.view.colWidth;
		const relativeOffset = x / colWidth;
		return colHasTs * relativeOffset;
	}

	getFullAvailableWidth() {
		const canvas = this.root.canvas;
		const colWidth = this.module.view.colWidth;
		let fullWidth = colWidth * this.module.store.dates.length;
		if(fullWidth < canvas.width) fullWidth = canvas.width;

		return fullWidth;
	}

	getFullAvailableHeight() {
		const canvas = this.root.canvas;
		const rowHeight = this.module.view.rowHeight;
		let fullHeight = rowHeight * this.root.store.tasks.length;
		if(fullHeight < canvas.height) fullHeight = canvas.height;

		return fullHeight;
	}

	validateOffsetX() {
		const offsetX = this.root.view.offsetX;
		if(offsetX < this.root.canvas.width) {
			this.addDatesBefore(offsetX);
		} else if(offsetX > this.getFullAvailableWidth() - this.root.canvas.width) {
			this.addDatesAfter(offsetX);
		}
	}

}