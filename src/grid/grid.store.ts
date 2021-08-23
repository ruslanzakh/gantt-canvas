import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, setDate, getDaysInMonth } from '../utils/date';

interface GridDate {
	ts: number;
	title: string;
	month: number;
	year: number;
	isStartMonth: boolean;
	isMiddleMonth: boolean;
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
			const date = getDate(start_date_ts);
			do {
				setDate(date, 1);
				this.add(date);
			} while(date.getTime() <= end_date_ts);
		}
		this.addDatesBefore(this.root.view.offsetX);
		this.addDatesAfter(this.root.view.offsetX);
		
	}

	fillDataBefore(ts: number) {
		const date = getDate(this.dates[0].ts);
		if(date.getTime() > ts) {
			do {
				setDate(date, -1);
				this.add(date, true);
			} while(date.getTime() > ts);
		}
	}

	add(date: Date, unshift = false) {
		const day = date.getDate();
		const middleDayInMonth = Math.floor(getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
		const todayTs = getDate().getTime();
		const today = todayTs === getDate(date.getTime()).getTime();
		const elem = {
			ts: date.getTime(),
			title: date.getDate().toString(),
			month: date.getMonth(),
			year: date.getFullYear(),
			isStartMonth: day === 1,
			isMiddleMonth: day === middleDayInMonth,
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
		const date = getDate(data[0]?.ts);
		setDate(date, -1);
		this.add(date, true);
		
		for(let i = 0; i < length + colsOnScreen; i++) {
			offsetX += colWidth;
			setDate(date, -1);
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
		const date = getDate(data[data.length - 1].ts);
		for(let i = 0; i < length + colsOnScreen; i++) {
			setDate(date, 1);
			this.add(date);
		}
	}


}