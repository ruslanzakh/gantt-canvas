import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { TaskEntity, TaskRender } from './entities/task.entity';
import { ObjectList } from '../utils/interfaces';

export class TasksView {
	root: RootModule;
	module: TasksModule;
	taskEntity: TaskEntity;

	tasksForArrows: TaskRender[] = [];
	tasks: TaskRender[] = [];

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.taskEntity = new TaskEntity(root);
	}

	fillTasks() {
		const { rowHeight, rowsOffsetY } = this.root.grid.view;
		const { hoverId, hoverConnectionTask, tasks } = this.module.store;
		const offsetY = rowsOffsetY - this.root.view.offsetY;
		const data: ObjectList<TaskRender> = {};
		tasks.forEach((task, index) => {
			const { x, xx, error } = this.module.service.getTaskPos(task);
			const w = xx - x;
			const y = (rowHeight * index) + offsetY;
			data[task.id] = {
				...task,
				hover: hoverId === task.id,
				hoverConnection: hoverConnectionTask === task.id,
				y, x, w,
				error
			}
		});

		this.tasksForArrows = Object.values(data).filter(task => {
			if((task.y + rowHeight) >= rowsOffsetY 
				&& task.y <= this.root.view.canvasHeight
				&& (task.x + task.w) >= 0
				&& task.x <= this.root.view.canvasWidth) return true;
			return task.next_ids.some(id => {
				const target = data[id];
				if(!target) return false;
				if(task.y < rowsOffsetY && target.y < rowsOffsetY) return false;
				if(task.y > this.root.view.canvasHeight && target.y  > this.root.view.canvasHeight) return false;
				if(task.x + task.w < 0 && target.x + target.w < 0) return false;
				if(task.x > this.root.view.canvasWidth && target.x > this.root.view.canvasWidth) return false;
				return true;
			})
		});
		this.tasks = this.tasksForArrows.filter(task => (task.y + rowHeight) >= rowsOffsetY 
			&& task.y <= this.root.view.canvasHeight);
	}

	render() {
		this.module.store.fillTasks();
		this.fillTasks();
		this.renderArrows();
		this.renderArrowFrom();
		this.renderTasks();
	}

	renderArrows() {
		this.tasksForArrows.forEach((el) => {
			el.next_ids.forEach(id => this.taskEntity.renderArrow(id, el));
		});
	}

	renderArrowFrom() {
		if(this.module.store.hoverId && this.module.controller.addDepMode) {
			this.taskEntity.renderArrowFrom(
				this.module.store.hoverId,
				this.module.store.addDepOffsetX || 0,
				this.module.store.addDepOffsetY || 0);
		}
	}

	renderTasks() {
		this.tasks.forEach(x => this.taskEntity.renderItem(x));
	}


}