import { RootModule } from '../../root/root.module';

export interface ColumnRender {
	x: number;
	title: string;
}

export class ColumnEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({x, title}: ColumnRender) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, this.root.canvas.height); 
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillStyle = '#000';
  		ctx.fillText(title, x + 2, 20);
	}
}