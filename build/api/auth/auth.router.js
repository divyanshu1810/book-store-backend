"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("./auth.middleware");
exports.default = () => {
    const app = (0, express_1.Router)();
    app.post('/signup', auth_middleware_1.validateUser, auth_controller_1.createUser);
    app.post('/login', auth_middleware_1.validateLogin, auth_controller_1.loginUser);
    return app;
};
//# sourceMappingURL=auth.router.js.map