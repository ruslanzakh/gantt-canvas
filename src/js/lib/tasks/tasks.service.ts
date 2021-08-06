import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { getDate } from '../utils/date';
import { TaskProp } from '../root/root.store';

export class TasksService {
	root: RootModule;
	module: TasksModule;

	intervalChangeOffset: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}

	getViewTaskById(id: string) {
		const task = this.module.view.tasks.find(task => task.id === id);
		return task || null;
	}

	getStoreTaskById(id: string) {
		const task = this.module.store.tasks.find(task => task.id === id);
		return task || null;
	}

	getStoreDependedTasksById(id: string, tasks: TaskProp[] = []) {
		const task = this.getStoreTaskById(id);
		tasks.push(task);
		task.next_ids.forEach(id => {
			if(tasks.find(task => task.id === id)) return;
			tasks = this.getStoreDependedTasksById(id, tasks)
		});
		return tasks;
	}

	getHoverId(event: MouseEvent) {
		let hoverId: string | null = null;
		let resize: string | null = null;
		const { tasks, taskEntity, rowHeight } = this.module.view;
		for(let item of tasks) {
			const data = taskEntity.isHover(event, item, rowHeight);
			if(data.resize) {
				resize = data.resize
			}
			if(data.hover) {
				hoverId = item.id;
				break;
			}
		}
		return { hoverId, resize };
	}

	getHoveredTask() {
		return this.getStoreTaskById(this.module.store.hoverId);
	}

	resizeTask(event: MouseEvent) {
		if(this.intervalChangeOffset) return this.module.service.scrollX(event);
		this.resizeTaskByResizeMode(event.offsetX);
		this.module.service.scrollX(event);
		this.root.render();
	}

	resizeTaskByResizeMode(offsetX: number) {
		const resizeMoveMode = this.module.controller.resizeMoveMode;
		const task = this.getHoveredTask();
		if(!task) return;
		const dateTs = getDate(this.root.grid.service.getTsByX(offsetX)).getTime();
		const taskTs = resizeMoveMode === 'right' ?
			task.end_date_ts : task.start_date_ts;
		const tasksDateTs = getDate(taskTs).getTime();
		const diff = dateTs - tasksDateTs;
		if(diff === 0) return;

		if(resizeMoveMode === 'right') {
			this.resizeRighSideTask(task, diff)
		} else if(resizeMoveMode === 'left') {
			this.resizeLeftSideTask(task, diff)
		}
	}

	resizeRighSideTask(task: TaskProp, diff: number) {
		if(this.root.store.moveDependedOnResizeRight)
			this.resizeDependedRightSideTasks(task, diff);
		else
			this.saveResizeRightCurrentTask(task, diff);
	}


	resizeLeftSideTask(task: TaskProp, diff: number) {
		if(this.root.store.moveDependedOnResizeLeft)
			this.resizeDependedLeftSideTasks(task, diff);
		else
			this.saveResizeLeftCurrentTask(task, diff);
	}

	resizeDependedRightSideTasks(task: TaskProp, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeRightCurrentTask(el, diff);
			else this.saveMoveDependedTask(el, diff);
		});
	}

	saveResizeRightCurrentTask(task: TaskProp, diff: number) {
		const newTask = {...task, end_date_ts: task.end_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.start_date_ts = newTask.end_date_ts;
		this.module.store.addModTask(newTask);
	}

	saveMoveDependedTask(task: TaskProp, diff: number) {
		const newTask = {
			...task,
			end_date_ts: task.end_date_ts + diff,
			start_date_ts: task.start_date_ts  + diff,
		};
		this.module.store.addModTask(newTask);
	}


	resizeDependedLeftSideTasks(task: TaskProp, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeLeftCurrentTask(el, diff);
			else this.saveMoveDependedTask(el, diff);
		});
	}

	saveResizeLeftCurrentTask(task: TaskProp, diff: number) {
		const newTask = {...task, start_date_ts: task.start_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.end_date_ts = newTask.start_date_ts;
		this.module.store.addModTask(newTask);
	}

	scrollX(event: MouseEvent) {
		const { offsetX } = event;
		const width = this.root.canvas.width;
		const colWidth = this.root.grid.view.colWidth;
		const pos = offsetX / width;
		let changeOffsetValue = 0;
		if(pos > 0.9) {
			changeOffsetValue = colWidth;
		} else if(pos < 0.1) changeOffsetValue = -colWidth;
		
		if(changeOffsetValue !== 0 && !this.intervalChangeOffset) {
			this.intervalChangeOffset = setInterval(() => {
				this.resizeTaskByResizeMode(offsetX);
				this.root.view.handleChangeOffsetX(changeOffsetValue)
			}, 150)
		} else if(changeOffsetValue === 0 ) {
			this.clearScrollInterval();
		}
	}


	clearScrollInterval() {
		if(this.intervalChangeOffset) {
			clearInterval(this.intervalChangeOffset);
			this.intervalChangeOffset = null;
		}
	}


}