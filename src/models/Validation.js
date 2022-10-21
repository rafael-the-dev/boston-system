class Validation {
    static hasWhitespace = (value, onSuccess, onError ) => {
        const isValid = /\s+/g.test(value);
        
        if(isValid) {
            onSuccess({
                message: "must not contain white space",
                name: ""
            });
            return;
        }

        onError && onError();
    };
}

export default Validation;