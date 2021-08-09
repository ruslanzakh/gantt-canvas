import { RootModule } from '../root/root.module';
import { getDate } from '../utils/date';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;
	destroyMouseDown: Function;
	destroyMouseMove: Function;
	destroyResizeMouseMove: Function;
	destroyTaskMove: Function;
	moveMode: boolean = false;
	resizeMoveMode: string | null = null;
	mouseDownOffsetX: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
		this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
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
		this.mouseDownOffsetX = event.offsetX;
		if(resize) {
			this.resizeMoveMode = resize;
			this.destroyResizeMouseMove = this.root.controller.on('mousemove', this.handleResizeMouseMove.bind(this));
			document.addEventListener('mouseup', this.handleResizeMouseUp);
		} else {
			this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
			document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
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
		this.mouseDownOffsetX = null;
		this.destroyResizeMouseMove();
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
	}

	handleTaskMove(event: MouseEvent) {
		this.module.service.handleMoveTask(event);
	}

	handleTaskMoveMouseUp() {
		const tasks = Object.values(this.module.store.modifiedTasks);
		this.root.handleChange(tasks);
		this.module.service.clearScrollInterval();
		this.module.store.saveModTasks();
		this.destroyTaskMove();
		this.mouseDownOffsetX = null;
		document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
	}


	handleMouseMove(event: MouseEvent) {
		if(this.resizeMoveMode || this.mouseDownOffsetX) return;
		const {hoverId, resize} = this.module.service.getHoverId(event);
		this.module.store.setHoverId(hoverId, resize);
	}

}