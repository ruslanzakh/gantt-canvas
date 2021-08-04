import { GridModule } from '../grid/grid.module';
import { RootStore, TaskProp } from './root.store';
import { RootView } from './root.view';
import { RootController } from './root.controller';

export interface RootModuleProps {
	tasks: TaskProp[];
}

export class RootModule {
	root: HTMLElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	store: RootStore;
	view: RootView;
	controller: RootController;
	grid: GridModule;
	elements: any;
	data = [
		{
			type: 'Circle',
			data: {
				x: 111,
				y: 156,
				r: 50,
				hover: false,
			}
		}, {
			type: 'Square',
			data: {
				x: 300,
				y: 100,
				w: 100,
				h: 50
			}
		}
	]

	constructor(el: string, props: RootModuleProps) {
		this.root = document.querySelector(el);
		this.createInitialCanvas();
		this.store = new RootStore(this, props);
		this.controller = new RootController(this);
		this.view = new RootView(this);
		this.grid = new GridModule(this);
		this.init();
	}

	init() {
		this.grid.init();
		this.view.render();
	}

	createInitialCanvas() {
		this.canvas = document.createElement('canvas');
		this.root.append(this.canvas);
		this.ctx = this.canvas.getContext('2d');
	}

}