const DefaultError = require("./DefaultError");

class AuthorizationError extends DefaultError {
    constructor() {
        super(401, "Not authorized or credentials not provided");
    }
}

module.exports = AuthorizationError;