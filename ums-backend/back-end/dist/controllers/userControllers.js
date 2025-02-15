"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.registerUser = void 0;
var Users_1 = __importDefault(require("../models/Users"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwt_key = 'your_jwt_secret';
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, phone, password, image, user, hashedPassword, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, phone = _a.phone, password = _a.password, image = _a.image;
                console.log(name, email, phone, password, image);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Users_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user) {
                    res.status(400).json({ message: "User Already Exist" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                user = new Users_1.default({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    profileImage: image,
                    phone: phone
                });
                console.log(user);
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                res.status(201).json({ message: "User Registered successfully", user: user });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.status(500).json({ message: "Server Error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Users_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({ message: "The user with this email not exist" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    res.status(400).json({ message: "The password is incorrect" });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1.default.sign({
                    id: user._id,
                    role: user.role,
                }, jwt_key, { expiresIn: '1h' });
                res.json({ message: "Login Successful", token: token, user: user });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name_1, email, phone, profileImage, user, updatedUser, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!req.user) {
                    res.status(401).json({ message: "Unauthorized" });
                    return [2 /*return*/];
                }
                userId = req.user.id;
                _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, profileImage = _a.profileImage;
                return [4 /*yield*/, Users_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                user.name = name_1 || user.name;
                user.phone = phone || user.phone;
                user.email = email || user.email;
                user.profileImage = profileImage || user.profileImage;
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _b.sent();
                res.json({
                    message: "User updated Successfully",
                    user: updatedUser
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
