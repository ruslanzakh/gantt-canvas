import { RootModule } from '../root.module';
import { roundRect } from '../../utils/canvas';

export class ScrollbarYEntity {
	root: RootModule;
	destroyHandleMouseDown: Function;
	destroyMouseMove: Function;

	mouseDownOffset: number | null = null;
	
	bottomOffset = 12;
	width = 12;
	isHover = false;

	constructor(root: RootModule) {
		this.root = root;
		this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
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

	destroyEvents() {
		this.destroyHandleMouseDown();
		this.destroyMouseMove();
	}

	isLineClick(event: MouseEvent) {
		if(!this.needRender()) return false;
		const { offsetX, offsetY } = event;
		const { y, height } = this.getLineYAndHeight();
		if(offsetX < this.left) return false;
		if(offsetY < y + this.top || offsetY > y + this.top + height) return false;
		return true;
	}

	isBackgroundClick(event: MouseEvent) {
		if(!this.needRender()) return false;
		const { offsetX, offsetY } = event;
		return offsetX >= this.left && offsetY > this.top && offsetY < this.root.canvas.height - this.bottomOffset;
	}

	handleMouseDown(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if(isLineClick) this.handleLinkMouseDown(event);
		else if(isBackgroundClick) this.handleBackgroundMouseDown(event);

		if(isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
	}

	handleLinkMouseDown(event: MouseEvent) {
		this.mouseDownOffset = event.screenY;
		document.addEventListener('mousemove', this.handleMoveScrollbar);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	handleMouseUp() {
		this.mouseDownOffset = null;
		document.removeEventListener('mouseup', this.handleMouseUp);
		document.removeEventListener('mousemove', this.handleMoveScrollbar);
	}

	handleBackgroundMouseDown(event: MouseEvent) {
		const scaledOffset = this.getScaledOffset(event.offsetY);
		this.root.view.handleSetOffsetY(scaledOffset, true, true);
	}

	getScaledOffset(offsetY: number) {
		const fullHeight = this.root.grid.service.getLeftAvailableHeight();
		offsetY = offsetY - this.top;

		const scale = fullHeight / this.backgroundLineHeight;
		return scale * offsetY;
	}



	handleMouseMove(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if(isLineClick) this.root.view.setCursor('grab');
		else if(isBackgroundClick) this.root.view.setCursor('pointer');

		if(isLineClick || isBackgroundClick) {
			this.root.controller.stopPropagation(event);
			this.isHover = true;
		}
		else if(this.isHover) {
			this.isHover = false;
			this.root.view.setCursor('auto');
		}

	}

	handleMoveScrollbar(event: MouseEvent) {
		if(this.mouseDownOffset !== null) {
			const diff = event.screenY - this.mouseDownOffset;
			let offset = this.root.view.offsetY + this.getScaledOffset(this.top + diff);
			const fullHeight = this.root.grid.service.getLeftAvailableHeight();
			if(offset > fullHeight) offset = fullHeight;
			this.root.view.handleSetOffsetY(offset);
			this.mouseDownOffset = event.screenY;
		}
	}

	needRender() {
		return this.root.grid.service.getLeftAvailableHeight() > 0;
	}

	renderBackground() {
		if(!this.needRender()) return;
		const ctx = this.root.ctx;
		ctx.fillStyle = '#eee';
		ctx.fillRect(this.left, this.top, this.width, this.backgroundLineHeight);
	}

	renderLine() {		
		if(!this.needRender()) return;
		const ctx = this.root.ctx;
		const { y, height } = this.getLineYAndHeight();
		roundRect(ctx, this.left, y + this.top, this.width, height, this.root.api.scrollbarYLineRadius, this.root.api.scrollbarYLineBackground);
		this.root.ctx.fillStyle = this.root.api.scrollbarYLineBackground;
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