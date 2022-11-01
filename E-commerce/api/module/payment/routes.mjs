import { MakePayment, CancelPayment, Transaction, Track } from "./payment.mjs";

const authRoutesPayment = (router) => {
  router.post("/make-payment", (req, res) => MakePayment(req, res));
  router.post("/cancel-payment", (req, res) => CancelPayment(req, res));
  router.post("/list-payment", (req, res) => Transaction(req, res));
  router.post("/track-payment", (req, res) => Track(req, res));
};

export default authRoutesPayment;
