import {InvoiceInterface} from "./Interfaces/InvoiceInterface";
import {ProductInterface} from "./market/ProductInterface";

export class Invoice implements InvoiceInterface {
    id: number;
    amount: number;
    createdDate: string;
    paidAmount?: number;
    paidDate?: string;
    products: Promise<ProductInterface[]>;
    productsId: Promise<any>;
    status: string;


    static fromJson(data: any) : InvoiceInterface {
        const invoice: InvoiceInterface = new Invoice();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        invoice.id = data.id;
        invoice.amount = data.bill_amount;
        invoice.createdDate = data.created_at;
        invoice.paidAmount = data.paid_amount;
        invoice.paidDate = data.paid_at;
        invoice.status = data.status;
        invoice.productsId = Promise.resolve(data.products);

        return invoice;
    }
}