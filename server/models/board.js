class Board {
	constructor(title) {
		this.title = title;
		this.items = [];
	}
	setItems(itemsArr) {
		this.items = itemsArr;
	}
}

module.exports = Board;
