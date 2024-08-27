const { response } = require("express");
const Product = require("../models/product");

const getProducts = async (req, res = response) => {
  const products = await Product.find()
    .populate("user", "name img")
    .populate("category", "name");
  res.json({
    ok: true,
    products,
  });
};

const createProduct = async (req, res = response) => {
  const uid = req.uid;

  const product = new Product({
    user: uid,
    ...req.body,
  });

  //   console.log(product);

  try {
    const productDB = await product.save();
    res.json({
      ok: true,
      product: productDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error creating product",
    });
  }
};

const updateProduct = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Product not found",
      });
    }

    const changesProduct = {
      ...req.body,
      user: uid,
    };

    const productUpdated = await Product.findByIdAndUpdate(id, changesProduct, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "Update Product",
      product: productUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error updating product",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error deleting product",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
