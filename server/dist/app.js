"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./src/config/db"));
const error_1 = require("./src/middlewares/error");
const SuccessRes_1 = __importDefault(require("./src/utils/SuccessRes"));
const analylics_route_1 = __importDefault(require("./src/routes/analylics.route"));
const category_route_1 = __importDefault(require("./src/routes/category.route"));
const course_route_1 = __importDefault(require("./src/routes/course.route"));
const faq_route_1 = __importDefault(require("./src/routes/faq.route"));
const layout_route_1 = __importDefault(require("./src/routes/layout.route"));
const notification_route_1 = __importDefault(require("./src/routes/notification.route"));
const order_route_1 = __importDefault(require("./src/routes/order.route"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
exports.app = (0, express_1.default)();
//database connections
(0, db_1.default)();
//set view engine to ejs
exports.app.set("view engine", "ejs");
//body parser
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
//cooki-parser
exports.app.use((0, cookie_parser_1.default)());
//cors
exports.app.use((0, cors_1.default)({ origin: ["http://localhost:3000"], credentials: true }));
//all routes
exports.app.use("/api", user_route_1.default);
exports.app.use("/api", course_route_1.default);
exports.app.use("/api", order_route_1.default);
exports.app.use("/api", notification_route_1.default);
exports.app.use("/api", analylics_route_1.default);
exports.app.use("/api", layout_route_1.default);
exports.app.use("/api", faq_route_1.default);
exports.app.use("/api", category_route_1.default);
//test route
exports.app.get("/", (req, res) => {
    try {
        (0, SuccessRes_1.default)(res, 200, {
            success: true,
            message: "Test successfully",
            data: "This is Data",
        });
    }
    catch (error) { }
});
//not found
exports.app.all("*", (req, res, next) => {
    res.status(404).sendFile(path_1.default.join(__dirname + "/views/error.html"));
});
//error handler
exports.app.use(error_1.ErrorMiddleware);
