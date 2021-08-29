import { RootModule } from './root.module';
import { ScrollbarXEntity } from './entities/scrollbar-x.entity';
import { ScrollbarYEntity } from './entities/scrollbar-y.entity';
import { animate, timing } from '../utils/animate';

export class RootView {
	root: RootModule;
	scrollbarX: ScrollbarXEntity;
	scrollbarY: ScrollbarYEntity;

	offsetX = 0;
	offsetY = 0;
	scaleX = 1;
	scaleY = 1;

	constructor(root: RootModule) {
		this.root = root;
		this.updateCanvasSizeAndRender = this.updateCanvasSizeAndRender.bind(this);
		this.updateCanvasSize();
		this.attachEvents();
		this.scrollbarX = new ScrollbarXEntity(root);
		this.scrollbarY = new ScrollbarYEntity(root);
	}

	destroy() {
		this.destroyEvents();
	}

	render() {
		const { width, height } = this.root.canvas;
		this.root.ctx.clearRect(0, 0, width, height);

		this.root.ctx.fillStyle = '#ffffff';
		this.root.ctx.rect(0, 0, width, height);
		this.root.ctx.fill();


		this.root.grid.view.renderGrid();
		this.root.tasks.view.render();
		this.scrollbarX.render();
		this.scrollbarY.render();
		this.root.grid.view.renderHeader();
	}

	attachEvents() {
		window.addEventListener('resize', this.updateCanvasSizeAndRender.bind(this));
	}

	destroyEvents() {
		window.removeEventListener('resize', this.updateCanvasSizeAndRender.bind(this));
	}

	updateCanvasSizeAndRender() {
		this.updateCanvasSize();
		this.root.render();
	}

	updateCanvasSize() {
		this.root.canvas.width = this.root.root.offsetWidth;
		this.root.canvas.height = this.root.root.offsetHeight;
	}

	handleChangeOffsetX(difference = 10, needRender = true) {
		this.offsetX += difference;
		if(this.offsetX < 0) this.offsetX = 0;
		this.root.grid.service.validateOffsetX();
		if(needRender) this.render();
	}

	handleSetOffsetX(offsetX = 0, needRender = true, needAnimate = false) {
		if(needAnimate) {
			const initialOffset = this.offsetX;
			const diff = offsetX - initialOffset;
			const positiveDiff = diff > 0 ? diff : diff * -1;
			const duration = (positiveDiff / this.root.grid.service.getFullAvailableWidth()) * 1500;
			if(diff === 0) return;
			animate({
				duration,
				timing,
				draw: (progress) => {
					this.offsetX = initialOffset + (diff * progress);
					if(this.offsetX < 0) this.offsetX = 0;
					if(progress === 1 || diff > 0) this.root.grid.service.validateOffsetX();
					this.render();
				}
			})

		} else {
			this.offsetX = offsetX;
			if(this.offsetX < 0) this.offsetX = 0;
			this.root.grid.service.validateOffsetX();
			if(needRender) this.render();
		}

	}

	handleSetOffsetY(offsetY = 0, needRender = true, needAnimate = false) {
		if(needAnimate) {
			const initialOffset = this.offsetY;
			const diff = offsetY - initialOffset;
			const positiveDiff = diff > 0 ? diff : diff * -1;
			const duration = (positiveDiff / this.root.grid.service.getFullAvailableHeight()) * 1500;
			if(diff === 0) return;
			animate({
				duration,
				timing,
				draw: (progress) => {
					this.offsetY = initialOffset + (diff * progress);
					if(this.offsetY < 0) this.offsetY = 0;
					this.render();
				}
			})

		} else {
			this.offsetY = offsetY;
			if(this.offsetY < 0) this.offsetY = 0;
			if(needRender) this.render();
		}
	}

	setCursor(cursor: string) {
		this.root.root.style.cursor = cursor;
	}

}