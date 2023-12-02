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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateAvatar = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.registerUser = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const ejs_1 = __importDefault(require("ejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config/config"));
const redis_1 = require("../config/redis");
const activationToken_1 = require("../helpers/activationToken");
const jwt_1 = require("../helpers/jwt");
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const user_model_1 = __importDefault(require("../models/user.model"));
const user_service_1 = require("../services/user.service");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.registerUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get data from body
        const { name, email, password, avatar, isSocialAuth } = req.body;
        //is Exist email
        const isExist = yield user_model_1.default.exists({ email });
        if (isExist) {
            return next(new errorHandler_1.default("User alredy exist", 400));
        }
        //send activation email
        const activationInfo = {
            name: name,
            email: email,
            password: password,
            avatar: avatar,
            isSocialAuth: isSocialAuth,
        };
        const { token, activationCode } = (0, activationToken_1.createActivationToken)(activationInfo);
        const data = {
            user: { name: activationInfo.name },
            activationCode: activationCode,
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../views/email.ejs"), data);
        try {
            yield (0, sendMail_1.default)({
                email: activationInfo.email,
                subject: "Activate your account",
                templete: "email.ejs",
                data,
            });
            res.status(200).json({
                success: true,
                message: `Please check your email: ${activationInfo.email} to activate your account`,
                activationToken: token,
            });
        }
        catch (error) {
            return next(new errorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 400));
    }
}));
//activate user
exports.activateUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        if (!activation_code && !activation_token) {
            return next(new errorHandler_1.default("all field are required", 400));
        }
        //veryfy token and get user info
        const newUser = jsonwebtoken_1.default.verify(activation_token, config_1.default.activationSecret);
        if (newUser.activationCode !== activation_code) {
            return next(new errorHandler_1.default("Invalid activation code", 400));
        }
        //user data save in database
        const { name, email, password, avatar, isSocialAuth } = newUser.user;
        const existUser = yield user_model_1.default.exists({ email });
        if (existUser) {
            return next(new errorHandler_1.default("User alredy exist", 400));
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
            avatar,
            isSocialAuth,
        });
        res.status(201).json({
            success: true,
            message: "User registretion success",
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 400));
    }
}));
//login user
exports.loginUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return next(new errorHandler_1.default("All field are required", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new errorHandler_1.default("Invalid email or password", 400));
        }
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new errorHandler_1.default("Invalid email or password", 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
//logout user
exports.logoutUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = ((_a = res.locals.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logout successfull",
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
//update access token
exports.updateAccessToken = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        const decoded = jsonwebtoken_1.default.verify(refresh_token, config_1.default.refreshTokenSecret);
        if (!decoded) {
            return next(new errorHandler_1.default("Please login to access this recourse", 400));
        }
        const session = yield redis_1.redis.get(decoded._id);
        if (!session) {
            return next(new errorHandler_1.default("Please login to access this recourse", 400));
        }
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.accessTokenSecret, {
            expiresIn: "5m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.refreshTokenSecret, { expiresIn: "3d" });
        res.locals.user = user;
        res.cookie("access_token", accessToken, jwt_1.accessTokenOption);
        res.cookie("refresh_token", refreshToken, jwt_1.refreshToeknOption);
        yield redis_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); //7 days
        res.status(200).json({
            success: true,
            accessToken,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
//get user info
exports.getUserInfo = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = res.locals.user) === null || _b === void 0 ? void 0 : _b._id;
        (0, user_service_1.getUserbyId)(userId, res);
    }
    catch (error) {
        return next(new errorHandler_1.default(`User -- ${error.message}`, 400));
    }
}));
//social auth
exports.socialAuth = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, avatar } = req.body;
        if (!name || !email || !avatar) {
            return next(new errorHandler_1.default("All field are required", 400));
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({
                name,
                email,
                avatar,
                isSocialAuth: true,
            });
            (0, jwt_1.sendToken)(newUser, 201, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(`social auth -- ${error.message}`, 400));
    }
}));
//update user info
exports.updateUserInfo = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { name, email } = req.body;
        const userId = (_c = res.locals.user) === null || _c === void 0 ? void 0 : _c._id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return next(new errorHandler_1.default("User is not found", 404));
        }
        const emailExist = yield user_model_1.default.findOne({ email });
        if (emailExist) {
            return next(new errorHandler_1.default("Email alredy exist", 400));
        }
        if (name && user) {
            user.name = name;
        }
        if (email && user) {
            user.email = email;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`update user -- ${error.message}`, 400));
    }
}));
//update password
exports.updatePassword = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new errorHandler_1.default("All field are required", 400));
        }
        const user = yield user_model_1.default
            .findById((_d = res.locals.user) === null || _d === void 0 ? void 0 : _d._id)
            .select("+password");
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new errorHandler_1.default("you are not to able update password", 400));
        }
        const isPasswordMatch = yield user.comparePassword(oldPassword);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            return next(new errorHandler_1.default("Invalid old Password", 400));
        }
        user.password = newPassword;
        yield user.save();
        yield redis_1.redis.set((_e = res.locals.user) === null || _e === void 0 ? void 0 : _e._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`update password -- ${error.message}`, 400));
    }
}));
//update profile picture
exports.updateAvatar = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        const { avatar } = req.body;
        if (!avatar) {
            return next(new errorHandler_1.default("avatar is required", 400));
        }
        const userId = (_f = res.locals.user) === null || _f === void 0 ? void 0 : _f._id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return next(new errorHandler_1.default("User is not found", 404));
        }
        if (user.isSocialAuth) {
            return next(new errorHandler_1.default("You are not able to update profile picture", 400));
        }
        //frist delete ole one
        if ((_g = user === null || user === void 0 ? void 0 : user.avatar) === null || _g === void 0 ? void 0 : _g.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy((_h = user === null || user === void 0 ? void 0 : user.avatar) === null || _h === void 0 ? void 0 : _h.public_id);
        }
        const newProfile = yield cloudinary_1.default.v2.uploader.upload(avatar, {
            folder: "avatar",
            width: 150,
        });
        user.avatar = {
            public_id: newProfile.public_id,
            url: newProfile.url,
        };
        yield user.save();
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(`update profile -- ${error.message}`, 400));
    }
}));
//get all users -- admin
exports.getAllUsers = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//update user role -- admin
exports.updateUserRole = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, role } = req.body;
        const user = yield user_model_1.default.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
//delete user
exports.deleteUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        if (id === res.locals.user._id.toString()) {
            return next(new errorHandler_1.default("You are not able to delete your self", 400));
        }
        yield user.deleteOne({ id });
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
