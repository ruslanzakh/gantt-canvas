import { RootModule } from '../../root/root.module';

export interface MonthRender {
	x: number;
	xx: number
	title: string;
}

export class MonthEntity {
	root: RootModule;


	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({x, xx, title}: MonthRender, height: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = '#ccc'
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();

		ctx.moveTo(x, height);
		ctx.lineTo(xx, height);
		ctx.stroke(); 
		const width = xx - x;
		if(width < 100) return;
		const middle = (xx + x) / 2;
		ctx.font = "20px serif";
		ctx.fillStyle = '#000';
  		ctx.fillText(title, middle, 25);
	}
}