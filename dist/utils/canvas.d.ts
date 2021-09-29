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
export declare const getPixelRatio: () => number;
