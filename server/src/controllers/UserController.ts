import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { LocalDatabase } from "../database";
import { User } from "../models/User";

export class UserController {
	provider: LocalDatabase;

	constructor(provider: LocalDatabase) {
		this.provider = provider;
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const user: Omit<User, 'id'> = req.body
		const createdUser = new User({ ...user, id: randomUUID() });

		this.provider.users.push(createdUser);

		return createdUser;
	}
}
