import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { Task } from '../root/root.api';
import { EventOffsets } from '../utils/interfaces';
import { SetHoursName } from '../utils/date';
export declare class TasksService {
    root: RootModule;
    module: TasksModule;
    intervalChangeOffset: ReturnType<typeof setInterval> | null;
    scrollXOffset: number | null;
    constructor(root: RootModule, module: TasksModule);
    /** Start getters */
    getRootStoreTaskById(id: string | null): Task | null;
    getModuleStoreTaskById(id: string): Task;
    getRenderedViewTaskById(id: string): import("./entities/task.entity").TaskRender | null;
    getViewTaskById(id: string): {
        hover: boolean;
        hoverConnection: boolean;
        y: number;
        x: number;
        w: number;
        error: boolean;
        id: string;
        title: string;
        subtitle?: string | undefined;
        start_date_ts: number;
        all_day?: boolean | undefined;
        end_date_ts: number;
        next_ids: string[];
        background?: string | undefined;
        backgroundHover?: string | undefined;
        color?: string | undefined;
        colorHover?: string | undefined;
        outlineColor?: string | undefined;
        colorSubtitle?: string | undefined;
        /** Start getters */
        outlineSubtitleColor?: string | undefined;
        stroke?: string | undefined;
        strokeHover?: string | undefined;
        underline?: boolean | undefined;
        noEditable?: boolean | undefined;
    } | null;
    getStoreDependedTasksById(id: string, tasks?: Task[]): Task[];
    getHoveredTask(): Task | null;
    getTaskPos(task: Task, dayType?: SetHoursName): {
        x: number;
        xx: number;
        error: boolean;
    };
    getFirstTaskByDeadline(): Task;
    getLastTaskByDeadline(): Task;
    getFirstDeadline(): number;
    getLastDeadline(): number;
    getFirstAndLastDeadline(): number[];
    isNoEditableTask(id: string): boolean | undefined;
    /** End getters */
    /** Start commons */
    getHoverId(event: EventOffsets): {
        hoverId: string | null;
        resize: string | null;
        depFromId: string | null;
    };
    scrollX(event: EventOffsets): void;
    clearScrollInterval(): void;
    getDiff(offsetX: number, all_day?: boolean): number;
    getColTsForDiff(all_day?: boolean): number;
    /** End commons */
    handleClickTask(event: EventOffsets): void;
    scrollToTask(id: string): void;
    scrollToTaskX(id: string): void;
    scrollToTaskY(id: string): void;
    /** Start Add Dependencies */
    handleAddDepMouseMove(event: EventOffsets): void;
    handleAddDepMouseUp(event: EventOffsets): void;
    updateDepOffsets(offsetX?: number | null, offsetY?: number | null): void;
    /** End Add Dependencies */
    /** Start Resize Task */
    handleResizeTaskMouseMove(event: EventOffsets): void;
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
    handleMoveTaskMouseMove(event: EventOffsets): void;
    moveTask(offsetX: number): void;
    moveDependedTasks(task: Task, diff: number): void;
    saveMoveTask(task: Task, diff: number): void;
    handleMoveTaskMouseUp(): void;
}
