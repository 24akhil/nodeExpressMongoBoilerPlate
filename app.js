const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./route');
const mongoose = require("mongoose");


//#region file upload section, use if required. Requests should have type of form-data to send files
app.use('/uploads', express.static('uploads'));//To show images from upload folder at GET request. 
//#endregion

//#region short middlewares section
app.use(bodyParser.urlencoded({ extended: false })); //request body parser but not request files
app.use(bodyParser.json()); //body parser
//#endregion

//#region connect to mongo db using mongoose ORM/driver.
mongoose.connection.on('connected', function () {
    console.log('DB Connected.')
});
mongoose.connection.on('connecting', function () {
    console.log('DB connecting.')
});
mongoose.connection.on('error', function () {
    console.log('DB error.')
});
mongoose.connection.on('disconnected', function () {
    console.log('DB disconnected.')
});
mongoose.connect(process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

        if (err)
            console.log('DB Connection Error: ', err);
    });
//#endregion


//#region CORS handling.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //'*'->https://www.example.com specific address.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") { //Allowing specific methods.
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//#endregion


//#region routes
app.use('/', routes);
//#endregion


//#region Error handling setup.
app.use((req, res, next) => {
    //Here those requests will be catched which matches none of the above listed routes.
    //such requests should be returned with 404 not found response.
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    //If any error occurs in the app then it can be catched here at last.
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
//#endregion error handling

module.exports = app;