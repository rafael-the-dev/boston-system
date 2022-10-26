
class Product {
    constructor({ idProduto, BarCod, Nome, Preco_compra, IVA_compra, Preco_venda, Iva_venda, 
        fk_grupo, Estado, Data }) {
        this._barCode = BarCod;
        this._categoryId = fk_grupo;
        this._date = Data;
        this._id = idProduto;
        this._name = Nome;
        this._purchasePrice = Preco_compra;
        this._purchaseVAT = IVA_compra;
        this._state = Estado;
        this._sellPrice = Preco_venda;
        this._sellVAT = Iva_venda;
    }

    get barCode() {
        return this._barCode;
    }

    set barCode(barCode) {
        this._barCode = barCode;
    }

    get categoryId() {
        return this._categoryId;
    }

    set categoryId(barCode) {
        this._categoryId = barCode;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get purchasePrice() {
        return this._purchasePrice;
    }

    set purchasePrice(purchasePrice) {
        this._purchasePrice = purchasePrice;
    }

    get purchaseVAT() {
        return this._purchaseVAT;
    }

    set purchaseVAT(purchaseVAT) {
        this._purchaseVAT = purchaseVAT;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }
    
    get sellPrice() {
        return this._sellPrice;
    }

    set sellPrice(sellPrice) {
        this._sellPrice = sellPrice;
    }
    
    get sellVAT() {
        return this._sellVAT;
    }

    set sellVAT(sellVAT) {
        this._sellVAT = sellVAT;
    }

}

export default Product;