import Gantt from './lib';

const tasks = [
	{
		id: 'task1',
		title: 'Very Very long Task 1',
		start_date_ts: 1627670084597,
		end_date_ts: 1627680084597,
		all_day: true,
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
		all_day: true,
		start_date_ts: 1627670084597,
		end_date_ts: 1628163321049,
		next_ids: ['task3']
	},
	{
		id: 'task5',
		title: 'Task 4',
		start_date_ts: 1628163321049,
		end_date_ts: 1628163321049,
		all_day: true,
		next_ids: ['task4']
	},
]

// 1577912400000
// 1609448400000
// 1640984400000
// 1704056400000
// 1735592400000
const getStartDateTs = (min = 1609448400000, max = 1640984400000) => {
	const diff = max - min;
	const random = Math.floor(Math.random() * diff);
	return min + random;
}
const getNextIds = (tasks, end_date_ts: number) => {
	let count = Math.floor(Math.random() * 3);
	const data = [];
	if(count === 0) return data;
	const filteredTasks = tasks.filter(task => task.end_date_ts >= end_date_ts);
	if(filteredTasks.length === 0) return data;
	do {
		const randomIndex =  Math.floor(Math.random() * (filteredTasks.length - 1));
		data.push(filteredTasks[randomIndex].id);
		count--;
	} while(count > 0);
	return data;
}

function getTasks() {
	const tasks = [];
	for(let i = 0; i <= 1000; i++ ){
		const start_date_ts = getStartDateTs();
		const end_date_ts = start_date_ts + (Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000)

		const task = {
			id: `task_${i}`,
			title: `Task ${i}`,
			start_date_ts,
			end_date_ts,
			all_day: Math.random() >= 0.5,
			next_ids: getNextIds(tasks, end_date_ts)
		}
		tasks.push(task)
	}
	return tasks;
}
new Gantt('#app', {
	// tasks: tasks,
	tasks: getTasks(),
	handleChange(tasks) {
		console.log(tasks);
	}
});