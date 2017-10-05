import {BotInterface} from "./Interfaces/BotInterface";
import {ProductInterface} from "./market/ProductInterface";

export class Bot implements BotInterface {
    id: number;
    activeId: number;
    login: string;
    password: string;
    until: string;
    product?: ProductInterface;

    static fromJson(data: any) : BotInterface {
        const bot: BotInterface = new Bot();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        bot.id = data.object.id;
        bot.login = data.object.login;
        bot.password = data.object.password;
        bot.activeId = data.active_bot_id;
        bot.until = data.active_until;

        return bot;
    }
}