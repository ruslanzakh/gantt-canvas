import { RootModule } from './root.module';
import Circle from '../models/Circle';
import Square from '../models/Square';
import { ScrollbarEntity } from './entities/scrollbar.entity';


export class RootView {
	root: RootModule;
	scrollbar: ScrollbarEntity;

	offsetX = 10;
	offsetY = 0;
	scaleX = 1;
	scaleY = 1;

	constructor(root: RootModule) {
		this.root = root;
		this.updateCanvasSizeAndRender = this.updateCanvasSizeAndRender.bind(this);
		this.updateCanvasSize();
		this.attachEvents();
		this.scrollbar = new ScrollbarEntity(root, {x: 10, y: 10});
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


		this.root.grid.view.render();
		this.root.tasks.view.render();
		this.scrollbar.render();
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
		if(difference < 0)
			this.root.grid.service.addDatesBefore(this.offsetX)
		else
			this.root.grid.service.addDatesAfter(this.offsetX)
		if(needRender) this.render();
	}

	handleSetOffsetX(offsetX = 0, needRender = true) {
		this.offsetX = offsetX;
		if(needRender) this.render();
	}

	setCursor(cursor: string) {
		this.root.root.style.cursor = cursor;
	}

}