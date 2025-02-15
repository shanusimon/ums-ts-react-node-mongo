"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("./config/db"));
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', userRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server is Running on Port 5000");
});
