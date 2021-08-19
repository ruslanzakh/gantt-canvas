import { RootModule } from '../../root/root.module';

export interface RowRender {
	y: number;
	odd: boolean;
}

export class RowEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({y, odd}: RowRender, rowHeight: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.rect(0, y, this.root.canvas.width, rowHeight);
		ctx.fillStyle = odd ? this.root.api.rowOddBackground :this.root.api.rowEvenBackground;
		ctx.fill();
		ctx.beginPath();
		ctx.strokeStyle = this.root.api.rowLineColor;
		ctx.moveTo(0, y + rowHeight);
		ctx.lineTo(this.root.canvas.width, y + rowHeight);
		ctx.stroke();
	}
}