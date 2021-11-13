// importing modules
const express = require("express");
const morgan = require("morgan");

// server create
app = express();

// different Routes
const users = express.Router();
const hooks = express.Router();
const auth = express.Router();
const sess = express.Router();

// Response default data
var data = {
  subOptions: {
    freeSecsAllowance: 0,
    secsAllowance: 0,
    secsUsed: 0,
  },
  freeUser: false,
  timeBased: false,
  endDate: 0,
  periodEndDate: 0,
  suspended: false,
  recording: false,
  autoSync: false,
  gbaEndDate: 0,
};

// middlewares and routers
app.use(morgan("dev"));
app.use(express.json());
app.use("/v1/users", users);
app.use("/v1/hooks", hooks);
app.use("/v1/auth/login", auth);
app.use("/v1/sessions", sess);

// sessions router
sess.get("/uploads/capabilities", (req, res) => {
  console.log(req.body);
  res.status(200).send();
});
sess.post("/import", (req, res) => {
  console.log(req.body);
  res.status(200).send();
});
sess.post("/sync", (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.status(200).end();
});

// users router
users.get("/me", (req, res) => {
  res.status(200).end();
});
users.post("/updateAutoSync", (req, res) => {
  data["autoSync"] = req.body["autosync"];
  console.log(data);
  res.status(200).end();
});

// hooks router
hooks.post("/on_record", (req, res) => {
  res.status(200).send(data);
});
hooks.post("/on_record_stop", (req, res) => {
  res.status(200).send(data);
});
hooks.post("/on_during_recording", (req, res) => {
  res.status(200).send(data);
});

// authorization router
auth.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send({ token: "sumitraj", abuser: false });
});

// usage response
app.get("/v1/usage/allowance/:id", (req, res) => {
  console.log(req.params.id);
  res.status(200).send(data);
});
app.post("/v1/connectedDevices", (req, res) => {
  console.log(req.body);
  res.status(200).send();
});

// Default port = 3000
app.listen((PORT = 3000), () => {
  console.log("server running on https://localhost:3000");
});
