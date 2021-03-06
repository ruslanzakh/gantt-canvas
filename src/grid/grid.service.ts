import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { getDate, setDate, SetHoursName } from '../utils/date';

export class GridService {
	root: RootModule;
	module: GridModule;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
	}

	showDay(
		ts?: number,
		needRender?: boolean,
		needAnimate?: boolean,
		toCenter = true
	) {
		const date = getDate(ts);
		if (toCenter) {
			let columnLength = this.module.view.colsOnScreen / 3;
			if (this.root.api.viewMode === 'week') columnLength *= 7;
			else if (this.root.api.viewMode === 'month') columnLength *= 30;
			else if (this.root.api.viewMode === 'half-day') columnLength /= 2;
			else if (this.root.api.viewMode === 'quarter-day')
				columnLength /= 4;
			else if (this.root.api.viewMode === 'three-hours') columnLength = 0;
			else if (this.root.api.viewMode === 'hour') columnLength = 0;
			setDate(date, -columnLength);
		}
		const dateTs = date.getTime();
		this.showDayByTs(dateTs, needRender, needAnimate);
	}

	showDayByTs(dateTs: number, needRender?: boolean, needAnimate?: boolean) {
		let offsetX = 0;
		const diff = dateTs - this.module.store.dates[0].ts;
		if (diff > 0) {
			offsetX = diff / this.module.view.tsHasOneX;
		} else {
			this.module.store.fillDataBefore(dateTs);
		}
		this.root.view.handleSetOffsetX(offsetX, needRender, needAnimate);
	}

	getPosXByTs(ts: number): number {
		if (this.root.api.viewMode === 'month')
			return this.getPosXForMonthView(ts);
		return this.getPosXByTsAndTsHasOneX(ts);
	}

	getPosXByTsAndTsHasOneX(ts: number): number {
		const firstTs = this.module.view.firstTsOnScreen;
		const diff = ts - firstTs;
		return diff / this.module.view.tsHasOneX;
	}

	getPosXForMonthView(ts: number): number {
		const end = this.module.view.columns.find(col => col.ts > ts);
		if (end) {
			const indexOfEnd = this.module.view.columns.indexOf(end);
			const start = this.module.view.columns[indexOfEnd - 1];
			if (start) {
				const diff =
					((ts - start.ts) / (end.ts - start.ts)) * (end.x - start.x);
				return start.x + diff;
			}
		}
		return this.getPosXByTsAndTsHasOneX(ts);
	}

	getPosXByFullDayTs(
		ts: number,
		end = false,
		dayType: SetHoursName = 'day'
	): number {
		const date = getDate(ts, end, dayType);
		return this.getPosXByTs(date.getTime());
	}

	getFirstTsOnScreen(): number {
		const colWidth = this.module.view.colWidth;
		const col = this.module.view.columns.find(
			el => el.x <= 0 && el.x + colWidth > 0
		);
		if (!col) return 0;
		const ts = col.ts + -col.x * this.module.view.tsHasOneX;
		return ts;
	}

	getTsByOffsetDiff(x: number): number {
		const columns = this.module.view.columns;
		if (!columns.length) return 0;
		const colHasTs = columns[1].ts - columns[0].ts;
		const colWidth = this.module.view.colWidth;
		const relativeOffset = x / colWidth;
		return colHasTs * relativeOffset;
	}

	getFullAvailableWidth() {
		const maxWidth = this.root.view.canvasWidth;
		const colWidth = this.module.view.colWidth;
		let fullWidth = colWidth * this.module.store.dates.length;
		if (fullWidth < maxWidth) fullWidth = maxWidth;

		return fullWidth;
	}

	getViewHeight() {
		return (
			this.root.view.canvasHeight -
			this.root.grid.view.headerHeight -
			this.root.view.scrollbarY.bottomOffset
		);
	}

	getFullAvailableHeight() {
		let fullHeight =
			this.module.view.rowHeight * this.root.api.tasks.length;
		const viewHeight = this.getViewHeight();
		if (fullHeight < viewHeight) fullHeight = viewHeight;
		return fullHeight;
	}

	getLeftAvailableHeight() {
		return (
			this.root.grid.service.getFullAvailableHeight() -
			this.getViewHeight()
		);
	}

	validateOffsetX() {
		const offsetX = this.root.view.offsetX;
		if (offsetX < this.root.view.canvasWidth) {
			this.module.store.addDatesBefore(offsetX);
		} else if (
			offsetX >
			this.getFullAvailableWidth() - this.root.view.canvasWidth
		) {
			this.module.store.addDatesAfter(offsetX);
		}
	}

	getDayType(): SetHoursName {
		if (this.root.api.viewMode === 'half-day') return 'halfDay';
		if (this.root.api.viewMode === 'quarter-day') return 'quarterDay';
		if (this.root.api.viewMode === 'three-hours') return 'threeHours';
		if (this.root.api.viewMode === 'hour') return 'hour';
		return 'day';
	}
}
