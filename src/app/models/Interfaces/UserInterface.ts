import {InvoiceInterface} from "./InvoiceInterface";
import {BotInterface} from "./BotInterface";

export interface UserInterface {
    id: number;
    steamId: number;
    username: string;
    avatar: string;
    invoices: Promise<InvoiceInterface[]>;
    activeBots?: Promise<BotInterface[]>;
}