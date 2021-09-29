export interface RoundRectRadius {
    tl: number;
    tr: number;
    br: number;
    bl: number;
}
export declare const roundRect: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number | number[] | RoundRectRadius, fill?: string | undefined, stroke?: string | undefined) => void;
export declare const getEventTouchOffsets: (event: TouchEvent, canvas: HTMLCanvasElement) => {
    offsetX: number;
    offsetY: number;
};
export declare const renderUnderline: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => void;
export declare const measureText: (ctx: CanvasRenderingContext2D, text: string) => {
    width: number;
    height: number;
    actualHeight: number;
};
interface CanvasRenderingContext extends CanvasRenderingContext2D {
    webkitBackingStorePixelRatio?: number;
    mozBackingStorePixelRatio?: number;
    msBackingStorePixelRatio?: number;
    oBackingStorePixelRatio?: number;
    backingStorePixelRatio?: number;
}
export declare function scaleCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext, width: number, height: number): void;
export {};
