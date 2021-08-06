import Gantt from './lib';

const tasks = [
	{
		id: 'task1',
		title: 'Task 1',
		start_date_ts: 1627670084597,
		end_date_ts: 1627680084597,
		next_ids: ['task2', 'task3']
	},
	{
		id: 'task2',
		title: 'Task 2',
		start_date_ts: 1627904121049,
		end_date_ts: 1628163321049,
		next_ids: ['task3']
	},
	{
		id: 'task3',
		title: 'Task 3',
		start_date_ts: 1628004121049,
		end_date_ts: 1628763321049,
		next_ids: ['task4']
	},
	{
		id: 'task4',
		title: 'Task 4',
		start_date_ts: 1627670084597,
		end_date_ts: 1628163321049,
		next_ids: ['task3']
	},
	{
		id: 'task5',
		title: 'Task 4',
		start_date_ts: 1628163321049,
		end_date_ts: 1628163321049,
		next_ids: ['task4']
	},
]
new Gantt('#app', {
	tasks,
	handleChange(tasks) {
		console.log(tasks);
	}
});