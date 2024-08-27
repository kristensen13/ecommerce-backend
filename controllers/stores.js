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
  const id = req.params.id;
  const uid = req.uid;

  try {
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({
        ok: false,
        msg: "Store not found",
      });
    }

    const changesStore = {
      ...req.body,
      user: uid,
    };

    const storeUpdated = await Store.findByIdAndUpdate(id, changesStore, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "Update Store",
      store: storeUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error updating store",
    });
  }
};

const deleteStore = async (req, res = response) => {
  const id = req.params.id;

  try {
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({
        ok: false,
        msg: "Store not found",
      });
    }

    await Store.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Deleted Store",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error deleting store",
    });
  }
};

module.exports = {
  getStores,
  createStore,
  updateStore,
  deleteStore,
};
