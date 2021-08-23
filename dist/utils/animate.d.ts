interface AnimateOptions {
    duration: number;
    timing(timeFraction: number): number;
    draw(progress: number): void;
}
export declare function animate(options: AnimateOptions): void;
export declare const timing: (timeFraction: number) => number;
export {};
