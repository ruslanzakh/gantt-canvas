import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootApi, RootApiProps } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';


export class RootModule {
	root: HTMLElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	api: RootApi;
	view: RootView;
	controller: RootController;
	grid: GridModule;
	tasks: TasksModule;

	constructor(el: string, props: RootApiProps) {
		this.root = document.querySelector(el);
		this.createInitialCanvas();
		this.api = new RootApi(this, props);
		this.controller = new RootController(this);
		this.view = new RootView(this);
		this.grid = new GridModule(this);
		this.tasks = new TasksModule(this);
		this.init();
	}

	init() {
		this.grid.init();
		this.tasks.init();
		this.render();
	}

	render() {
		this.view.render();
	}

	createInitialCanvas() {
		this.canvas = document.createElement('canvas');
		this.root.append(this.canvas);
		this.ctx = this.canvas.getContext('2d');
	}

}