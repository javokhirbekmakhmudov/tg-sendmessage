const express = require("express")
const app = express()

require("./start/routes")(app)
require("./start/run")(app)