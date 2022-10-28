
class Sale {
    constructor({ idSalesSeries, Estado, User, Data, idSales, SalesSerie, Montante, Iva, Subtotal, Total, Status}) {
        this._amount = Montante;
        this._date = Data;
        this._id = idSalesSeries;
        this._salesId = idSales;
        this._status = Status;
        this._salesSerieId = SalesSerie;
        this._subTotal = Subtotal;
        this._total = Total;
        this._totalVAT = Iva;
        this._userId = User;
    }

    get amount() { return this._amount; }

    get date() { return this._date; }

    get id() { return this._id; }

    get salesId() { return this._salesId; }

    get status() { return this._status; }

    get salesSerieId() { return this._salesSerieId; }

    get subTotal() { return this._subTotal; }

    get total() { return this._total; }

    get totalVAT() { return this._totalVAT; }

    get userId() { return this._userId; }

    toLiteral() {
        return {
            amount: this.amount,
            date: this.date,
            id: this.id,
            salesId: this.salesId,
            status: this.status,
            salesSerieId: this.salesSerieId,
            subTotal: this.Ssbtotal,
            total: this.total,
            totalVAT: this.totalVAT,
            userId: this.userId
        }
    }

}

module.exports = Sale;