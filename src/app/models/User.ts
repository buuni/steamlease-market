
import {Invoice} from "./Invoice";
import {UserInterface} from "./Interfaces/UserInterface";
import {InvoiceInterface} from "./Interfaces/InvoiceInterface";

export class User implements UserInterface {
    public id: number;
    public steamId: number;
    public username: string;
    public avatar: string;
    public invoices: Promise<InvoiceInterface[]>;

    static fromJson(data: any) {
        const user: User = new User();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        user.id = data.id;
        user.steamId = data.steam_id;
        user.username = data.name;
        user.avatar = data.avatar;

        return user;
    }
}