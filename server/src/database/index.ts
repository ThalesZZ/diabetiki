import { Entry } from "../models/Entry";
import { User } from "../models/User";

export class LocalDatabase {
    users: User[]
    entries: Entry[]

    constructor() {
        this.users = []
        this.entries = []
    }
}

const localDatabase = new LocalDatabase()

export default localDatabase