import {ProductInterface} from "../market/ProductInterface";

export interface BotInterface {
    id: number;
    activeId: number;
    login: string;
    password: string;
    until: string;
    product?: ProductInterface;
}