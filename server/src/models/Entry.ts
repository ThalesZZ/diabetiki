export class Entry {
	id: string;
	userId: string;
	creationDate: Date;
	lastUpdateDate: Date;

	constructor({ id, userId, creationDate, lastUpdateDate }: Entry) {
		this.id = id;
		this.userId = userId;
		this.creationDate = creationDate;
		this.lastUpdateDate = lastUpdateDate;
	}
}
