import { RootModule } from '../root.module';


export class ScrollbarXEntity {
	root: RootModule;
	destroyHandleMouseDown: Function;
	destroyMouseMove: Function;
	
	mouseDownOffset: number | null = null;

	height = 12;
	right = 12;
	isHover = false;

	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
	}

	get top() {
		return this.root.canvas.height - this.height;
	}
	get backgroundLineWidth() {
		return this.root.canvas.width - this.right;
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
		const { x, width } = this.getLineXAndWidth();
		if(offsetX < x || offsetX > x + width) return false;
		if(offsetY < this.top) return false;
		return true;
	}

	isBackgroundClick(event: MouseEvent) {
		const { offsetY, offsetX } = event;
		return offsetY >= this.top && offsetX < this.backgroundLineWidth;
	}

	handleMouseDown(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if(isLineClick) this.handleLinkMouseDown(event);
		else if(isBackgroundClick) this.handleBackgroundMouseDown(event);

		if(isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
	}

	handleLinkMouseDown(event: MouseEvent) {
		this.mouseDownOffset = event.screenX;
		document.addEventListener('mousemove', this.handleMoveScrollbar);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	handleBackgroundMouseDown(event: MouseEvent) {
		const scaledOffset = this.getScaledOffset(event.offsetX);
		this.root.view.handleSetOffsetX(scaledOffset, true, true);
	}

	getScaledOffset(offsetX: number) {
		const fullWidth = this.root.grid.service.getFullAvailableWidth();
		const scale = fullWidth / this.backgroundLineWidth;
		return scale * offsetX;
	}

	handleMouseUp() {
		this.mouseDownOffset = null;
		document.removeEventListener('mouseup', this.handleMouseUp);
		document.removeEventListener('mousemove', this.handleMoveScrollbar);
	}

	handleMouseMove(event: MouseEvent) {

	}

	handleMoveScrollbar(event: MouseEvent) {
		if(this.mouseDownOffset !== null) {
			const diff = event.screenX - this.mouseDownOffset;
			let offset = this.root.view.offsetX + this.getScaledOffset(diff);
			this.root.view.handleSetOffsetX(offset);
			this.mouseDownOffset = event.screenX;
		}
	}

	renderBackground() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = '#eee';
		ctx.fillRect(0, this.top, this.backgroundLineWidth, canvas.height);
	}

	renderLine() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = 'red';
		const { x, width } = this.getLineXAndWidth();
		ctx.fillRect(x, this.top, width, canvas.height);
	}

	getLineXAndWidth() {
		const fullWidth= this.root.grid.service.getFullAvailableWidth();
		const x = (this.root.view.offsetX / fullWidth) * this.backgroundLineWidth;
		const width = (this.backgroundLineWidth / fullWidth) * this.backgroundLineWidth;
		
		return { x, width };
	}

	render() {
		this.renderBackground();
		this.renderLine()
	}
}