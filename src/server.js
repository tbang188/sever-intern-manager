import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors"; // su dung khi dung port 80

require("dotenv").config();

let app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // middleware fix CORS Error

    // Website you wish to allow to connect
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Dung cho localhost
    // res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.7:3000"); // Dung cho ip local
    res.setHeader(
        "Access-Control-Allow-Origin",
        // "http://quanlythuctap-cit.serveftp.com:80"
        // "http://www.quanlythuctap-cit.tk:80"
        "http://localhost:80"
    ); // Dung cho host

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({ origin: true })); // su dung khi dung port 80
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Nodejs server | PORT: " + port);
});
