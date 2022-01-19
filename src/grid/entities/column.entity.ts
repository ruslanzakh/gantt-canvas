import { RootModule } from '../../root/root.module';

export interface ColumnRender {
	x: number;
	title: string;
	month: number;
	hour: number;
	isStartMonth: boolean;
	today: boolean;
	weekend: boolean;
	weekday: number;
	weekdayTitle: string;
}

export interface ColumnRenderCommon {
	monthHeight: number;
	dayHeight: number;
	width: number;
}

export class ColumnEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}


	renderDay({x, title, isStartMonth, weekend, month, hour, weekdayTitle}: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = this.root.api.dayBottomLineColor;
		ctx.moveTo(x, monthHeight + dayHeight);
		ctx.lineTo(x + width, monthHeight + dayHeight);
		ctx.stroke();
		if(isStartMonth && this.root.api.renderDayStartMonthLine) {
			ctx.beginPath();
			ctx.strokeStyle = this.root.api.dayStartMonthLine;
			ctx.moveTo(x, monthHeight);
			ctx.lineTo(x, monthHeight + dayHeight);
			ctx.stroke();
		}
		ctx.font = this.root.api.dayFont;
		if(weekend && this.root.api.dayWeekendColor) ctx.fillStyle = this.root.api.dayWeekendColor;
		else ctx.fillStyle = this.root.api.dayColor;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		if(this.root.api.viewMode === 'month') title = this.root.grid.view.getMonthTitle(month);
		else if(['half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1) title = hour.toString();
		if(weekdayTitle) {
			ctx.fillText(title, x + (width / 2), monthHeight + (dayHeight / 3));
			ctx.font = this.root.api.weekdayFont;
			if(weekend && this.root.api.weekdayWeekendColor) ctx.fillStyle = this.root.api.weekdayWeekendColor;
			else ctx.fillStyle = this.root.api.weekdayColor;
			ctx.fillText(weekdayTitle, x + (width / 2), monthHeight + (dayHeight  / 1.35));
		} else {
			ctx.fillText(title, x + (width / 2), monthHeight + (dayHeight  / 2));
		}
		ctx.textAlign = 'left';
		ctx.textBaseline = 'alphabetic';
	}

	renderCol({x, today, weekend, isStartMonth}: ColumnRender, { monthHeight }: ColumnRenderCommon) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = this.root.api.colLineColor;
		if(isStartMonth && this.root.api.colStartMonthLineColor) {
			ctx.strokeStyle = this.root.api.colStartMonthLineColor;
		} 
		ctx.moveTo(x, monthHeight);
		ctx.lineTo(x, this.root.view.canvasHeight); 
		ctx.stroke();
		if(today) {
			ctx.fillStyle = this.root.api.dayTodayBackground;
			ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, this.root.view.canvasHeight);
			ctx.fill();
		} else if(weekend && this.root.api.dayWeekendBackground) {
			ctx.fillStyle = this.root.api.dayWeekendBackground;
			ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, this.root.view.canvasHeight);
			ctx.fill();
		}
	}
}