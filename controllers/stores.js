const { response } = require("express");
const Store = require("../models/store");

const getStores = async (req, res = response) => {
  const stores = await Store.find().populate("user", "name img");
  res.json({
    ok: true,
    stores,
  });
};

const createStore = async (req, res = response) => {
  const uid = req.uid;
  const store = new Store({
    user: uid,
    ...req.body,
  });

  try {
    const storeDB = await store.save();
    res.json({
      ok: true,
      store: storeDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error creating store",
    });
  }
};

const updateStore = async (req, res = response) => {
  res.json({ message: "Update Store" });
};

const deleteStore = async (req, res = response) => {
  res.json({ message: "Delete Store" });
};

module.exports = {
  getStores,
  createStore,
  updateStore,
  deleteStore,
};
