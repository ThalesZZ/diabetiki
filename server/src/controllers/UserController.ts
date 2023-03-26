import { randomUUID } from "crypto";
import { LocalDatabase } from "../database";
import { User } from "../models/User";

export class UserController {
	provider: LocalDatabase;

	constructor(provider: LocalDatabase) {
		this.provider = provider;
	}

	create(user: Omit<User, "id">): User {
		const createdUser = new User({ id: randomUUID(), ...user });

		this.provider.users.push(createdUser);

		return createdUser;
	}
}
