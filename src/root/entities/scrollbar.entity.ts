import { RootModule } from '../../root/root.module';

export interface ScrollbarProps {
	x: number;
	y: number;
}

export class ScrollbarEntity {

	root: RootModule;
	x: number;
	y: number;
	destroyHandleClick: Function;
	destroyMouseMove: Function;
	width = 20;
	height = 20;
	between = 5;
	isHover = false;

	constructor(root: RootModule, { x, y }: ScrollbarProps) {
		this.root = root;
		this.x = x;
		this.y = y;
		this.attachEvents();
	}

	attachEvents() {
		this.destroyHandleClick = this.root.controller.on('click', this.handleClick.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
	}

	destroyEvents() {
		this.destroyHandleClick();
		this.destroyMouseMove();
	}

	isMinusClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		const x = this.x;
		const y = this.y;
		const xx = x + this.width
		const yy = y + this.height
		return x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
	}

	isPlusClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		const x = this.x + this.width + this.between;
		const y = this.y;
		const xx = x + this.width
		const yy = y + this.height
		return x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
	}

	handleClick(event: MouseEvent) {
		if(this.isMinusClick(event)) this.handleMinusClick();
		else if(this.isPlusClick(event)) this.handlePlusClick();
	}

	handleMouseMove(event: MouseEvent) {
		if(this.isMinusClick(event) || this.isPlusClick(event)) {
			this.root.controller.stopPropagation(event);
			this.root.view.setCursor('pointer');
			this.isHover = true;
		} else if(this.isHover) {
			this.isHover = false;
			this.root.view.setCursor('auto');
		}
	}

	handleMinusClick() {
		this.root.view.handleChangeOffsetX(-40);
	}

	handlePlusClick() {
		this.root.view.handleChangeOffsetX(40);
	}



	renderPlus() {
		const ctx = this.root.ctx;
		ctx.strokeStyle = 'black'
		ctx.beginPath();
		const x = this.x + this.width + this.between;
		ctx.rect(x, this.y,  this.width,  this.height);
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillStyle = "#000";
  		ctx.fillText(">", x + 3, this.y + this.height - 3);
	}

	renderMinus() {
		const ctx = this.root.ctx;

		ctx.beginPath();
		ctx.rect(this.x, this.y,  this.width,  this.height);
		ctx.stroke();
		ctx.font = "20px serif";
  		ctx.fillText("<", this.x + 3, this.y + this.height - 3);
	}

	render() {
		this.renderPlus();
		this.renderMinus();
	}
}