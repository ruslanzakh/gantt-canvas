import { RootModule } from './root.module';
export declare class RootService {
    root: RootModule;
    convertColorDiv: HTMLDivElement | null;
    constructor(root: RootModule);
    convertColor(color: string): string;
    unmountConvertColorDiv(): void;
}
