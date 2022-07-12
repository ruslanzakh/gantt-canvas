import { RootModule } from '../root.module';
import { roundRect, getEventTouchOffsets } from '../../utils/canvas';
import { EventOffsets } from '../../utils/interfaces';

export class ScrollbarXEntity {
	root: RootModule;
	destroyHandleMouseDown: () => void;
	destroyHandleTouchEnd: () => void;
	destroyMouseMove: () => void;

	mouseDownOffset: number | null = null;

	isHover = false;
	minLineWidth = 20;

	constructor(root: RootModule) {
		this.root = root;
		this.destroyHandleMouseDown = this.root.controller.on(
			'mousedown',
			this.handleMouseDown.bind(this)
		);
		this.destroyHandleTouchEnd = this.root.controller.on(
			'touchend',
			this.handleTouchEnd.bind(this)
		);
		this.destroyMouseMove = this.root.controller.on(
			'mousemove',
			this.handleMouseMove.bind(this)
		);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
	}

	get height() {
		return this.root.api.scrollbarXHeight;
	}

	get top() {
		return this.root.view.canvasHeight - this.height;
	}

	get backgroundLineWidth() {
		return this.root.view.canvasWidth;
	}

	destroyEvents() {
		this.destroyHandleMouseDown();
		this.destroyMouseMove();
		this.destroyHandleTouchEnd();
	}

	isLineClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		const { x, width } = this.getLineXAndWidth();
		if (offsetX < x || offsetX > x + width) return false;
		if (offsetY < this.top) return false;
		return true;
	}

	isBackgroundClick(event: EventOffsets) {
		const { offsetY, offsetX } = event;
		return offsetY >= this.top && offsetX < this.backgroundLineWidth;
	}

	handleMouseDown(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if (isLineClick) this.handleLinkMouseDown(event);
		else if (isBackgroundClick) this.handleBackgroundMouseDown(event);

		if (isLineClick || isBackgroundClick)
			this.root.controller.stopPropagation(event);
	}

	handleTouchEnd(event: TouchEvent) {
		const eventOffsets = getEventTouchOffsets(
			event,
			this.root.canvas,
			this.root.ctx
		);
		const isBackgroundClick = this.isBackgroundClick(eventOffsets);
		if (!isBackgroundClick) return;
		this.handleBackgroundMouseDown(eventOffsets);
		this.root.controller.stopPropagation(event);
	}

	handleLinkMouseDown(event: MouseEvent) {
		this.mouseDownOffset = event.screenX;
		document.addEventListener('mousemove', this.handleMoveScrollbar);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	handleBackgroundMouseDown(event: EventOffsets) {
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
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if (isLineClick) this.root.view.setCursor('grab');
		else if (isBackgroundClick) this.root.view.setCursor('pointer');

		if (isLineClick || isBackgroundClick) {
			this.root.controller.stopPropagation(event);
			this.isHover = true;
		} else if (this.isHover) {
			this.isHover = false;
			this.root.view.setCursor('auto');
		}
	}

	handleMoveScrollbar(event: MouseEvent) {
		if (this.mouseDownOffset !== null) {
			const diff = event.screenX - this.mouseDownOffset;
			const offset = this.root.view.offsetX + this.getScaledOffset(diff);

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
		roundRect(
			ctx,
			x,
			this.top,
			width,
			this.height,
			this.root.api.scrollbarXLineRadius,
			this.root.api.scrollbarXLineBackground
		);
	}

	getLineXAndWidth() {
		const fullWidth = this.root.grid.service.getFullAvailableWidth();
		let x = (this.root.view.offsetX / fullWidth) * this.backgroundLineWidth;
		let width =
			(this.backgroundLineWidth / fullWidth) * this.backgroundLineWidth;
		if (width < this.minLineWidth) {
			width = this.minLineWidth;
			if (x + width > this.root.view.canvasWidth - this.minLineWidth) {
				x = this.root.view.canvasWidth - width - this.minLineWidth;
			}
		}
		return { x, width };
	}

	render() {
		this.renderBackground();
		this.renderLine();
	}
}
