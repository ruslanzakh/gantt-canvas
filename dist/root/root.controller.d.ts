import { RootModule } from './root.module';
interface EventsList {
    [index: string]: Function[];
}
export declare class RootController {
    root: RootModule;
    events: EventsList;
    touchOffsetX: number | null;
    touchOffsetY: number | null;
    previousTouchOffsetX: number | null;
    previousTouchOffsetY: number | null;
    constructor(root: RootModule);
    attachEvents(): void;
    destroyEvents(): void;
    on<T extends Event>(event: string, callback: (event: T) => void): () => void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handleClick(event: MouseEvent): void;
    handleScroll(event: WheelEvent): void;
    handleTouchStart(event: TouchEvent): void;
    handleTouchMove(event: TouchEvent): void;
    handleTouchEnd(event: TouchEvent): void;
    stopPropagation(event: MouseEvent): void;
}
export {};
