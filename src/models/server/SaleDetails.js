const Sale = require("./Sale");

class SaleDetails extends Sale {
    constructor({ idSalesSeries, Estado, User, Data, idSales, SalesSerie, idSalesDetail, Montante, Iva, Subtotal, Total, Status}) {
        super({ idSalesSeries, Estado, User, Data, idSales, SalesSerie, Montante, Iva, Subtotal, Total, Status});
        this._salesDetailsId = idSalesDetail;

    }

    get salesDetailsId() { return this._salesDetailsId; }

    toLiteral() {
        console.log(super.toLiteral())
        return {
            ...super.toLiteral(),
            salesDetailsId: this._salesDetailsId
        }
    }
}

module.exports = SaleDetails;