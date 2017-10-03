import {InvoiceInterface} from "./InvoiceInterface";

export interface UserInterface {
    id: number;
    steamId: number;
    username: string;
    avatar: string;
    invoices: Promise<InvoiceInterface[]>;
}