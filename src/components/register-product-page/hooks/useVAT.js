import * as React from "react";

const useVAT  = ({ hasDataChanged, isVATIncluded, setIsVATIncluded, setVAT, vat }) => {
    const counter = React.useRef(0);

    React.useEffect(() => {
        const newValue = { 
            errors: [],
            value: 0
        };

        if(isVATIncluded) setVAT({ ...newValue, value: 17 });
        else setVAT(newValue);
    }, [ isVATIncluded, setVAT ]);

    React.useEffect(() => {
        if(hasDataChanged.current) {
            if((parseInt(vat) === 17)) {
                setIsVATIncluded(true);
            } else {
                setIsVATIncluded(false);
            }            
        }

        hasDataChanged.current = false;
    }, [ hasDataChanged, setIsVATIncluded, vat ])
};

export { useVAT };