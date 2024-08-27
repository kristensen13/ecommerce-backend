const { response } = require("express");
const Category = require("../models/category");

const getCategories = async (req, res = response) => {
  const categories = await Category.find().populate("user", "name img");
  res.json({
    ok: true,
    categories,
  });
};

const createCategory = async (req, res = response) => {
  const uid = req.uid;
  const category = new Category({
    user: uid,
    ...req.body,
  });

  try {
    const categoryDB = await category.save();
    res.json({
      ok: true,
      category: categoryDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error creating category",
    });
  }
};

const updateCategory = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    }

    const changesCategory = {
      ...req.body,
      user: uid,
    };

    const categoryUpdated = await Category.findByIdAndUpdate(
      id,
      changesCategory,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      msg: "Update Category",
      category: categoryUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error updating category",
    });
  }
};

const deleteCategory = async (req, res = response) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    }

    await Category.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error deleting category",
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
