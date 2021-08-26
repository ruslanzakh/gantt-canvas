import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { Task } from '../root/root.api';
import { EventOffsets } from '../utils/interfaces';
export declare class TasksService {
    root: RootModule;
    module: TasksModule;
    intervalChangeOffset: ReturnType<typeof setInterval> | null;
    constructor(root: RootModule, module: TasksModule);
    /** Start getters */
    getRootStoreTaskById(id: string | null): Task | null;
    getModuleStoreTaskById(id: string): Task | null;
    getRenderedViewTaskById(id: string): import("./entities/task.entity").TaskRender | null;
    getViewTaskById(id: string): {
        hover: boolean;
        y: number;
        x: number;
        w: number;
        error: boolean;
        id: string;
        title: string;
        start_date_ts: number;
        all_day?: boolean | undefined;
        end_date_ts: number;
        next_ids: string[];
        background?: string | undefined;
        backgroundHover?: string | undefined;
        color?: string | undefined;
        colorHover?: string | undefined;
        stroke?: string | undefined;
        strokeHover?: string | undefined;
    } | null;
    getStoreDependedTasksById(id: string, tasks?: Task[]): Task[];
    getHoveredTask(): Task | null;
    getTaskPos(task: Task): {
        x: number;
        xx: number;
        error: boolean;
    };
    getFirstTaskByDeadline(): Task;
    getLastTaskByDeadline(): Task;
    getFirstDeadline(): number;
    getLastDeadline(): number;
    getFirstAndLastDeadline(): number[];
    /** End getters */
    /** Start commons */
    getHoverId(event: EventOffsets): {
        hoverId: string | null;
        resize: string | null;
        depFromId: string | null;
    };
    scrollX(event: MouseEvent): void;
    clearScrollInterval(): void;
    getDiff(offsetX: number, all_day?: boolean): number;
    /** End commons */
    handleClickTask(event: MouseEvent): void;
    handleTouchTask(event: EventOffsets): void;
    scrollToTask(id: string): void;
    /** Start Add Dependencies */
    handleAddDepMouseMove(event: MouseEvent): void;
    handleAddDepMouseUp(event: MouseEvent): void;
    updateDepOffsets(event: MouseEvent): void;
    /** End Add Dependencies */
    /** Start Resize Task */
    handleResizeTaskMouseMove(event: MouseEvent): void;
    resizeTaskByResizeMode(offsetX: number): void;
    resizeTaskRightSide(task: Task, diff: number): void;
    resizeTaskLeftSide(task: Task, diff: number): void;
    saveResizeDependedTasksRightSide(task: Task, diff: number): void;
    saveResizeCurrentTaskRight(task: Task, diff: number): void;
    saveResizeDependedTasksLeftSide(task: Task, diff: number): void;
    saveResizeCurrentTaskLeft(task: Task, diff: number): void;
    handleResizeTaskMouseUp(): void;
    /** End Resize Task */
    /** Start Move Task */
    handleMoveTaskMouseMove(event: MouseEvent): void;
    moveTask(offsetX: number): void;
    moveDependedTasks(task: Task, diff: number): void;
    saveMoveTask(task: Task, diff: number): void;
    handleMoveTaskMouseUp(): void;
}
