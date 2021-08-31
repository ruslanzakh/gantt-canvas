import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { Task } from '../root/root.api';
import { ObjectList } from '../utils/interfaces';

export class TasksStore {
	root: RootModule;

	modifiedTasks: ObjectList<Task> = {};
	tasks: Task[] = [];
	tasksList: ObjectList<Task> = {};

	hoverId: null | string = null;
	hoverResize: null | string = null;
	hoverConnectionTask: null | string = null;

	addDepOffsetX: number | null = null;
	addDepOffsetY: number | null = null;

	constructor(root: RootModule) {
		this.root = root;
	}

	fillTasks() {
		this.tasks = this.root.api.tasks.map(task => {
			if(this.modifiedTasks[task.id]) return this.modifiedTasks[task.id];
			return task;
		})
		this.tasksList = {};
		this.tasks.forEach(task => {
			this.tasksList[task.id] = task;
		});
	}

	clearModTasks() {
		this.modifiedTasks = {};
	}

	saveModTasks() {
		this.root.api.updateTasks(this.tasks);
		this.clearModTasks();
	}

	addModTask(task: Task) {
		this.modifiedTasks[task.id] = task;
		this.fillTasks();
	}

	setHoverId(id: null | string, resize: null | string) {
		if(id === this.hoverId && resize === this.hoverResize) return;
		if(!this.root.api.isLoading) {
			if(id) this.root.view.setCursor(resize ? 'col-resize' : 'pointer');
			else this.root.view.setCursor('auto');
		}

		this.hoverResize = resize;
		if(id !== this.hoverId) {
			this.hoverId = id;
			this.root.render();
		}
	}

	setHoverConnectionTask(id: null | string) {
		this.hoverConnectionTask = id;
	}

	updateDepOffsets(offsetX: number | null, offsetY: number | null) {
		this.addDepOffsetX = offsetX;
		this.addDepOffsetY = offsetY;
	}

}