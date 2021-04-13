const express = require("express");
const UserController = require("./controllers/UserController");
const AdminController = require("./controllers/AdminController");
const PatientController = require("./controllers/PatientController");
const DoctorController = require("./controllers/DoctorController");
const ReportController = require("./controllers/ReportController");
const QueryController = require("./controllers/QueryController");
const HistoricController = require("./controllers/HistoricController");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

/* Rotas de todos os usuarios */
routes.get("/users", UserController.index);
routes.get('/users/list/logins', UserController.listLogins);

/* Rotas de Admin */
routes.get("/admins", AdminController.index);
routes.post("/admins", AdminController.store);
/* Rotas de Pacientes */
routes.get("/patients/list", PatientController.index);
routes.post("/patients/create", PatientController.store);
routes.put("/patients/edit/:patient_id", PatientController.edit);
routes.delete("/patients/del/:patient_id", PatientController.delete);

routes.get("/patients/:patient_id", QueryController.queryReports);

/* Rotas de Médicos */
routes.get("/doctors/list", DoctorController.index);
routes.post("/doctors/create", DoctorController.store);
routes.put("/doctors/edit/:doctor_id", DoctorController.edit);
routes.delete("/doctors/del/:doctor_id", DoctorController.delete);

routes.get("/doctors/:doctor_id", QueryController.queryMyPatients);

/* Rota de testes  */
routes.get("/reports", ReportController.index);
routes.post("/reports/:doctor_id/:patient_id", ReportController.store);

/* Rota de testes do Historico */
routes.get("/historics", HistoricController.index);

module.exports = routes;
