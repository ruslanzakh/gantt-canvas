import { RootModule, RootApiProps } from './root/root.module';

class Gantt {
	root: RootModule;
	constructor(el: string, props: RootApiProps) {
		this.root = new RootModule(el, props);
	}
}

export default Gantt;