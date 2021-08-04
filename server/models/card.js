class Item {
	constructor(title, description, siblingItems) {
		this.title = title;
		this.description = description;
		this.id = this.createNewId(siblingItems);
	}
	createNewId(siblingItems) {
		const allIds = siblingItems.map((item) => item.id);
		const newId = Math.max(...allIds, 1) + 1;
		return newId;
	}
}

module.exports = Item;
