import { RootModule } from '../root/root.module';
import { Task } from '../root/root.api';
import { ObjectList } from '../utils/interfaces';

export class TasksStore {
	root: RootModule;

	modifiedTasks: ObjectList<Task> = {};
	tasks: Task[] = [];
	tasksList: ObjectList<Task> = {};

	hoverId: null | string = null;
	hoverResize: null | string = null;
	hoverDrag: null | string = null;
	hoverConnectionTask: null | string = null;

	addDepOffsetX: number | null = null;
	addDepOffsetY: number | null = null;

	constructor(root: RootModule) {
		this.root = root;
	}

	fillTasks() {
		this.tasks = this.root.api.tasks.map(task => {
			if (this.modifiedTasks[task.id]) return this.modifiedTasks[task.id];
			return task;
		});
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

	setHoverId(
		id: null | string,
		resize: null | string,
		hoverDrag: null | string
	) {
		if (
			id === this.hoverId &&
			resize === this.hoverResize &&
			hoverDrag === this.hoverDrag
		)
			return;
		if (!this.root.api.isLoading) {
			if (id)
				this.root.view.setCursor(
					resize ? 'col-resize' : hoverDrag ? 'grab' : 'pointer'
				);
			else this.root.view.setCursor('auto');
		}

		this.hoverResize = resize;
		this.hoverDrag = hoverDrag;
		if (id !== this.hoverId) {
			this.hoverId = id;
			this.root.render();
		}
	}

	setHoverConnectionTask(id: null | string) {
		this.hoverConnectionTask = id;
	}

	updateDepOffsets(
		offsetX = this.addDepOffsetX,
		offsetY = this.addDepOffsetY
	) {
		this.addDepOffsetX = offsetX;
		this.addDepOffsetY = offsetY;
	}
}
