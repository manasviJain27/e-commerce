import { Add, Update, Delete, List } from "./products.mjs";

const authRoutesProducts = (router) => {
  router.post("/add-product", (req, res) => Add(req, res));
  router.post("/update-product", (req, res) => Update(req, res));
  router.post("/delete-product", (req, res) => Delete(req, res));
  router.post("/list-product", (req, res) => List(req, res));
};
export default authRoutesProducts;
