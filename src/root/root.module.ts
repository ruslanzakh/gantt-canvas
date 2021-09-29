import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootApi, RootApiProps } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';
export { RootApiProps } from './root.api';


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
		const elem: HTMLElement | null = document.querySelector(el);
		if(!elem) throw new Error('Root element doesn\'t found');
		this.root = elem;
		this.canvas = document.createElement('canvas');
		this.root.append(this.canvas);
		const ratio = Math.ceil(window.devicePixelRatio);
		console.log(ratio);
		
		const ctx = this.canvas.getContext('2d');
		if(!ctx) throw new Error('Canvas context doesn\'t gotten');
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		this.ctx = ctx;
	
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
		if(this.api.isLoading) this.view.setCursor('progress');
	}

	destroy() {
		this.controller.destroyEvents();
		this.view.destroyEvents();
		this.tasks.destroy();
	}

	render() {
		this.view.render();
	}

}