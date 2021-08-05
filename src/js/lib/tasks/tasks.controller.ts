import { RootModule } from '../root/root.module';
import { getDate } from '../utils/date';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;
	destroyMouseDown: Function;
	destroyMouseMove: Function;
	destroyResizeMouseMove: Function;
	destroyResizeMouseUp: Function;
	moveMode: boolean = false;
	resizeMoveMode: string | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
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
			this.destroyResizeMouseUp = this.root.controller.on('mouseup', this.handleResizeMouseUp.bind(this));
		}
	}

	handleResizeMouseMove(event: MouseEvent) {
		const task = this.module.store.tasks.find(task => task.id === this.module.store.hoverId);
		
		const dateTs = getDate(this.root.grid.service.getTsByX(event.offsetX)).getTime();
		if(this.resizeMoveMode === 'right') {
			const newTask = {...task, end_date_ts: dateTs};
			if(newTask.start_date_ts > dateTs) newTask.start_date_ts = dateTs;
			this.module.store.addModTasks(newTask);
		} else if(this.resizeMoveMode === 'left') {
			const newTask = {...task, start_date_ts: dateTs};
			if(newTask.end_date_ts < dateTs) newTask.end_date_ts = dateTs;
			this.module.store.addModTasks(newTask);
		}
		
	}

	handleResizeMouseUp() {
		const tasks = Object.values(this.module.store.modifiedTasks);
		this.root.handleChange(tasks);
		
		this.module.store.saveModTasks();
		this.resizeMoveMode = null;
		this.destroyResizeMouseMove();
		this.destroyResizeMouseUp();
	}

	handleMouseMove(event: MouseEvent) {
		if(this.resizeMoveMode) return;
		const {hoverId, resize} = this.module.service.getHoverId(event);
		this.module.store.setHoverId(hoverId, resize);
	}

	

}