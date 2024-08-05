const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getDataHome = require("../services/homeService");
const projectServices = require("../services/projectsServices");
const personnalServices = require("../services/personnelsServices");
const tasksServices = require("../services/tasksServices");
const jwtServices = require("../services/JWT");
const getHome = async (req, res) => {
  const data = await getDataHome();
  res.json(data);
};
const getProjects = async (req, res) => {
  let dataProjects = await projectServices.getDataProjects();
  res.json(dataProjects);
};
const getPersonnels = async (req, res) => {
  const id = req.params.id;
  let dataPersonnels;
  if (id !== undefined && id >= 1) {
    dataPersonnels = await personnalServices.getDataPersonnelById(id);
  } else {
    dataPersonnels = await personnalServices.getDataPersonnels();
  }
  res.status(200).json(dataPersonnels);
};
const getTasks = async (req, res) => {
  const id = req.params.id;
  let dataTasks;
  if (id !== undefined && id >= 1) {
    dataTasks = await tasksServices.getDataTaskById(id);
  } else {
    dataTasks = await tasksServices.getDataTasks();
  }
  res.status(200).json(dataTasks);
};
const getAccounts = async (req, res) => {
  res.json(await personnalServices.getDataPersonnels());
};

// post
// projects handlers
/** tasks */
const taskModels = require("../models/taskModels");
const modelsProjects = require("../models/projectModels");
const postProject = async (req, res) => {
  const data = ({
    nameProject,
    managerProject,
    descriptionProject,
    startDate,
    endDate,
  } = req.body);
  await modelsProjects.insertDataProject(data);
  res.status(201).json({ message: "Success" });
};
const updateProgressProject = async (req, res) => {
  const listData = [req.body];
  listData.map(async (data) => {
    modelsProjects.updateProgressProject(data);
  });
  res.json({ message: "Success" });
};
const deleteProject = async (req, res, next) => {
  const { id, taskOfProject } = req.body;
  await modelsProjects.deleteProject(id);
  res.json({ message: "Success" });
};

const postTask = async (req, res, next) => {
  const data = req.body;
  await taskModels.insertDataTask(data);
  res.json({ message: "Success" });
};
const updateTask = async (req, res, next) => {
  const data = req.body;
  await taskModels.updateTask(data);
  data.employee.forEach((idEmployee) => {
    taskModels.insertTable_TaskPrsonnel(data.id, idEmployee);
  });
  res.json({ message: "Success" });
};
const deleteTask = async (req, res, next) => {
  const { id } = req.body;
  await taskModels.deleteEmployeTask(id);
  await taskModels.deleteTask(id);
  res.json({ message: "Success" });
};

/** personnels */
const personnelModels = require("../models/personnelModels");
const postPersonnel = async (req, res, next) => {
  const data = req.body;
  await personnelModels.insertDataPersonnel(data);
  res.json({ message: "Success" });
};
const updatePersonnel = async (req, res, next) => {
  console.log(req.body);
  const data = req.body.data;
  const id = req.body.id;
  console.log(data, id);
  await personnelModels.updatePersonnel(data, id);
  res.json({ message: "Success" });
};
const deletePersonnel = async (req, res, next) => {
  const { id } = req.body;
  await personnelModels.deletePersonnel(id);
  res.json({ message: "Success" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const accounts = await personnalServices.getDataPersonnels();
  const account = accounts.personnel.find(
    (personnel) => personnel.email === email && personnel.password === password
  );
  dataJWT = {
    id: account.id,
    role: account.role,
    avatar: account.avatar,
    name: account.name,
  };
  const token = jwtServices.createJWT(dataJWT);
  res.json({ token, dataJWT });
};
const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  res.json(jwtServices.JWTverify(token, "872004").data);
};

module.exports = {
  getHome,
  getProjects,
  getPersonnels,
  getTasks,
  getAccounts,
  /** Post Project */
  postProject,
  updateProgressProject,
  deleteProject,
  /** Post Task */
  postTask,
  updateTask,
  deleteTask,
  /** Post Personnel */
  postPersonnel,
  updatePersonnel,
  deletePersonnel,
  login,
  verifyToken,
};
