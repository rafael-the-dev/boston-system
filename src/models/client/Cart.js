
class Cart {
    constructor(setList) {
        this._list = [];
        this._setList = setList;
    }

    get list() { return this._list; }

    set list(list) {
        this._list = list;
    }

    addItem(...items) {
        this._setList(list => {
            const data = [ ...list, ...items ];
            
            this.list = data;

            return data;
        });
    }

    addQuantity(id, value) {
        this._setList(list => {
            const data = [ ...list];
            
            const cartItem = data.find(item => item.product.id === id);

            cartItem.quantity = value;

            this.list = data;

            return data;
        });
    }

    decrementQuantity(id) {
        this._setList(list => {
            const data = [ ...list];
            
            const cartItem = data.find(item => item.product.id === id);

            if(isNaN(cartItem.quantity)) cartItem.quantity = 1;
            else cartItem.quantity -= 1;
            
            this.list = data;

            return data;
        });
    }

    incrementQuantity(id) {
        this._setList(list => {
            const data = [ ...list];
            
            const cartItem = data.find(item => item.product.id === id);

            if(isNaN(cartItem.quantity)) cartItem.quantity = 1;
            else cartItem.quantity += 1;

            this.list = data;

            return data;
        });
    }

    reset() {
        this.list = [];
        this._setList([]);
    }

    get total() {
        return this.list.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.getTotal();
        }, 0)
    }
}

export default Cart;