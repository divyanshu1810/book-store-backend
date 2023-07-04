"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const auth_services_1 = require("./auth.services");
const createUser = async (req, res) => {
    try {
        await (0, auth_services_1.handleCreateUser)(req.body.name, req.body.email, req.body.password);
        res.status(201).send({
            success: true,
            message: 'User created successfully',
        });
    }
    catch (error) {
        if (error.message === 'User already exist with same email') {
            res.status(409).send({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const userObj = { email: req.body.email, password: req.body.password };
        const token = await (0, auth_services_1.handleLoginUser)(userObj.email, userObj.password);
        res.status(200).json({
            success: true,
            message: 'login Successful',
            jwt: token,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
            return;
        }
        if (error.statusCode === 401) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map