import Product from "../model/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as administrator to add products",
    });
    return;
  }

  const newProductData = req.body;

  const product = new Product(newProductData);

  product
    .save()
    .then(() => {
      res.json({
        message: "product created",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export function getProduct(req, res) {
  Product.find({}).then((product) => {
    res.json(product);
  });
}

export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator to delete products",
    });
    return;
  }

  const productId = req.params.productId;

  Product.deleteOne({ productId: productId })
    .then(() => {
      res.json({
        message: "product deleted",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator to update products",
    });
    return;
  }

  const productId = req.params.productId;
  const newProductData = req.body;

  Product.updateOne({ productId: productId }, newProductData)
    .then(() => {
      res.json({
        message: "product updated",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ productId: productId });
    res.json(product);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
}

export async function searchProduct(req, res) {
  const query = req.params.query;

  try {
    const products = await Product.find({
      $or:[
        {productName: { $regex: query, $options: "i" }},
        {altNames: {$elemMatch: {$regex: query, $options: "i"}}}
      ]
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
}
