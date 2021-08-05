import { RootModule } from '../../root/root.module';

export interface ColumnRender {
	x: number;
	title: string;
}

export class ColumnEntity {
	root: RootModule;

	dayHeight = 30;

	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({x, title}: ColumnRender, monthHeight: number, width: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = '#ccc'
		ctx.moveTo(x, monthHeight);
		ctx.lineTo(x, this.root.canvas.height); 
		ctx.stroke();
		ctx.moveTo(x, monthHeight + this.dayHeight);
		ctx.lineTo(x + width, monthHeight + this.dayHeight); 
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillStyle = '#000';
  		ctx.fillText(title, x + 10, monthHeight + (this.dayHeight - 7) );
	}
}