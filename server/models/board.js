class Board {
	constructor(title, db, items = []) {
		this.title = title;
		this.items = items;
		this.id = this.createNewId(db);
	}

	setItems(itemsArr) {
		this.items = itemsArr;
	}

	createNewId(db) {
		const allIds = db.boards.map((board) => board.id);
		const newId = Math.max(...allIds, 1) + 1;
		return newId;
	}
}

module.exports = Board;
