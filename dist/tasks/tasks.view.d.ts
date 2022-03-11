import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { TaskEntity, TaskRender } from './entities/task.entity';
export declare class TasksView {
    root: RootModule;
    module: TasksModule;
    taskEntity: TaskEntity;
    tasksForArrows: TaskRender[];
    tasks: TaskRender[];
    constructor(root: RootModule, module: TasksModule);
    fillTasks(): void;
    render(): void;
    renderArrows(): void;
    renderArrowConnection(): void;
    renderTasks(): void;
}
