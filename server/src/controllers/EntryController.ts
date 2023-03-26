import { randomUUID } from "crypto";
import { LocalDatabase } from "../database";
import { Entry } from "../models/Entry";

export class EntryController {
	provider: LocalDatabase;

	constructor(provider: LocalDatabase) {
		this.provider = provider;
	}

	create(entry: Omit<Entry, "id">): Entry {
		if (!entry.userId) throw "Entry must have an User ID";

		const createdEntry = new Entry({ id: randomUUID(), ...entry });

		this.provider.entries.push(createdEntry);

		return createdEntry;
	}
}
