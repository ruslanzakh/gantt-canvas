import { RootModule } from '../../root/root.module';

export interface ColumnRender {
	x: number;
	title: string;
	isStartMonth: boolean;
	today: boolean;
	weekend: boolean;
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


	renderDay({x, title, isStartMonth, weekend}: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon) {
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
  		ctx.fillText(title, x + (width / 2), monthHeight + (dayHeight  / 2));
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
		} else if(weekend && this.root.api.dayWeekendBackground && this.root.api.viewMode === 'day') {
			ctx.fillStyle = this.root.api.dayWeekendBackground;
			ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, this.root.view.canvasHeight);
			ctx.fill();
		}
	}
}