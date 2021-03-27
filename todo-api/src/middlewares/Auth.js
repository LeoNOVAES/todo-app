const jwt = require("jsonwebtoken");
const { secret } = require("../config/key.json");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) throw new Error();

        const splitedToken = authHeader.split(' ');

        if(splitedToken.length !== 2) throw new Error();

        const [schema, token] = splitedToken;

        if(schema !== 'Bearer') throw new Error();

        jwt.verify(token, secret, (err, decoded) => {
            if (err) throw new Error();

            req.userId = decoded.id;
            return next();
        });
    } catch (e) {
        console.log(e);
        e.httpStatusCode = 401;
        e.responseMessage = 'Invalid Token!';
        next(e);
    }
}