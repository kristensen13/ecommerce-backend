const { response } = require("express");
const Employee = require("../models/employee");

const getEmployees = async (req, res = response) => {
  const employees = await Employee.find()
    .populate("user", "name img")
    .populate("store", "name img");
  res.json({
    ok: true,
    employees,
  });
};

const createEmployee = async (req, res = response) => {
  const uid = req.uid;
  const employee = new Employee({
    user: uid,
    ...req.body,
  });

  try {
    const employeeDB = await employee.save();
    res.json({
      ok: true,
      employee: employeeDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error creating employee",
    });
  }
};

const updateEmployee = async (req, res = response) => {
  res.json({ message: "Update employee" });
};

const deleteEmployee = async (req, res = response) => {
  res.json({ message: "Delete employee" });
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
