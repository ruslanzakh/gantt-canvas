import { RootModule } from '../../root/root.module';

export interface ColumnRender {
	x: number;
	title: string;
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

	renderItem({x, title}: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.strokeStyle = '#ccc'
		ctx.moveTo(x, monthHeight);
		ctx.lineTo(x, this.root.canvas.height); 
		ctx.stroke();
		ctx.moveTo(x, monthHeight + dayHeight);
		ctx.lineTo(x + width, monthHeight + dayHeight); 
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillStyle = '#000';
  		ctx.fillText(title, x + 10, monthHeight + (dayHeight - 7));
	}
}