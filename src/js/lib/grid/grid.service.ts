import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, setDate } from '../utils/date';

export class GridService {
	root: RootModule;
	module: GridModule;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	showCurrentDay() {
		const columnLength = this.module.view.colsOnScreen / 3;
		const date = getDate();
		setDate(date, -columnLength);
		
		const dateTs = date.getTime();
		const index = this.module.store.dates
			.map((({ts}) => ts))
			.indexOf(dateTs);
		let offsetX = index * this.module.view.colWidth;
		if(offsetX < 0) {
			const diff = dateTs - this.module.store.dates[0].ts;
			if(diff > 0) {
				offsetX = diff / this.module.view.tsHasOneX;
			} else {
				this.module.store.fillDataBefore(dateTs);
				offsetX = 0;
			}
		}
		this.root.view.handleSetOffsetX(offsetX, false);
	}

	getPosXByTs(ts: number): number {
		const firstTs = this.module.view.firstTsOnScreen;
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
		if(!col) return 0;
		const ts = col.ts + ((x - col.x) * this.module.view.tsHasOneX)
		return ts;
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

	getViewHeight() {
		return this.root.canvas.height - this.root.grid.view.headerHeight - this.root.view.scrollbarY.bottomOffset;
	}

	getFullAvailableHeight() {
		let fullHeight = this.module.view.rowHeight * this.root.api.tasks.length;
		const viewHeight = this.getViewHeight();
		if(fullHeight < viewHeight) fullHeight = viewHeight;
		return fullHeight;
	}

	getLeftAvailableHeight() {
		return this.root.grid.service.getFullAvailableHeight() - this.getViewHeight();
	}

	validateOffsetX() {
		const offsetX = this.root.view.offsetX;
		if(offsetX < this.root.canvas.width) {
			this.module.store.addDatesBefore(offsetX);
		} else if(offsetX > this.getFullAvailableWidth() - this.root.canvas.width) {
			this.module.store.addDatesAfter(offsetX);
		}
	}

}