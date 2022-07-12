import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootService } from './root.service';
import { RootApi, RootApiProps } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';
import { scaleCanvas } from '../utils/canvas';
export { RootApiProps } from './root.api';

export class RootModule {
	root: HTMLElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	service: RootService;
	api: RootApi;
	view: RootView;
	controller: RootController;
	grid: GridModule;
	tasks: TasksModule;

	constructor(el: string, props: RootApiProps) {
		const elem: HTMLElement | null = document.querySelector(el);
		if (!elem) throw new Error("Root element doesn't found");
		this.root = elem;
		this.canvas = document.createElement('canvas');
		this.root.append(this.canvas);
		const ctx = this.canvas.getContext('2d');
		if (!ctx) throw new Error("Canvas context doesn't gotten");
		scaleCanvas(
			this.canvas,
			ctx,
			this.root.offsetWidth,
			this.root.offsetHeight
		);
		this.ctx = ctx;

		this.service = new RootService(this);
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
		if (this.api.isLoading) this.view.setCursor('progress');
	}

	destroy() {
		this.controller.destroyEvents();
		this.view.destroyEvents();
		this.tasks.destroy();
		this.service.unmountConvertColorDiv();
	}

	render() {
		this.view.render();
	}
}
