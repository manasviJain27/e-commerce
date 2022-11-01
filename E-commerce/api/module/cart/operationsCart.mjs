import cart from "./cartSchema.mjs";
import products from "../products/productSchema.mjs";

/**
 * AddItem: This function adds a product to the user's cart
 * @param {*} req Takes in the objectId and quantity send by the user
 * @param {*} res Sends their updated cart back.
 */
async function AddItem(req, res) {
  //add product to cart
  const { body = {} } = req;
  const { productsList, cartId = "", userId } = body;
  let result, userCart, cartOfUser;

  //Finding if the user has a cart. It will return an empty array if the user doesn't have a cart and it will return the cart if the user has one.
  result = await cart.find({ userId: userId });

  //If the user doesn't have a cart the array is empty so we create a cart for the user otherwise retrieve cart.
  if (result.length === 0) {
    userCart = await cart.create({
      cart: [],
      userId: userId,
    });
  } else {
    userCart = result[0];
  }

  //Checking if the product exists and if it does add it to user's cart
  for (let i = 0; i < productsList.length; i++) {
    if (products.exists(productsList[i])) {
      // result = await FindProduct(products[i]);
      userCart.cart.push(productsList[i]);
      await userCart.save();
    }
  }

  res.send(userCart);
}

/**
 * UpdateCart: This function will add/delete the quantity of products that already exist in the user's cart.
 * @param {} req This will take in the information from the user (quantity and objectId)
 * @param {*} res This will send the updated cart back to the user.
 */
async function UpdateCart(req, res) {
  const { body } = req;
  const { userId, productsList } = body;

  let result = await cart.find({ userId: userId });
  const userCart = result[0].cart;

  if (result.length > 0) {
    for (let i = 0; i < productsList.length; i++) {
      const objectId = productsList[i].objectId;
      for (let j = 0; j < userCart.length; j++) {
        let indexObjectId = userCart[j].objectId;
        if (indexObjectId === objectId) {
          userCart[j].quantity = productsList[i].quantity;
          await userCart[j].save();
        }
      }
    }
    res.send(userCart);
  } else {
    res.send("User doesn't exist.");
  }
}

/**
 * DeleteItem: This will delete one or more items already existing the user's cart
 * @param {*} req This will take in the information from the user (userId and productId)
 * @param {*} res This will send the user's updated cart back to them.
 */
async function DeleteItem(req, res) {
  const { body = {} } = req;
  const { cartId, productId, userId } = body;
  let userCart = await cart.find({ userId: userId });

  if (userCart.length > 0) {
    userCart = userCart[0];
    for (let i = 0; i < productId.length; i++) {
      for (let j = 0; j < userCart.cart.length; j++) {
        if (userCart.cart[j].objectId === productId[i]) {
          delete userCart.cart[j];
          await userCart.save();
        }
      }
    }
    res.send(userCart);
  } else {
    res.send("Nothing to delete.");
  }
}

/**
 * DeleteAll: This will delete all of the products in the user's cart.
 * @param {*} req This will take in the user's id
 * @param {*} res This will send the user's updated cart.
 */
async function DeleteAll(req, res) {
  //Signing in and retrieving user id
  const { body = {} } = req;
  const { userId } = body;
  const userCart = await cart.find({ userId: userId }); //finding user's cart
  if (userCart.length > 0) {
    userCart[0].cart = [{}];
    await userCart[0].save();
  } else {
    res.send("Nothing to delete.");
  }
  //delete all products from cart
  res.send(userCart[0]);
}

/**
 * This will check the user out.
 * @param {*} req
 * @param {*} res
 */
async function Checkout(req, res) {
  //check out = move ahead on the payment
  const { body } = req;
  const { userId } = body;
  let result = await cart.find({ userId: userId });
  if (result.length > 0) {
    result = result[0].cart;
    res.send(result[0].cart);
  } else {
    res.send("Nothing to check out");
  }
}

export { AddItem, UpdateCart, DeleteItem, DeleteAll, Checkout };

//AddItem: DONE
//UpdateCart:
//DeleteItem: DONE (BUT PROBLEM)
//DeleteAll: DONE
//Checkout:
