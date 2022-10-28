import currency from "currency.js"
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
            { value: 100, label: "Cash" },
            { value: 200, label: "M-pesa" },
            { value: 300, label: "E-mola" },
            { value: 400, label: "M-kesh" },
            { value: 500, label: "POS" },
            { value: 600, label: "P24" }
        ];

        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            for(let i = 0; i < list.length; i++) {
                if(!Boolean(listTemp.find(item =>  item.value === list[i].value))) {
                    listTemp.push({ ...list[i], id: uuidV4(), amount: 0, receivedAmount: 0 });
                    break;
                }
            }

            this.methods = listTemp;

            return listTemp;
        })
    }

    amountRemaining() {
        return currency(this.cart.total).subtract(currency(this.methods.reduce((previousValue, currentMethod) => {
            return currency(currentMethod.amount).add(previousValue);
        }, 0))).value;
    }

    addAmout(id, amount) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            const method = listTemp.find(item => item.id === id);
            method.amount = amount;

            return listTemp;
        })
    }

    addReceivedAmount(id, receivedAmount) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            const method = listTemp.find(item => item.id === id);
            method.receivedAmount = receivedAmount;

            return listTemp;
        })
    }

    clearRemaingAmount(id) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods ];

            const method = listTemp.find(item => item.id === id);
            method.amount = currency(method.amount).add(this.amountRemaining());

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

    totalReceivedAmount() {
        return currency(this.methods.reduce((previousValue, currentMethod) => {
            return currency(currentMethod.receivedAmount).add(previousValue)
        }, 0)).value;
    }

    getClientChange() {
        return currency(this.totalReceivedAmount()).subtract(this.cart.total).value;
    }

    parseMethod({ amount, value }) {
        return {
            amount: currency(amount).value,
            id: value
        }
    }

    remove(id) {
        this._setPayment(currentMethods => {
            const listTemp = [ ...currentMethods.filter(item => item.id !== id) ];

            this.methods = listTemp;

            return listTemp;
        })
    }

    toLiteral() {
        return {
            ...this.cart?.toLiteral(),
            paymentMethods: this.methods.map(method => this.parseMethod(method))
        }
    }
    
}

export default Payment;