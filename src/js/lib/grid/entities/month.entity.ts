import { RootModule } from '../../root/root.module';

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
		ctx.strokeStyle = '#ccc'
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();

		ctx.moveTo(x, height);
		ctx.lineTo(xx, height);
		ctx.stroke(); 
		if(this.root.api.showMonthMiddle) {
			const width = xx - x;
			if(width < 200) return;
			middle = (xx + x) / 2;
		}
		if(middle) {
			ctx.font = "20px serif";
			ctx.fillStyle = '#000';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(title, middle, height / 2);
			ctx.textAlign = 'left';
			ctx.textBaseline = 'alphabetic'
		}
	}
}