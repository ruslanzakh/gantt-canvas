import { RootModule, RootModuleProps } from './root/root.module';

export interface GanttProps extends RootModuleProps {};

class Gantt {
	root: RootModule;
	constructor(el: string, props: GanttProps) {
		this.root = new RootModule(el, props);
	}
}

export default Gantt;