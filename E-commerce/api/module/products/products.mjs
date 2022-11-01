import products from "./productSchema.mjs";

async function Add(req, res) {
  const { body = {} } = req;
  const {
    name = "",
    description = "",
    reviews = "",
    price = 0,
    details = "",
    images = [],
    ratings = [],
    tags = [],
  } = body;

  const product = await products.create({
    name: name,
    description: description,
    reviews: reviews,
    price: price,
    details: details,
    images: images,
    ratings: ratings,
    tags: tags,
  });

  res.send(product);
}

//updating fields in the product
async function Update(req, res) {
  const { body = {} } = req;
  if (body) {
    const { _id } = body;
    const result = await FindProduct(_id);
    const obj = result[0];

    Object.keys(body).forEach(function (key) {
      obj[key] = body[key];
    });

    await obj.save();
    res.send(obj);
  } else {
    res.send("Nothing to update.");
  }
}

async function Delete(req, res) {
  const { body = {} } = req;
  console.log(body);
  if (body) {
    const { _id } = body;
    const result = await products.remove({ _id });
    res.send(result);
  } else {
    res.send("Nothing to delete.");
  }

  // res.send("Product details");
}

//list all products
async function List(req, res) {
  const { body } = req;
  const result = await products.find(body);
  console.log(result);
  res.send(result);
}

async function FindProduct(_id) {
  if (!products.exists({ _id: _id })) {
    return "Product doesn't exist";
  }
  const result = await products.find({ _id: _id });
  return result;
}

export { Add, Update, Delete, List };

//Add product: seller: DONE
//list product: consumer
//delete product: seller
//update: seller: DONE
