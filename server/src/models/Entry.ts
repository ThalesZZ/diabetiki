export class Entry {
	id: string;
	userId: string;
    timestamp: number;

	constructor({ id, userId, timestamp }: Entry) {
		this.id = id;
		this.userId = userId;
		this.timestamp =timestamp;
	}
}
