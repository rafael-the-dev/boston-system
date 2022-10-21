class Validation {
    static checkLength = ({ min, onError, onSuccess, value }) => {
        if(value.length < min) {
            onError({
                message: `must contain at least ${min} characters`,
                name: ""
            })
        }

        onSuccess && onSuccess();
    }
    
    static hasNumbers = ({ value, onError, onSuccess }) => {
        const isValid = /[0-9]{2,}/g.test(value);

        if(!isValid) {
            onError({
                message: "must contain at least two numbers",
                name: ""
            })
        }

        onSuccess && onSuccess();
    }

    static hasWhitespace = ({ value, onSuccess, onError }) => {
        const isValid = /\s+/g.test(value);
        
        if(isValid) {
            onSuccess({
                message: "must not contain white space",
                name: ""
            });
            return;
        }

        onError && onError();
    }

    static startWithUppercaseLetter = ({ onError, onSuccess, value }) => {
        const isValid = /^[A-Z]/.test(value);

        if(!isValid) {
            onError({
                message: "must start with uppercased letter",
                name: ""
            })
        }

        onSuccess && onSuccess();
    }
}

export default Validation;