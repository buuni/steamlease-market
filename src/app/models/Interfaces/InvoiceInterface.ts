import {ProductInterface} from "../market/ProductInterface";

export interface InvoiceInterface {
    id: number,
    amount: number,
    createdDate: string,
    paidAmount?: number,
    paidDate?: string,
    products: Promise<Promise<ProductInterface>[]>,
    status: string;

    statusText:string;
}