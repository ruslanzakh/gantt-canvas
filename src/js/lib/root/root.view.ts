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

	constructor(root: RootModule) {
		this.root = root;
		this.updateCanvasSize();
		this.attachEvents();
		this.scrollbar = new ScrollbarEntity(root, {x: 10, y: 10});
	}

	destroy() {
		window.removeEventListener('resize', this.updateCanvasSize);
	}

	updateCanvasSize() {
		this.root.canvas.width = this.root.root.offsetWidth;
		this.root.canvas.height = this.root.root.offsetHeight;
	}

	render() {
		const { width, height } = this.root.canvas;
		this.root.ctx.clearRect(0, 0, width, height);
		this.root.ctx.fillStyle = '#ffffff';
		this.root.ctx.rect(0, 0, width, height);
		this.root.ctx.fill();
		this.root.data.forEach((el) => {
			let item = undefined;
			if(el.type === 'Circle') {
				// @ts-ignore
				item = new Circle(this.root, el.data);
			} else if(el.type === 'Square') {
				// @ts-ignore
				item = new Square(this.root, el.data);
			}
			item.render();
		});

		this.root.grid.view.render();
		this.scrollbar.render();
		// requestAnimationFrame(() => this.render());
	}

	attachEvents() {
		window.addEventListener('resize', this.updateCanvasSize.bind(this));
	}

	destroyEvents() {
		window.removeEventListener('resize', this.updateCanvasSize);
	}

	handleChangeOffsetX(difference = 10, needRender = true) {
		this.offsetX += difference;
		if(this.offsetX < 0) this.offsetX = 0;
		if(needRender) {
			this.render();
			if(difference < 0)
				this.root.grid.service.addDatesBefore(this.offsetX)
			else
				this.root.grid.service.addDatesAfter(this.offsetX)
		}
	}

	handleSetOffsetX(offsetX = 0, needRender = true) {
		this.offsetX = offsetX;
		if(needRender) this.render();
	}

	setCursor(cursor: string) {
		this.root.root.style.cursor = cursor;
	}

}