import {ProductInterface} from "../market/ProductInterface";

export interface InvoiceInterface {
    id: number,
    amount: number,
    createdDate: string,
    paidAmount?: number,
    paidDate?: string,
    products: Promise<ProductInterface[]>,
    productsId: Promise<any>,
    status: string;
}