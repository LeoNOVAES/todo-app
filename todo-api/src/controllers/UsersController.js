const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/key.json");

module.exports = {
    async store(req, res, next) {
        try {
            const data = req.body;
            const exists = await User.findOne({ email: data.email });

            if (exists) throw new Error();

            const user = await User.create(data);
            user.password = '';

            return res.status(201).json({
                message: "User created successfully!",
                user
            });

        } catch (e) {
            console.log(e);
            e.httpStatusCode = 422;
            e.responseMessage = 'User already exists!';
            next(e);
        }
    },

    async autentic(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error();
            }

            if (user.validatePassword(password)) {
                const token = jwt.sign({ "id": user.id }, secret, {
                    expiresIn: 86400
                });

                return res.status(202).json({ user, token });
            } else {
                throw new Error();
            }

        } catch (e) {
            console.log(e);
            e.httpStatusCode = 403;
            e.responseMessage = 'not authorized!';
            next(e);
        }
    },

    async index(req, res) {
        const user = await User.findById(req.userId);
        res.status(200).json({ user });
    },
}
