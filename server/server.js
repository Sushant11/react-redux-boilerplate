var express = require('express');
// Parse HTTP request cookies
var cookieParser = require('cookie-parser');
// HTTP request logger middleware
var logger = require('morgan');
// CORS providing a Connect/Express middleware that can be used to enable CORS with various options.
var cors = require('cors');

// omponents
var privateRoutes = require('./routes/index.privateRoute');

let app = express();
app.use(logger('dev'));
// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(cookieParser());

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

// Router
app.use('/auth', privateRoutes);

const port = 3001;

app.listen(port, () => `Server running on port ${port}`);