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
			const { x, xx } = this.module.service.getTaskPos(task);
			const w = xx - x;
			const y = (rowHeight * index) + offsetY;
			data[task.id] = {
				...task,
				hover: hoverId === task.id,
				hoverConnection: hoverConnectionTask === task.id,
				y, x, w
			}
		});

		this.tasksForArrows = Object.values(data).filter(task => {
			if(task.y >= rowsOffsetY && task.y <= this.root.canvas.height) return true;
			return task.next_ids.some(id => {
				const target = data[id];
				if(!target) return false;
				if(task.y < rowsOffsetY && target.y < rowsOffsetY) return false;
				if(task.y > this.root.canvas.height && target.y  > this.root.canvas.height) return false;
				if(task.x < 0 && target.x < 0) return false;
				if(task.x + task.w > this.root.canvas.width && target.x + task.w > this.root.canvas.width) return false;
				return true;
			})
		});
		this.tasks = this.tasksForArrows.filter(task => task.y >= rowsOffsetY 
			&& task.y <= this.root.canvas.height);
	}

	render() {
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
				this.module.store.addDepOffsetX,
				this.module.store.addDepOffsetY);
		}
	}

	renderTasks() {
		this.tasks.forEach(x => this.taskEntity.renderItem(x));
	}


}