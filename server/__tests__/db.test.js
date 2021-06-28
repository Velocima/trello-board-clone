const Board = require('../models/board.js');
const Item = require('../models/item.js');

describe('db functions', () => {
	let db = {
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
			db.boards.push(newBoard);
		}
	});

	afterEach(() => {
		db = {
			boards: [],
			title: 'Test Title',
		};
	});

	test('should have a title', () => {
		expect(db.title).toBeTruthy();
	});

	test('should have an boards array', () => {
		expect(db.boards).toBeInstanceOf(Array);
	});

	describe('Boards', () => {
		let randomBoardsIndex;
		const { boards } = db;

		beforeEach(() => {
			randomBoardsIndex = Math.floor(Math.random() * db.boards.length);
		});

		test('boards array should contain only instances of Board', () => {
			expect(db.boards[randomBoardsIndex]).toBeInstanceOf(Board);
		});

		test('Each should have a unique ID', () => {
			const boardIds = boards.map((board) => board.id);
			let idCounter = 0;
			const testId = boards[randomBoardsIndex].id;
			boardIds.forEach((id) => {
				if (id === testId) {
					idCounter++;
				}
			});
			expect(idCounter).toBe(1);
		});

		test('should contain a string title', () => {
			expect(typeof boards[randomBoardsIndex].title).toBe('string');
		});

		test('should contain an items array', () => {
			expect(boards[randomBoardsIndex].items).toBeInstanceOf(Array);
		});
	});

	describe('Items', () => {
		let randomBoardsIndex;
		const { boards } = db;
		let randomItemIndex;
		let items;

		beforeEach(() => {
			randomBoardsIndex = Math.floor(Math.random() * boards.length);
			items = boards[randomBoardsIndex].items;
			randomItemIndex = Math.floor(Math.random() * boards[randomBoardsIndex].items.length);
		});

		test('array should only contain instances of Item class', () => {
			expect(items[randomItemIndex]).toBeInstanceOf(Item);
		});

		test('Each item should contain a unique id', () => {
			const itemIds = items.map((item) => item.id);
			let idCounter = 0;
			const testId = items[randomItemIndex].id;
			itemIds.forEach((id) => {
				if (id === testId) {
					idCounter++;
				}
			});
			expect(idCounter).toBe(1);
		});

		test('Each item should contain a string title', () => {
			expect(typeof items[randomItemIndex].title).toBe('string');
		});

		test('Each item should contain a string description', () => {
			expect(typeof items[randomItemIndex].description).toBe('string');
		});
	});
});
