const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

const initWebRoute = (app) => {
  router.get("/", homeController.getHome);
  router.get("/projects", homeController.getProjects);
  router.get("/projects/:id", homeController.getProjects);
  router.get("/personnels", homeController.getPersonnels);
  router.get("/personnels/:id", homeController.getPersonnels);
  router.get("/tasks", homeController.getTasks);
  router.get("/tasks/:id", homeController.getTasks);
  router.get("/accounts", homeController.getAccounts);
  // post request
  router.post("/postProject", homeController.postProject);
  router.post("/updateProgressProject", homeController.updateProgressProject);
  router.post("/deleteProject", homeController.deleteProject);
  /* */
  router.post("/postTask", homeController.postTask);
  router.post("/updateTask", homeController.updateTask);
  router.post("/deleteTask", homeController.deleteTask);
  /* */
  router.post("/addEmployee", homeController.postPersonnel);
  router.post("/updatePersonnel", homeController.updatePersonnel);
  router.post("/deletePersonnel", homeController.deletePersonnel);
  /* */
  router.post("/login", homeController.login);
  router.post("/verify-token", homeController.verifyToken);
  return app.use("/", router);
};

module.exports = initWebRoute;
