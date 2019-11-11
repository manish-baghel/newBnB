"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.express = express;
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app_1 = require("./app");
const environment = app_1.env.ENV;
const app = express();
exports.app = app;
app.use(compression());
app.use(cors());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//# sourceMappingURL=initServer.js.map