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
exports.orderService = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const orderService = (course, user, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailData = {
            _id: course._id.toString().slice(1, 7),
            user: user.name,
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../views/order-confirmation.ejs"), mailData);
        if (user) {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Order confirmation from LMS",
                templete: "order-confirmation.ejs",
                data: mailData,
            });
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 500));
    }
});
exports.orderService = orderService;
