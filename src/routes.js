const express = require("express");
const UserController = require("./controllers/UserController");
const AdminController = require("./controllers/AdminController");
const PatientController = require("./controllers/PatientController");
const DoctorController = require("./controllers/DoctorController");
const ReportController = require("./controllers/ReportController");
const QueryController = require("./controllers/QueryController");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

/* Rotas de todos os usuarios */
routes.get("/users", UserController.index);

/* Rotas de Admin */
routes.get("/admins", AdminController.index);
routes.post("/admins", AdminController.store);

/* Rotas de Pacientes */
routes.get("/patients", PatientController.index);
routes.post("/patients", PatientController.store);

routes.get("/patients/:patient_id", QueryController.queryReports);

/* Rotas de Médicos */
routes.get("/doctors", DoctorController.index);
routes.post("/doctors", DoctorController.store);

routes.get("/doctors/:doctor_id", QueryController.queryMyPatients);

/* Rota de testes  */
routes.get("/reports", ReportController.index);
routes.post("/reports/:doctor_id/:patient_id", ReportController.store);

module.exports = routes;
