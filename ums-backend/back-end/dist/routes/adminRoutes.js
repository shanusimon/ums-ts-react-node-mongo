"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var adminControllers_1 = require("../controllers/adminControllers");
var router = express_1.default.Router();
router.post('/login', adminControllers_1.loginAdmin);
router.get('/getUsers', auth_1.adminOnly, adminControllers_1.getUsers);
router.post('/createUser', adminControllers_1.createUser);
router.put('/updateUser/:id', auth_1.adminOnly, adminControllers_1.updateUsers);
router.delete('/deleteUser/:id', auth_1.adminOnly, adminControllers_1.deleteUser);
exports.default = router;
