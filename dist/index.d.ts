import { RootModule, RootApiProps } from './root/root.module';
import { Task, ViewMode } from './root/root.api';
declare class Gantt {
    root: RootModule;
    constructor(el: string, props: RootApiProps);
    updateTasks(tasks: Task[]): void;
    scrollToToday(): void;
    scrollToTask(id: string): void;
    updateViewMode(mode: ViewMode): void;
}
export default Gantt;
export { RootApiProps } from './root/root.module';
export { Task } from './root/root.api';
