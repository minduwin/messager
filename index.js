const express = require('express');
const app = express();
const path = require('node:path');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Imported callback functions
const indexRouter = require('./routes/indexRouter')

// Setting middlewares
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(port, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Listening on PORT ${port}...`)
});