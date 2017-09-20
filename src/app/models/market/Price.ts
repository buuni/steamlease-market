export class Price {
    value: number;
    currency: string;

    public convertToCurrentFormat() : Number {
        let value = this.value;
        if(this.currency !== 'RUB') {
            value = value * 60;
        }

        return value / 100;
    }

    static fromJson(data: any) {
        const price: Price = new Price();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        price.value = data.final;
        price.currency = data.currency;

        return price;
    }
}