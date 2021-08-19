import { RootModule } from '../../root/root.module';
import { capitalize } from '../../utils/string';

export interface MonthRender {
	x: number;
	xx: number
	middle?: number
	title: string;
}

export class MonthEntity {
	root: RootModule;


	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({x, xx, title, middle}: MonthRender, height: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = this.root.api.monthLineColor;
		if(this.root.api.renderMonthLeftLine) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
		}

		if(this.root.api.renderMonthBottomLine) {
			ctx.moveTo(x, height);
			ctx.lineTo(xx, height);
		}
		ctx.stroke(); 
		if(this.root.api.showMonthMiddle) {
			const width = xx - x;
			if(width < 200) return;
			middle = (xx + x) / 2;
		}
		if(middle) {
			ctx.font = this.root.api.monthTitleFont;
			ctx.fillStyle = this.root.api.monthTitleColor;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(capitalize(title), middle, height / 2);
			ctx.textAlign = 'left';
			ctx.textBaseline = 'alphabetic'
		}
	}
}