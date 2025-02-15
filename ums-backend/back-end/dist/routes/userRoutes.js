"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userControllers_1 = require("../controllers/userControllers");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.post('/register', userControllers_1.registerUser);
router.post('/login', userControllers_1.loginUser);
router.put('/updateProfile', auth_1.userOnly, userControllers_1.updateUser);
exports.default = router;
