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

const getEmployeeById = async (req, res = response) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id)
      .populate("user", "name img")
      .populate("store", "name img");
    res.json({
      ok: true,
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error getting employee",
    });
  }
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
  const id = req.params.id;
  const uid = req.uid;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: "Employee not found",
      });
    }

    const updateEmployee = {
      ...req.body,
      user: uid,
    };

    const employeeUpdated = await Employee.findByIdAndUpdate(
      id,
      updateEmployee,
      { new: true }
    );

    res.json({
      ok: true,
      employee: employeeUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error updating employee",
    });
  }
};

const deleteEmployee = async (req, res = response) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error deleting employee",
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
