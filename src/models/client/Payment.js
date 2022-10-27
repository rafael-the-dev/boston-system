import { v4 as uuidV4 } from "uuid";

class Payment {
    constructor(setPayment) {
        this._cart = [];
        this._methods = []; 
        this._setPayment = setPayment;
    }

    get cart() { return this._cart; }
    set cart(cart) { this._cart = cart; }

    get methods() { return this._methods; }
    set methods(methods) { this._methods = methods; }

    add() {
        const list = [
            { value: "cash", label: "Cash" },
            { value: "credit-cart", label: "Credit Card" }
        ];

        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            for(let i = 0; i < list.length; i++) {
                if(!Boolean(listTemp.find(item =>  item.value === list[i].value))) {
                    listTemp.push({ ...list[i], id: uuidV4(), amount: 0 });
                    break;
                }
            }

            this.methods = listTemp;

            return listTemp;
        })
    }

    amountRemaining() {
        return this.cart.total - this.methods.reduce((previousValue, currentMethod) => {
            return previousValue + currentMethod.amount;
        }, 0)
    }

    addAmout(id, amount) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            const method = listTemp.find(item => item.id === id);
            method.amount = amount;

            return listTemp;
        })
    }

    changeMethod(id, newMethod) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            const method = listTemp.find(item => item.id === id);

            if(Boolean(listTemp.find(item => item.value === newMethod))) {
                return currentMethods;
            }

            method.value = newMethod;

            return listTemp;
        })
    }

    remove(id) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods.filter(item => item.id !== id) ];

            this.methods = listTemp;

            return listTemp;
        })
    }
    
}

export default Payment;