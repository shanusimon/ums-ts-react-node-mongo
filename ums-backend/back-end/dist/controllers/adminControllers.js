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
exports.deleteUser = exports.updateUsers = exports.createUser = exports.getUsers = exports.loginAdmin = void 0;
var Users_1 = __importDefault(require("../models/Users"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userControllers_1 = require("./userControllers");
var jwt_key = 'your_jwt_secret';
var loginAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, passwordMatch, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Users_1.default.findOne({ email: email })];
            case 2:
                admin = _b.sent();
                if (!admin) {
                    res.status(400).json({ message: "The user with this email not exist" });
                    return [2 /*return*/];
                }
                if (admin.role !== "admin") {
                    res.status(400).json({ message: "This user is not an admin" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, admin.password)];
            case 3:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    res.status(400).json({ message: "The password is incorrect" });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1.default.sign({
                    id: admin._id,
                    role: admin.role
                }, jwt_key, { expiresIn: "1h" });
                res.json({ message: "Login Successful", token: token, admin: admin });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginAdmin = loginAdmin;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Users_1.default.find({ role: "user" })];
            case 1:
                users = _a.sent();
                res.status(200).json({ users: users });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error Fetching users:", error_2);
                res.status(500).json({ message: "Failed to fetch users data" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, phone, password, profileImage, hashedPassword, newUser, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, password = _a.password, profileImage = _a.profileImage;
                if (!name_1 || !email || !phone || !password || !profileImage) {
                    res.status(401).json({ message: "All fields are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                newUser = new Users_1.default({
                    name: name_1,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    profileImage: profileImage
                });
                console.log("newUser", newUser);
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                res.status(200).json({ message: "The user created successfully" });
                return [2 /*return*/];
            case 3:
                error_3 = _b.sent();
                console.log("There is error in creating user");
                res.status(500).json({ message: "internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, email, phone, profileImage, updatedUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                console.log(id);
                _a = req.body, name_2 = _a.name, email = _a.email, phone = _a.phone, profileImage = _a.profileImage;
                console.log(req.body);
                return [4 /*yield*/, Users_1.default.findByIdAndUpdate(id, { name: name_2, email: email, phone: phone, profileImage: profileImage }, { new: true, runValidators: true })];
            case 1:
                updatedUser = _b.sent();
                console.log(userControllers_1.updateUser);
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ message: "User updated successfully", user: updatedUser });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error("Error in Updating user", error_4);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUsers = updateUsers;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                console.log("userID", id);
                return [4 /*yield*/, Users_1.default.findByIdAndDelete(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(400).json({ message: "The User has been deleted Successfully" });
                    return [2 /*return*/];
                }
                res.status(200).json({ message: "User deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error("Error in deleting user", error_5);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
