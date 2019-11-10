import express from "express";
import compression from "compression";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import { env } from "./app";


const environment = env.ENV;
const app = express();

app.use(compression());
app.use(cors());

// view-engine
app.engine('html',ejs.renderFile);
app.set('view engine','html');

// for parsing req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export {app,express}
