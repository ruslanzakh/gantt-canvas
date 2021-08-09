import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, getDateWithSet } from '../utils/date';

export class GridService {
	root: RootModule;
	module: GridModule;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	addDatesBefore(offsetX) {
		if(offsetX > 0) return;
		const data = this.module.store.data;
		const date = getDateWithSet(data[0].ts, -1);
		this.module.store.add(date, true);
	}

	addDatesAfter(offsetX) {
		const data = this.module.store.data;
		const fullDataWidth = data.length * this.module.view.colWidth;
		if(offsetX < (fullDataWidth - this.root.canvas.width - this.module.view.colWidth)) return;
	
		const date = getDateWithSet(data[data.length - 1].ts, 1);
		this.module.store.add(date);
	}

	showCurrentDay() {
		const columnLength = (this.root.canvas.width / this.module.view.colWidth) / 2;
		const date = getDateWithSet(undefined, -columnLength);
		const dateTs = date.getTime();
		const index = this.module.store.data
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

	getPosByFullDayTs(ts: number, end = false): number {
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
		const colHasTs = columns[1].ts - columns[0].ts;
		const colWidth = this.module.view.colWidth;
		const relativeOffset = x / colWidth;
		return colHasTs * relativeOffset;
	}

}