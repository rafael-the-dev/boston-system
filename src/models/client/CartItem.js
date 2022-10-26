
class CartItem {
    constructor(product, quantity) {
        this._quantity = quantity;
        this._product = product;
    }

    get product() { return this._product; }

    get quantity() { return this._quantity; }

    set quantity(quantity) { this._quantity = quantity; }

    getTotal() {
        const quantity = Boolean(this.quantity) ? this.quantity : 0;
        return this.product.sellPrice * quantity;
    }

    getTotalVAT() {
        return (this.getTotal() * this.product.sellVAT) / 100;
    }

    toLiteral() {
        return {
            product: this.product,
            quantity: this.quantity
        }
    }
}

export default CartItem;