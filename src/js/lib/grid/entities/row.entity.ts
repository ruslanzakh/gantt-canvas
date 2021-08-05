import { RootModule } from '../../root/root.module';

export interface RowRender {
	y: number;
	odd: boolean;
}

export class RowEntity {
	root: RootModule;

	evenColor = '#fff';
	oddColor = '#f1efef';

	constructor(root: RootModule) {
		this.root = root;
	}

	renderItem({y, odd}: RowRender, rowHeight: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.rect(0, y, this.root.canvas.width, rowHeight);
		ctx.fillStyle = odd ? this.oddColor : this.evenColor;
		ctx.fill();
	}
}