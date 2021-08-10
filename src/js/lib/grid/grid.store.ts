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

	dates: GridDate[] = [];

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	initialData() {
		if(true) {
			const [start_date_ts, end_date_ts] = this.root.tasks.service.getFirstAndLastDeadline();
			const date = getDate(start_date_ts);
			do {
				setDate(date, 1);
				this.add(date);
			} while(date.getTime() <= end_date_ts);
		}
		this.module.service.addDatesBefore(this.root.view.offsetX);
		this.module.service.addDatesAfter(this.root.view.offsetX);
	}

	add(date: Date, unshift = false) {
		const elem = {
			ts: date.getTime(),
			title: date.getDate().toString(),
			month: date.getMonth(),
			year: date.getFullYear()
		}
		if(unshift) this.dates.unshift(elem);
		else this.dates.push(elem);
	}


}