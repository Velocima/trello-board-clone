const Board = require('../models/board.js');
const Item = require('../models/item.js');

describe('db functions', () => {
	let testDB = {
		boards: [],
		title: 'Test Title',
	};

	const testData = [
		{
			title: 'To Do',
			items: [
				{
					title: 'test db',
					description: 'gotta write some tests for my mock db',
				},
				{
					title: 'test api',
					description: 'gotta write some tests for my api',
				},
				{
					title: 'test client',
					description: 'client also needs some tests written',
				},
			],
		},
		{
			title: 'In Progress',
			items: [
				{
					title: 'Create wireframe',
					description: 'gotta make my site look fresh',
				},
				{
					title: 'Confer with matt',
					description: 'gotta make sure the coffe is fresh',
				},
			],
		},
		{
			title: 'Done',
			items: [
				{
					title: 'Create githup repo',
					description: 'make the github repo please',
				},
				{
					title: 'Create file structure',
					description: 'stub out expected file structure locally and commit to repo',
				},
				{
					title: 'Setup npm package.json',
					description: 'Install expected dependencies and setup scripts',
				},
			],
		},
	];

	beforeEach(() => {
		for (let { title, items } of testData) {
			const newBoard = new Board(title);
			const newBoardItems = [];
			for (let { title, description } of items) {
				let newItem = new Item(title, description);
				newBoardItems.push(newItem);
			}
			newBoard.setItems(newBoardItems);
			testDB.boards.push(newBoard);
		}
	});

	afterEach(() => {
		testDB = {
			boards: [],
			title: 'Test Title',
		};
	});

	test('should have a title', () => {
		expect(testDB.title).toBeTruthy();
	});
	test('should have an array of boards', () => {
		expect(testDB.boards).toBeInstanceOf(Array);
	});
});
