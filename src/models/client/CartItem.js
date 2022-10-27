import currency from "currency.js";

class CartItem {
    constructor(product, quantity) {
        this._quantity = quantity;
        this._product = product;
    }

    get product() { return this._product; }

    get quantity() { return this._quantity; }

    set quantity(quantity) { this._quantity = quantity; }

    getSubTotal() {
        const quantity = Boolean(this.quantity) ? this.quantity : 0;
        return currency(this.product.sellPrice).multiply(quantity).value;
    }

    getTotalVAT() {
        return currency(this.getSubTotal()).multiply(this.product.sellVAT).divide(100).value;
    }

    getTotal() {
        return currency(this.getSubTotal()).add(this.getTotalVAT()).value;
    }

    toLiteral() {
        return {
            product: this.product,
            quantity: this.quantity
        }
    }
}

export default CartItem;