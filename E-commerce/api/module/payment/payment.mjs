function MakePayment(req, res) {
  res.send("Payment succesfully made");
}

function CancelPayment(req, res) {
  res.send("Payment succesfully cancelled");
}

function Transaction(req, res) {
  res.send("Transaction");
}

function Track(req, res) {
  res.send("Payment tracking");
}

export { MakePayment, CancelPayment, Transaction, Track };
