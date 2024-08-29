const { response } = require("express");
const User = require("../models/user");
const Store = require("../models/store");
const Employee = require("../models/employee");
// const Product = require("../models/product");
// const Category = require("../models/category");

const getAll = async (req, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  //   const users = await User.find({ name: regex });
  //   const stores = await Store.find({ name: regex });
  //   //   const products = await Product.find({ name: regex });
  //   //   const categories = await Category.find({ name: regex });
  //   const employees = await Employee.find({ name: regex });

  const [users, stores, employees] = await Promise.all([
    User.find({ name: regex }),
    Store.find({ name: regex }),
    Employee.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
    stores,
    employees,
    // products,
    // categories,
  });
};

const getDocumentsCollection = async (req, res = response) => {
  const table = req.params.table;
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "users":
      data = await User.find({ name: regex });
      break;

    case "stores":
      data = await Store.find({ name: regex }).populate("user", "name img");
      break;

    case "employees":
      data = await Employee.find({ name: regex })
        .populate("user", "name img")
        .populate("store", "name img");
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "The table has to be users, stores or employees",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getTodo: getAll,
  getDocumentsCollection,
};
