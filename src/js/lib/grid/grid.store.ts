import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, setDate } from '../utils/date';

interface GridDate {
	ts: number;
	title: string;
	month: number;
	year: number;
}

export class GridStore {
	root: RootModule;
	module: GridModule;

	data: GridDate[] = [];

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	get firstDate() {
		return new Date('07.07.21').getTime();
	}
	
	get lastDate() {
		return new Date('09.09.21').getTime();
	}

	get columnLength() {
		return this.root.canvas.width / this.module.view.colWidth;
	}

	initialData() {
		this.fillPrevData();
		this.fillNextData();
	}

	fillPrevData() {
		const date = getDate();
		let prev = 0;
		const firstDateTs = this.firstDate ?? null;
		do {
			setDate(date, -1);
			prev++;
			this.add(date, true);
		} while(firstDateTs && date.getTime() > firstDateTs);
		for(let i = prev; i < this.columnLength; i++) {
			setDate(date, -1);
			this.add(date, true);
		}
	}

	fillNextData() {
		const date = getDate();
		let next = 0;
		const lastDateTs = this.lastDate ?? null;
		do {
			next++;
			this.add(date);
			setDate(date, 1);
		} while(lastDateTs && date.getTime() < lastDateTs);
		for(let i = next; i <= this.columnLength; i++) {
			this.add(date);
			setDate(date, 1);
		}
	}

	add(date: Date, unshift = false) {
		const elem = {
			ts: date.getTime(),
			title: date.getDate().toString(),
			month: date.getMonth(),
			year: date.getFullYear()
		}
		if(unshift) this.data.unshift(elem);
		else this.data.push(elem);
	}


}