import {
  Checkout,
  ListOrder,
  OrderHistory,
  Reorder,
  OrderDetails,
} from "./orderOperations.mjs";

const authRoutesOrder = (router) => {
  router.post("/checkout", (req, res) => Checkout(req, res));
  router.post("/list-order", (req, res) => ListOrder(req, res));
  router.post("/order-history", (req, res) => OrderHistory(req, res));
  router.post("/order-details", (req, res) => OrderDetails(req, res));
  router.post("/reorder", (req, res) => Reorder(req, res));
};

export default authRoutesOrder;
