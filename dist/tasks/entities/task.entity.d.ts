import { RootModule } from '../../root/root.module';
import { EventOffsets } from '../../utils/interfaces';
export interface TaskRender {
    id: string;
    x: number;
    y: number;
    w: number;
    error?: boolean;
    hover: boolean;
    hoverConnection: boolean;
    title: string;
    next_ids: string[];
    background?: string;
    color?: string;
    backgroundHover?: string;
    colorHover?: string;
    stroke?: string;
    strokeHover?: string;
    underline?: boolean;
    outlineColor?: string;
    noEditable?: boolean;
    subtitle?: string;
    colorSubtitle?: string;
    outlineSubtitleColor?: string;
}
export declare class TaskEntity {
    root: RootModule;
    constructor(root: RootModule);
    isHover(event: EventOffsets, task: TaskRender): {
        hover: false;
        resize: null;
        depFrom: null;
    } | {
        hover: true;
        resize: string | null;
        depFrom: boolean | null;
    };
    renderItem(task: TaskRender): void;
    renderRightDep(x: number, y: number): void;
    renderArrow(id: string, source: TaskRender): void;
    renderArrowLine(x: number, y: number, task: TaskRender, isHover: boolean, isClear: boolean): void;
    renderArrowConnection(id: string, x: number, y: number): void;
    renderArrowHead(fromx: number, fromy: number, tox: number, toy: number, hover?: boolean): void;
    renderTaskText(task: TaskRender, top: number): void;
    renderResizeControls(task: TaskRender, top: number): void;
    isControlsHover(event: EventOffsets, task: TaskRender): string | null;
    isRenderedControlsHover(event: EventOffsets, task: TaskRender): string | null;
    getTaskTop(y: number): number;
    getTaskXX(x: number, w: number): number;
    getDepOffsetX(): number;
    getTaskFillStyle(task: TaskRender): string;
    getTaskStrokeStyle(task: TaskRender): string | undefined;
    getTitleColor(task: TaskRender): string;
    needControlOutsideTask(task: TaskRender): boolean;
}
