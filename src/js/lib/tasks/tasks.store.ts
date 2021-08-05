import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';

export class TasksStore {
	root: RootModule;
	module: TasksModule;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}


}