import { ObjectList } from '../utils/interfaces';
import { RootModule } from './root.module';
export declare class RootService {
    root: RootModule;
    convertColorDiv: HTMLDivElement | null;
    colorsCache: ObjectList<string>;
    constructor(root: RootModule);
    clearColorsCache: () => void;
    convertOptionalColor: (color?: string | undefined) => string | undefined;
    convertColor: (color: string, defaultColor?: string | undefined) => string;
    unmountConvertColorDiv: () => void;
}
