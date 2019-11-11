'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sessionVariable_1 = require("./sessionVariable");
const environment = process.env.ENV;
console.log("environment", environment);
if (!environment) {
    console.error("please run application by providing environment");
    throw new Error("environment not found");
}
const env = sessionVariable_1.default(environment);
exports.env = env;
console.log(env);
const path = require("path");
const initServer_1 = require("./initServer");
const http = require("http");
const fse = require("fs-extra");
const publicPath = path.join(__dirname, "../public/uploads");
console.log("public path -->", publicPath);
const createdFse = fse.ensureDirSync(publicPath);
const { PORT } = env;
let environmentRunning;
let server;
switch (environment) {
    case 'dev':
        environmentRunning = "development";
        server = http.createServer(initServer_1.app);
    case 'default':
        environmentRunning = "development";
        server = http.createServer(initServer_1.app);
}
initServer_1.app.use("/public/uploads", initServer_1.express.static(publicPath));
initServer_1.app.use(function (err, req, res, next) {
    console.log("==> error  ", err);
    console.log("==> err.output.payload ", err.output.payload.message);
    const response = { status: false, msg: err.output.payload.message };
    res.status(err.output.statusCode).json(response);
    res.end();
});
server.listen(PORT, function (err) {
    if (err) {
        console.log("Fuck me");
        return;
    }
    console.log('Damn Son!!!');
    console.log(`Starting server on port ${PORT} for ${environmentRunning} environment`);
});
//# sourceMappingURL=app.js.map