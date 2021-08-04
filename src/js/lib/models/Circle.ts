import { RootModule } from '../root/root.module';

class Circle {
	root: RootModule;
	x: number;
	y: number;
	radius: number;
	startAngle: number;
	endAngle: number;
	anticlockwise: boolean;
	fillColor: string;

	constructor(root: RootModule, data: {x: number, y: number, r: number, hover: boolean}) {
		this.root = root;
		this.x = data.x;
		this.y = data.y;
		this.radius = data.r;
		this.startAngle = 0;
		this.endAngle = Math.PI * 2;
		this.anticlockwise = false;
		this.fillColor = data.hover ? 'green' : 'red';
	}

	render() {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, this.startAngle,  this.endAngle, this.anticlockwise);
		ctx.fillStyle = this.fillColor;
		ctx.stroke();
		ctx.fill();
	}
}

export default Circle;