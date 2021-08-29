import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, getDaysInMonth, setDateTs } from '../utils/date';

interface GridDate {
	ts: number;
	title: string;
	month: number;
	year: number;
	isStartMonth: boolean;
	isMiddleDayMonth: boolean;
	today: boolean;
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
		if(this.root.api.renderAllTasksFromStart) {
			const [start_date_ts, end_date_ts] = this.root.tasks.service.getFirstAndLastDeadline();
			let date = getDate(start_date_ts);
			do {
				date = setDateTs(date, this.module.view.colTs);
				this.add(date);
			} while(date.getTime() <= end_date_ts);
		}
		this.addDatesBefore(this.root.view.offsetX);
		this.addDatesAfter(this.root.view.offsetX);
		
	}

	fillDataBefore(ts: number) {
		let date = getDate(this.dates[0].ts);
		if(date.getTime() > ts) {
			do {
				date = setDateTs(date, -this.module.view.colTs);
				this.add(date, true);
			} while(date.getTime() > ts);
		}
	}

	add(date: Date, unshift = false) {
		const day = date.getDate();
		let isMiddleDayMonth = false;
		if(this.root.api.viewMode === 'day') {
			const middleDayInMonth = Math.floor(getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
			isMiddleDayMonth = day === middleDayInMonth;
		}
		const todayTs = getDate().getTime();
		const today = todayTs === getDate(date.getTime()).getTime();
		const elem = {
			ts: date.getTime(),
			title: date.getDate().toString(),
			month: date.getMonth(),
			year: date.getFullYear(),
			isStartMonth: day === 1,
			isMiddleDayMonth,
			today,
		}
		if(unshift) this.dates.unshift(elem);
		else this.dates.push(elem);
	}

	
	addDatesBefore(offsetX: number) {
		if(offsetX > this.root.canvas.width) return;
		
		const data = this.dates;
		const { colsOnScreen, colWidth } = this.module.view;
		const length = -offsetX / colWidth;
		let date = getDate(data[0]?.ts);
		date = setDateTs(date, -this.module.view.colTs);
		this.add(date, true);
		
		for(let i = 0; i < length + colsOnScreen; i++) {
			offsetX += colWidth;
			date = setDateTs(date, -this.module.view.colTs);
			this.add(date, true);
		}
		this.root.view.offsetX = offsetX;
	}

	addDatesAfter(offsetX: number) {
		const data = this.dates;
		const fullDataWidth = this.module.service.getFullAvailableWidth();
		const { colsOnScreen, colWidth } = this.module.view;
		const width = fullDataWidth - this.root.canvas.width - colWidth
		if(offsetX < width) return;
		const length = ((offsetX - width) / colWidth);
		let date = getDate(data[data.length - 1].ts);
		for(let i = 0; i < length + colsOnScreen; i++) {
			date = setDateTs(date, this.module.view.colTs);
			this.add(date);
		}
	}


}