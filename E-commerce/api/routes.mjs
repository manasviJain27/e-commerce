import { Router } from "express";
import authRoutes from "./module/auth/routes.mjs";
import authRoutesOrder from "./module/order/routes.mjs";
import authRoutesPayment from "./module/payment/routes.mjs";
import authRoutesProducts from "./module/products/routes.mjs";
import authRoutesCart from "./module/cart/routes.mjs";
const router = new Router();

authRoutes(router);
authRoutesOrder(router);
authRoutesPayment(router);
authRoutesProducts(router);
authRoutesCart(router);

export default router;
