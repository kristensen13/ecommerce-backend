const fs = require("fs");

const User = require("../models/user");
const Store = require("../models/store");
const Employee = require("../models/employee");
const Product = require("../models/product");
const Category = require("../models/category");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    // Delete the previous image
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, fileName) => {
  let oldPath = "";
  switch (type) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found");
        return false;
      }
      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;
      break;

    case "stores":
      const store = await Store.findById(id);
      if (!store) {
        console.log("Store not found");
        return false;
      }
      oldPath = `./uploads/stores/${store.img}`;
      deleteImage(oldPath);

      store.img = fileName;
      await store.save();
      return true;
      break;

    case "employees":
      const employee = await Employee.findById(id);
      if (!employee) {
        console.log("Employee not found");
        return false;
      }
      oldPath = `./uploads/employees/${employee.img}`;
      deleteImage(oldPath);

      employee.img = fileName;
      await employee.save();
      return true;
      break;

    case "products":
      const product = await Product.findById(id);
      if (!product) {
        console.log("Product not found");
        return false;
      }
      oldPath = `./uploads/products/${product.img}`;
      deleteImage(oldPath);

      product.img = fileName;
      await product.save();
      return true;
      break;

    case "categories":
      const category = await Category.findById(id);
      if (!category) {
        console.log("Category not found");
        return false;
      }
      oldPath = `./uploads/categories/${category.img}`;
      deleteImage(oldPath);

      category.img = fileName;
      await category.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
