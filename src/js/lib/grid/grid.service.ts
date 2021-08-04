import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDateWithSet } from '../utils/date';

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
		if(offsetX < fullDataWidth - this.root.canvas.width) return;
	
		const date = getDateWithSet(data[data.length - 1].ts, 1);
		this.module.store.add(date);
	}

	showCurrentDay() {
		const columnLength = (this.root.canvas.width / 40) / 2;
		const date = getDateWithSet(undefined, -columnLength);
		const dateTs = date.getTime();
		const index = this.module.store.data
			.map((({ts}) => ts))
			.indexOf(dateTs);
		const offsetX = index * this.module.view.colWidth;
		
		this.root.view.handleSetOffsetX(offsetX, false);
	}

}