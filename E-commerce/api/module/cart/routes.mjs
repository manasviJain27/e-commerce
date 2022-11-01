import {
  AddItem,
  UpdateCart,
  DeleteItem,
  DeleteAll,
  Checkout,
} from "./operationsCart.mjs";

const authRoutesCart = (router) => {
  router.post("/add-item", (req, res) => AddItem(req, res));
  router.post("/update-cart", (req, res) => UpdateCart(req, res));
  router.post("/delete-item", (req, res) => DeleteItem(req, res));
  router.post("/delete-all", (req, res) => DeleteAll(req, res));
  router.post("/checkout", (req, res) => Checkout(req, res));
};

export default authRoutesCart;
