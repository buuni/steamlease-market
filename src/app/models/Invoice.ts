import {InvoiceInterface} from "./Interfaces/InvoiceInterface";
import {ProductInterface} from "./market/ProductInterface";

export class Invoice implements InvoiceInterface {
    id: number;
    amount: number;
    createdDate: string;
    paidAmount?: number;
    paidDate?: string;
    products: Promise<Promise<ProductInterface>[]>;
    status: string;

    get statusText():string {
        switch (this.status) {
            case 'confirmed': return 'Счет выставлен';
            case 'paid': return 'Оплачен';
            case 'canceled': return 'Отменен';
            case 'refunded': return 'Возврат средств';
            case 'processing': return 'Обработка заказа';
        }
    }

    static fromJson(data: any) : InvoiceInterface {
        const invoice: InvoiceInterface = new Invoice();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        invoice.id = data.id;
        invoice.amount = data.bill_amount;
        invoice.createdDate = data.created_at;
        invoice.paidAmount = data.paid_amount;
        invoice.paidDate = data.paid_at;
        invoice.status = data.status;

        return invoice;
    }
}