import { RootModule } from '../root/root.module';

class Square {
	root: RootModule;
	x: number;
	y: number;
	w: number;
	h: number;
	fillColor: string;

	constructor(root: RootModule, data: {x: number, y: number, w: number, h: number, hover: boolean}) {
		this.root = root;
		this.x = data.x;
		this.y = data.y;
		this.w = data.w;
		this.h = data.h;
		this.fillColor = data.hover ? 'green' : 'red';
	}

	render() {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = this.fillColor;
		ctx.stroke();
		ctx.fill();
	}
}

export default Square;