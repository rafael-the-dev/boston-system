//const easyinvoice = require('easyinvoice');
import easyinvoice from "easyinvoice";

export const createInvoice = async ({ information, products, paymentMethods }) => {
    const data = { 
        products, 
        paymentMethods ,
        information,
        "bottom-notice": "Kindly pay your invoice within 15 days.",
        "settings": {
            "currency": "MZN"
            //height: "74 mm",
            //width: "52 mm"
        }
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download('myInvoice.pdf', result.pdf);
};

//module.exports = { createInvoice };