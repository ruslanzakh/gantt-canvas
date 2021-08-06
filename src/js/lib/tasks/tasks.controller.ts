import { RootModule } from '../root/root.module';
import { getDate } from '../utils/date';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;
	destroyMouseDown: Function;
	destroyMouseMove: Function;
	destroyResizeMouseMove: Function;
	moveMode: boolean = false;
	resizeMoveMode: string | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
	}

	attachEvents() {
		this.destroyMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
	}

	destroyEvents() {
		this.destroyMouseDown();
		this.destroyMouseMove();
	}

	handleMouseDown(event: MouseEvent) {
		const { hoverId, resize } = this.module.service.getHoverId(event);
		if(!hoverId) return;
		if(resize) {
			this.resizeMoveMode = resize;
			this.destroyResizeMouseMove = this.root.controller.on('mousemove', this.handleResizeMouseMove.bind(this));
			document.addEventListener('mouseup', this.handleResizeMouseUp);
		}
	}

	handleResizeMouseMove(event: MouseEvent) {
		this.module.service.resizeTask(event);
	}

	handleResizeMouseUp() {
		const tasks = Object.values(this.module.store.modifiedTasks);
		this.root.handleChange(tasks);
		this.module.service.clearScrollInterval();
		this.module.store.saveModTasks();
		this.resizeMoveMode = null;
		this.destroyResizeMouseMove();
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
	}

	handleMouseMove(event: MouseEvent) {
		if(this.resizeMoveMode) return;
		const {hoverId, resize} = this.module.service.getHoverId(event);
		this.module.store.setHoverId(hoverId, resize);
	}

	

}