import { RootModule } from '../root.module';

export class ScrollbarYEntity {
	root: RootModule;
	destroyHandleMouseDown: Function;
	destroyMouseMove: Function;
	
	bottomOffset = 12;
	width = 12;

	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
	}

	get left() {
		return this.root.canvas.width - this.width;
	}

	get top() {
		return this.root.grid.view.headerHeight;
	}

	get backgroundLineHeight() {
		return this.root.canvas.height - this.bottomOffset - this.top
	}

	attachEvents() {
		this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
	}

	destroyEvents() {
		this.destroyHandleMouseDown();
		this.destroyMouseMove();
	}

	isLineClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		const { y, height } = this.getLineYAndHeight();
		if(offsetX < this.left) return false;
		if(offsetY < y + this.top || offsetY > y + this.top + height) return false;
		return true;
	}

	isBackgroundClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		return offsetX >= this.left && offsetY > this.top;
	}

	handleMouseDown(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if(isLineClick) this.handleLinkMouseDown(event);
		else if(isBackgroundClick) this.handleBackgroundMouseDown(event);

		if(isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
	}

	handleLinkMouseDown(event: MouseEvent) {

	}

	handleBackgroundMouseDown(event: MouseEvent) {
		let { offsetY } = event;
		const viewHeight = this.root.canvas.height - this.root.grid.view.headerHeight - this.root.view.scrollbarY.bottomOffset;
		const fullHeight = this.root.grid.service.getFullAvailableHeight() - viewHeight;
		offsetY = offsetY - this.top;

		const scale = fullHeight / this.backgroundLineHeight;
		let scaledOffset = scale * offsetY;
		this.root.view.handleSetOffsetY(scaledOffset);
	}



	handleMouseMove(event: MouseEvent) {

	}

	renderBackground() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = '#eee';
		ctx.fillRect(this.left, this.top, this.width, this.backgroundLineHeight);
	}

	renderLine() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = 'red';
		const { y, height } = this.getLineYAndHeight();
		
		ctx.fillRect(this.left, y + this.top, this.width, height);
	}

	getLineYAndHeight() {
		const fullHeight = this.root.grid.service.getFullAvailableHeight();
		
		const y = (this.root.view.offsetY / fullHeight) * this.backgroundLineHeight;
		const height = (this.backgroundLineHeight / fullHeight) * this.backgroundLineHeight;
		
		return { y, height };
	}

	render() {
		this.renderBackground();
		this.renderLine()
	}
}