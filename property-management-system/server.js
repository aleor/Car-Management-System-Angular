"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
let customers = JSON.parse(fs.readFileSync('data/properties.json', 'utf-8'));
let cars = JSON.parse(fs.readFileSync('data/cars.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.get('/api/cars', (req, res) => {
    res.json(cars);
});

app.get('/api/cars/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > cars.length) {
        top = skip + (cars.length - skip);
    }

    var pagedCars = cars.slice(skip, top);
    res.setHeader('X-InlineCount', cars.length);
    res.json(pagedCars);
});

app.get('/api/cars/:id', (req, res) => {
    let carId = +req.params.id;
    let selectedCar = {};
    for (let car of cars) {
        if (car.id === carId) {
            selectedCar = car;
            break;
        }
    }
    res.json(selectedCar);
});

app.post('/api/cars', (req, res) => {
    let postedCar = req.body;
    let currentMaxId = Math.max.apply(Math, cars.map((car) => car.id));
    postedCar.id = currentMaxId++;
    cars.push(postedCar);
    res.json(postedCar);
});

app.put('/api/carss/:id', (req, res) => {
    let putCar = req.body;
    let id = +req.params.id;
    let status = false;

    //Ensure state name is in sync with state abbreviation 
    // const filteredStates = states.filter((state) => state.abbreviation === putCustomer.state.abbreviation);
    // if (filteredStates && filteredStates.length) {
    //     putCustomer.state.name = filteredStates[0].name;
    //     console.log('Updated putCustomer state to ' + putCustomer.state.name);
    // }

    for (let i = 0, len = cars.length; i < len; i++) {
        if (cars[i].id === id) {
            cars[i] = putCar;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/cars/:id', function(req, res) {
    let carId = +req.params.id;
    for (let i = 0, len = cars.length; i < len; i++) {
        if (cars[i].id === carId) {
            cars.splice(i, 1);
            break;
        }
    }
    res.json({ status: true });
});

// app.get('/api/orders/:id', function(req, res) {
//     let carId = +req.params.id;
//     for (let cust of customers) {
//         if (cust.customerId === customerId) {
//             return res.json(cust);
//         }
//     }
//     res.json([]);
// });

app.get('/api/states', (req, res) => {
    res.json(states);
});

app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
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

opn('http://localhost:4200').then(() => {
    console.log('Browser started.');
});