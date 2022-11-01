import order from "./orderSchema.mjs";
import cart from "../cart/cartSchema.mjs";
import products from "../products/productSchema.mjs";

/**
 * Checkout: This function will check the user out and clear their current cart.
 * @param {*} req This function will take the userId and check them out
 * @param {*} res This function will send them a message stating that the checkout was succesful.
 */
async function Checkout(req, res) {
  const { body = {} } = req;
  const { userId } = body;
  let productsResult;
  let carts;
  let obj = {
    objectId: "",
    name: "",
    price: 0,
    quantity: 0,
    total: 0,
  };

  let result = await order.find({ userId: userId });
  const cartResult = await cart.find({ userId: userId });

  if (cartResult[0].cart.length > 0) {
    if (result.length == 0) {
      result = await order.create({
        userId: userId,
        oldCart: [],
        orderInformation: {
          shippingAddress: "",
          orderNumber: "",
        },
      });
      result = await order.find({ userId: userId });
    }

    for (let i = 0; i < cartResult[0].cart.length; i++) {
      productsResult = await products.find({
        _id: cartResult[0].cart[i].objectId,
      });

      if (productsResult.length > 0) {
        obj.objectId = productsResult[0]._id;
        obj.name = productsResult[0].name;
        obj.price = productsResult[0].price;
        obj.quantity = cartResult[0].cart[i].quantity;
        obj.total = productsResult[0].price * cartResult[0].cart[i].quantity;

        result[0].oldCart.push(obj);
        await result[0].save();
      }
    }
    await result[0].save();
    result = await order.find({ userId: userId });
    res.send(result[0].oldCart);
    carts = [];

    cartResult[0].cart = [];
    await cartResult[0].save();
  } else {
    console.log("Nothing to show.");
    res.send(result[0].cart);
  }
}

/**
 * ListOrder: This will list all of the products in their most recent order.
 * @param {*} req This will take in the user's information
 * @param {*} res This will send back a list of all of the products in their current cart.
 * @returns
 */
async function ListOrder(req, res) {
  const { body } = req;
  const { userId } = body;
  let result = await order.find({ userId: userId });
  let returnInfo;
}

async function OrderHistory(req, res) {
  const { body } = req;
  const { userId } = body;
  const orderHistory = await order.find({ userId: userId });
  if (orderHistory.length > 0) {
    res.send(orderHistory[0].oldCart);
  } else {
    res.send("No previous orders were found.");
  }
}

async function Reorder(req, res) {
  const { body } = req;
  const { userId, productsList } = body;

  let result = await order.find({ userId: userId });
  let userCart = await cart.find({ userId: userId });

  if (result.length == 0 || userCart.length == 0) {
    res.send("No previous orders.");
  } else {
    result = result[0];
    for (let i = 0; i < productsList.length; i++) {
      let found = result.oldCart.find(
        ({ objectId }) => objectId == productsList[i].objectId
      );

      if (found) {
        userCart[0].cart.push(productsList[i]);
        await userCart[0].save();
      }
    }
    userCart = await cart.find({ userId: userId });
    res.send(userCart[0]);
  }
}

async function OrderDetails(req, res) {
  const { body = {} } = req;
  const { userId, shippingAddress = "" } = body;
  let result = await order.find({ userId: userId });

  if (result.length > 0) {
    result = result[0];
    result.orderInformation.shippingAddress = shippingAddress;
    result.orderInformation.orderNumber = result._id;
    result.orderInformation.productInformation = result.cart;
    await result.save();
    res.send(result.orderInformation);
  } else {
    res.send("Nothing to show.");
  }
}

export { Checkout, ListOrder, OrderHistory, Reorder, OrderDetails };

//Checkout: DONE
//ListOrder:
//OrderHistory: DONE
//Reorder: DONE
//OrderDetails: DONE
