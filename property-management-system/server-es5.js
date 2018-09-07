"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var customers = JSON.parse(fs.readFileSync('data/properties.json', 'utf-8'));
var states = JSON.parse(fs.readFileSync('data/states.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.get('/api/properties/page/:skip/:top', function(req, res) {
    var topVal = req.params.top,
        skipVal = req.params.skip,
        skip = isNaN(skipVal) ? 0 : +skipVal;
    var top = isNaN(topVal) ? 10 : skip + +topVal;

    if (top > customers.length) {
        top = skip + (customers.length - skip);
    }

    console.log('Skip: ' + skip + ' Top: ' + top);

    var pagedCustomers = customers.slice(skip, top);
    res.setHeader('X-InlineCount', customers.length);
    res.json(pagedCustomers);
});

app.get('/api/properties', function(req, res) {
    res.json(customers);
});

app.get('/api/customers/:id', function(req, res) {
    var customerId = +req.params.id;
    var selectedCustomer = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = customers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var customer = _step.value;

            if (customer.id === customerId) {
                selectedCustomer = customer;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    res.json(selectedCustomer);
});

app.post('/api/customers', function(req, res) {
    var postedCustomer = req.body;
    var maxId = Math.max.apply(Math, customers.map(function(cust) {
        return cust.id;
    }));
    postedCustomer.id = ++maxId;
    postedCustomer.gender = postedCustomer.id % 2 === 0 ? 'female' : 'male';
    customers.push(postedCustomer);
    res.json(postedCustomer);
});

app.put('/api/customers/:id', function(req, res) {
    var putCustomer = req.body;
    var id = +req.params.id;
    var status = false;

    //Ensure state name is in sync with state abbreviation 
    var filteredStates = states.filter(function(state) {
        return state.abbreviation === putCustomer.state.abbreviation;
    });
    if (filteredStates && filteredStates.length) {
        putCustomer.state.name = filteredStates[0].name;
        console.log('Updated putCustomer state to ' + putCustomer.state.name);
    }

    for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === id) {
            customers[i] = putCustomer;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/customers/:id', function(req, res) {
    var customerId = +req.params.id;
    for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === customerId) {
            customers.splice(i, 1);
            break;
        }
    }
    res.json({ status: true });
});

app.get('/api/orders/:id', function(req, res) {
    var customerId = +req.params.id;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = customers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var cust = _step2.value;

            if (cust.customerId === customerId) {
                return res.json(cust);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    res.json([]);
});

app.get('/api/states', function(req, res) {
    res.json(states);
});

app.post('/api/auth/login', function(req, res) {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', function(req, res) {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000);

console.log('Express listening on port 3000.');

// Open browser
var opn = require('opn');

opn('http://localhost:4200').then(function() {
    console.log('Browser started.');
});