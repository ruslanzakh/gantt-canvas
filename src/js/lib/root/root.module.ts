import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootApi, Task } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';

export interface RootModuleProps {
	tasks: Task[];
	handleChange(tasks: Task[]);
}

export class RootModule {
	root: HTMLElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	api: RootApi;
	view: RootView;
	controller: RootController;
	grid: GridModule;
	tasks: TasksModule;
	handleChange: RootModuleProps['handleChange'];
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
				y: 300,
				w: 100,
				h: 50
			}
		}
	]

	constructor(el: string, props: RootModuleProps) {
		this.root = document.querySelector(el);
		this.createInitialCanvas();
		this.api = new RootApi(this, props);
		this.controller = new RootController(this);
		this.view = new RootView(this);
		this.grid = new GridModule(this);
		this.tasks = new TasksModule(this);
		this.handleChange = props.handleChange;
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