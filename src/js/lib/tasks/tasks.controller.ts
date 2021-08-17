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
	destroyAddDepMove: Function;
	moveMode: boolean = false;
	addDepMode: boolean = false;
	resizeMoveMode: string | null = null;
	mouseDownOffsetX: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
		this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
		this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
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
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		if(!hoverId) return;
		this.mouseDownOffsetX = event.offsetX;
		if(depFromId) {
			this.addDepMode = true;
			this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMove.bind(this));
			document.addEventListener('mouseup', this.handleAddDepMouseUp);
		}
		else if(resize) {
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

	handleAddDepMove(event: MouseEvent) {
		this.module.service.handleAddDepMove(event);
	}

	handleAddDepMouseUp(event: MouseEvent) {
		const {hoverId} = this.module.service.getHoverId(event);
		if(hoverId && hoverId !== this.module.store.hoverId) {
			const hoveredTask = this.module.service.getRootStoreTaskById(hoverId);
			const currentTask = this.module.service.getRootStoreTaskById(this.module.store.hoverId);
			if(hoveredTask && currentTask) {
				if(!currentTask.next_ids.includes(hoverId)) {
					const task = {...currentTask, next_ids: [...currentTask.next_ids, hoverId]}
					this.module.store.addModTask(task);
					this.module.store.saveModTasks();
					this.root.handleChange([task]);

				}
			}
		}
		this.module.service.clearScrollInterval();
		this.destroyAddDepMove();
		this.mouseDownOffsetX = null;
		this.addDepMode = false;
		this.module.store.addDepOffsetX = null;
		this.module.store.addDepOffsetY = null;
		document.removeEventListener('mouseup', this.handleAddDepMouseUp);
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