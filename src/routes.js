const express = require("express");
const UserController = require("./controllers/UserController");
const AdminController = require("./controllers/AdminController");
const PatientController = require("./controllers/PatientController");
const DoctorController = require("./controllers/DoctorController");
const ReportController = require("./controllers/ReportController");
const QueryController = require("./controllers/QueryController");
const HistoricController = require("./controllers/HistoricController");
const AuthController = require("./controllers/AuthController");
const Middlewares = require("./middlewares/Middlewares");
const { upload } = require("./config/multer");

const routes = express.Router();

/* Rotas de todos os usuarios */
routes.get("/users", UserController.index);
routes.get("/users/list/logins", UserController.listLogins);

routes.post("/login", AuthController.login);
routes.post("/logout", Middlewares.logout);

/* Rotas de Admin */
routes.get("/admins", AdminController.index);
routes.post("/admins", AdminController.store);

/* Rotas de Pacientes */
routes.get(
  "/patients/list",
  Middlewares.authRoleMixed("admin", "doctor"),
  PatientController.index
);
routes.post(
  "/patients/create",
  Middlewares.verifyJWT,
  Middlewares.authRole("admin"),
  PatientController.store
);
routes.put(
  "/patients/edit/:patient_id",
  Middlewares.verifyJWT,
  Middlewares.authRole("admin"),
  PatientController.edit
);
routes.delete(
  "/patients/del/:patient_id",
  Middlewares.verifyJWT,
  Middlewares.authRole("admin"),
  PatientController.delete
);

routes.get("/patients/:patient_id", QueryController.queryPatient);
routes.get("/patients/reports/:patient_id", QueryController.queryReports);

/* Rotas de Médicos */
routes.get("/doctors/list", Middlewares.verifyJWT, DoctorController.index);
routes.post("/doctors/create", Middlewares.verifyJWT, DoctorController.store);
routes.put(
  "/doctors/edit/:doctor_id",
  Middlewares.verifyJWT,
  DoctorController.edit
);
routes.delete(
  "/doctors/del/:doctor_id",
  Middlewares.verifyJWT,
  DoctorController.delete
);

routes.get("/doctors/mypat/:doctor_id", QueryController.queryMyPatients);

/* Rota de Upload e Reports*/

routes.post(
  "/upload/:doctor_id/:patient_id",
  upload.single("file"),
  ReportController.store
);

routes.delete("/reports/del/:report_id", ReportController.delete);

routes.get("/reports/historic/:report_id", QueryController.getHistorical);

routes.get("/download/:filename", ReportController.download);

/* Rotas de testes */
routes.get("/reports", ReportController.index);

routes.get("/historics", HistoricController.index);

module.exports = routes;
