import { RootModule } from '../root.module';
import { roundRect } from '../../utils/canvas';


export class ScrollbarXEntity {
	root: RootModule;
	destroyHandleMouseDown: Function;
	destroyMouseMove: Function;
	
	mouseDownOffset: number | null = null;

	isHover = false;

	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
	}

	get height() {
		return this.root.api.scrollbarXHeight;
	}

	get top() {
		return this.root.canvas.height - this.height;
	}

	get backgroundLineWidth() {
		return this.root.canvas.width;
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
		ctx.fillStyle = this.root.api.scrollbarXBackground;
		ctx.fillRect(0, this.top, this.backgroundLineWidth, this.height);
	}

	renderLine() {
		const ctx = this.root.ctx;
		const { x, width } = this.getLineXAndWidth();
		ctx.fillStyle = this.root.api.scrollbarXLineBackground;
		roundRect(ctx, x, this.top, width, this.height, this.root.api.scrollbarXLineRadius, this.root.api.scrollbarXLineBackground);
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