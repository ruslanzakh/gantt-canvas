import { RootModule, RootApiProps } from './root/root.module';
import { Task } from './root/root.api';
declare class Gantt {
    root: RootModule;
    updateTasks: (tasks: Task[]) => void;
    scrollToday: () => void;
    constructor(el: string, props: RootApiProps);
}
export default Gantt;
export { RootApiProps } from './root/root.module';
export { Task } from './root/root.api';
