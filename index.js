const express = require("express");
const cohortRoutes = require("./cohortsRouter/cohortsRouters");
const studentsRoutes = require("./studentsRouter/studentsRoutes");

const server = express();
server.use(express.json());

server.use("/api/cohorts", cohortRoutes);
server.use("/api/students", studentsRoutes);

const port = 3000;

server.listen(port, function() {
  console.log(`server running on port ${port}`);
});
