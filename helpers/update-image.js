const fs = require("fs");

const User = require("../models/user");
const Store = require("../models/store");
const Employee = require("../models/employee");

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

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
