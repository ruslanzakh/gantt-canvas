import { RootModule } from './root.module';
import { ScrollbarXEntity } from './entities/scrollbar-x.entity';
import { ScrollbarYEntity } from './entities/scrollbar-y.entity';
export declare class RootView {
    root: RootModule;
    scrollbarX: ScrollbarXEntity;
    scrollbarY: ScrollbarYEntity;
    offsetX: number;
    offsetY: number;
    scaleX: number;
    scaleY: number;
    constructor(root: RootModule);
    render(): void;
    attachEvents(): void;
    destroyEvents(): void;
    updateCanvasSizeAndRender(): void;
    updateCanvasSize(): void;
    handleChangeOffsetX(difference?: number, needRender?: boolean): void;
    handleSetOffsetX(offsetX?: number, needRender?: boolean, needAnimate?: boolean, duration?: number): void;
    handleSetOffsetY(offsetY?: number, needRender?: boolean, needAnimate?: boolean, duration?: number): void;
    setCursor(cursor: string): void;
}
