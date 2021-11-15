import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, getDaysInMonth, setDateTs } from '../utils/date';

interface GridDate {
	ts: number;
	title: string;
	month: number;
	year: number;
	hour: number;
	isStartMonth: boolean;
	isMiddleDayMonth: boolean;
	today: boolean;
	weekend: boolean;
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
			let [start_date_ts, end_date_ts] = this.root.tasks.service.getFirstAndLastDeadline();
			start_date_ts = this.getStartDayByViewMode(start_date_ts);
			let date = getDate(start_date_ts);
			this.add(date);
			do {
				date = setDateTs(date, this.getOffset(date));
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
				date = setDateTs(date, -this.getOffset(date, true));
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
			hour: date.getHours(),
			isStartMonth: day === 1,
			weekend: [0, 6].includes(date.getDay()), 
			isMiddleDayMonth,
			today,
		}
		if(unshift) this.dates.unshift(elem);
		else this.dates.push(elem);
	}

	
	addDatesBefore(offsetX: number) {
		if(offsetX > this.root.view.canvasWidth) return;
		
		const data = this.dates;
		const { colsOnScreen, colWidth } = this.module.view;
		const length = -offsetX / colWidth;
		let date = getDate(data[0]?.ts, false, null);
		
		for(let i = 0; i < length + colsOnScreen; i++) {
			offsetX += colWidth;
			date = setDateTs(date, -this.getOffset(date, true));
			this.add(date, true);
		}
		this.root.view.offsetX = offsetX;
	}

	addDatesAfter(offsetX: number) {
		const data = this.dates;
		const fullDataWidth = this.module.service.getFullAvailableWidth();
		const { colsOnScreen, colWidth } = this.module.view;
		const width = fullDataWidth - this.root.view.canvasWidth - colWidth
		if(offsetX < width) return;
		const length = ((offsetX - width) / colWidth);
		let date = getDate(data[data.length - 1].ts, false, null);
		for(let i = 0; i < length + colsOnScreen; i++) {
			date = setDateTs(date, this.getOffset(date));
			this.add(date);
		}
	}

	getStartDayByViewMode(start_date_ts: number) {
		const viewMode = this.root.api.viewMode;
		if(['day', 'half-day', 'quarter-day'].indexOf(viewMode) !== -1) return start_date_ts;
		let date = getDate(start_date_ts);
		const targetDay = 1; // monday or first day of month
		let day = date.getDay();
		if(day === 0) day = 7;
		if(viewMode === 'month') {
			day = date.getDate();
		}
		if(day === targetDay) return start_date_ts;
		const offset = (day - targetDay) * this.module.view.dayTs;
		date = setDateTs(date, -offset);
		return date.getTime();
	}

	getOffset(date: Date, minus = false) {
		if(this.root.api.viewMode === 'month') {
			if(minus) return getDaysInMonth(date.getMonth(), date.getFullYear()) * this.module.view.dayTs;
			return getDaysInMonth(date.getMonth() + 1, date.getFullYear()) * this.module.view.dayTs;

		}
		return this.module.view.colTs;
	}


}