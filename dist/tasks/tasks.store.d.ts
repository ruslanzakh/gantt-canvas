import { RootModule } from '../root/root.module';
import { Task } from '../root/root.api';
import { ObjectList } from '../utils/interfaces';
export declare class TasksStore {
    root: RootModule;
    modifiedTasks: ObjectList<Task>;
    tasks: Task[];
    tasksList: ObjectList<Task>;
    hoverId: null | string;
    hoverResize: null | string;
    hoverConnectionTask: null | string;
    addDepOffsetX: number | null;
    addDepOffsetY: number | null;
    constructor(root: RootModule);
    fillTasks(): void;
    clearModTasks(): void;
    saveModTasks(): void;
    addModTask(task: Task): void;
    setHoverId(id: null | string, resize: null | string): void;
    setHoverConnectionTask(id: null | string): void;
    updateDepOffsets(offsetX: number | null, offsetY: number | null): void;
}
