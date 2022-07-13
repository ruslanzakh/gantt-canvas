import { RootModule } from './root.module';
import { ScrollbarXEntity } from './entities/scrollbar-x.entity';
import { ScrollbarYEntity } from './entities/scrollbar-y.entity';
import { animate, timing } from '../utils/animate';
import { getPixelRatio, scaleCanvas } from '../utils/canvas';

export class RootView {
	root: RootModule;
	scrollbarX: ScrollbarXEntity;
	scrollbarY: ScrollbarYEntity;

	offsetX = 0;
	offsetY = 0;
	pixelRatio = 1;
	canvasWidth = 1;
	canvasHeight = 1;

	constructor(root: RootModule) {
		this.root = root;
		this.updateCanvasSizeAndRender =
			this.updateCanvasSizeAndRender.bind(this);
		this.updateCanvasSize();
		this.attachEvents();
		this.scrollbarX = new ScrollbarXEntity(root);
		this.scrollbarY = new ScrollbarYEntity(root);
		this.pixelRatio = getPixelRatio(root.ctx);
		this.canvasWidth = this.root.canvas.width / this.pixelRatio;
		this.canvasHeight = this.root.canvas.height / this.pixelRatio;
	}

	render() {
		this.pixelRatio = getPixelRatio(this.root.ctx);
		this.canvasWidth = this.root.canvas.width / this.pixelRatio;
		this.canvasHeight = this.root.canvas.height / this.pixelRatio;
		this.root.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.root.ctx.fillStyle = this.root.api.background;
		this.root.ctx.rect(
			0,
			0,
			this.root.view.canvasWidth,
			this.root.view.canvasHeight
		);
		this.root.ctx.fill();

		this.root.grid.view.renderGrid();
		this.root.tasks.view.render();
		this.scrollbarX.render();
		this.scrollbarY.render();
		this.root.grid.view.renderHeader();
	}

	attachEvents() {
		window.addEventListener('resize', this.updateCanvasSizeAndRender);
	}

	destroyEvents() {
		window.removeEventListener('resize', this.updateCanvasSizeAndRender);
	}

	updateCanvasSizeAndRender() {
		this.updateCanvasSize();
		this.root.render();
	}

	updateCanvasSize() {
		scaleCanvas(
			this.root.canvas,
			this.root.ctx,
			this.root.root.offsetWidth,
			this.root.root.offsetHeight
		);
	}

	handleChangeOffsetX(difference = 10, needRender = true) {
		this.offsetX += difference;
		if (this.offsetX < 0) this.offsetX = 0;
		this.root.grid.service.validateOffsetX();
		if (needRender) this.render();
	}

	handleSetOffsetX(
		offsetX = 0,
		needRender = true,
		needAnimate = false,
		duration?: number
	) {
		if (needAnimate) {
			const initialOffset = this.offsetX;
			const diff = offsetX - initialOffset;
			const positiveDiff = diff > 0 ? diff : diff * -1;
			if (!duration)
				duration =
					(positiveDiff /
						this.root.grid.service.getFullAvailableWidth()) *
					1500;
			if (diff === 0) return;
			animate({
				duration,
				timing,
				draw: progress => {
					this.offsetX = initialOffset + diff * progress;
					if (this.offsetX < 0) this.offsetX = 0;
					if (progress === 1 || diff > 0)
						this.root.grid.service.validateOffsetX();
					this.render();
				},
			});
		} else {
			this.offsetX = offsetX;
			if (this.offsetX < 0) this.offsetX = 0;
			this.root.grid.service.validateOffsetX();
			if (needRender) this.render();
		}
	}

	handleSetOffsetY(
		offsetY = 0,
		needRender = true,
		needAnimate = false,
		duration?: number
	) {
		if (needAnimate) {
			const initialOffset = this.offsetY;
			const diff = offsetY - initialOffset;
			const positiveDiff = diff > 0 ? diff : diff * -1;
			if (!duration)
				duration =
					(positiveDiff /
						this.root.grid.service.getFullAvailableHeight()) *
					1500;
			if (diff === 0) return;
			animate({
				duration,
				timing,
				draw: progress => {
					this.offsetY = initialOffset + diff * progress;
					if (this.offsetY < 0) this.offsetY = 0;
					this.render();
				},
			});
		} else {
			this.offsetY = offsetY;
			if (this.offsetY < 0) this.offsetY = 0;
			if (needRender) this.render();
		}
	}

	setCursor(cursor: string) {
		if (cursor === 'auto' && this.root.api.isLoading) cursor = 'progress';
		this.root.root.style.cursor = cursor;
	}
}
