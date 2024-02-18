const express = require('express');
const path = require('path');
const fs = require('fs')

// const redis = require('redis');

// To run this server, run the command: npm run dev
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// app.use(express.static(path.join(__dirname, "client.js")));
app.use(express.static("public"));

// const redisClient = redis.createClient({
//     host: 'redis-18758.c1.us-west-2-2.ec2.cloud.redislabs.com',
//     port: 18758,
//     password: 'pAv8bIvSjnGSlPX8HOv2BIH5a4AHefXc',
// });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/base.html'))
})

app.get('/loginPage', function (req, res) {
    res.sendFile(path.join(__dirname, '/login.html'))
})

app.get('/registerPage', function (req, res) {
    res.sendFile(path.join(__dirname, '/register.html'))
})

app.get('/scheduler', function (req, res) {
    res.sendFile(path.join(__dirname, '/scheduler.html'))
})

app.post('/register', function (req, res) {
    // Set a key-value pair in Redis
    // redisClient.set('example_key', 'Hello from Redis!', (error, result) => {
    //     if (error) {
    //         console.error(error);
    //         return res.status(500).send('Error connecting to Redis');
    //     }

    //     // Retrieve the value from Redis
    //     redisClient.get('example_key', (err, value) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).send('Error retrieving data from Redis');
    //         }

    //         res.send(`Value from Redis: ${value}`);
    //     })
    // })
    console.log("Register ", req.body);
    fs.readFile(path.join(__dirname, "files", "customer.txt"), 'utf8',
        (err, data) => {
            let customer = {}
            if (err) {

            }
            else {
                customer = JSON.parse(data)
            }
            // console.log(data)

            customer[req.body["userName"]] = { "password": req.body["password"] }

            res.send({ response: "Registered successfully" })

            fs.writeFile(path.join(__dirname, "files", "customer.txt"),
                JSON.stringify(customer),
                (err) => {
                    if (err) throw err
                })
        })
})

app.post('/login', function (req, res) {
    fs.readFile(path.join(__dirname, "files", "customer.txt"), 'utf8',
        (err, data) => {
            let customer = {}
            if (err) {

            }
            else {
                customer = JSON.parse(data)
            }
            // console.log(data)

            let userName = req.body["userName"]
            if (userName in customer) {
                if (customer[userName]["password"] == req.body["password"]) {
                    res.send({ response: "Login successfully" })
                }
                else {
                    res.send({ response: "Login failed" })
                }
            }
            else {
                res.send({ response: "Login failed" })
            }
        })
})

app.listen(port, () => {
    console.log("listening on port: 3000")
})

{/* <script>
    $.ajax({
      url: '/register',
      type: 'post',
      dataType: 'json',
      data: { "userName": "jhondoe", "password": "1234" },
      success: function (data) {
        console.log(data)
      },
      error: function (jqXHR, textStatus, errorThrown) { }
    });

    $.ajax({
      url: '/login',
      type: 'post',
      dataType: 'json',
      data: { "userName": "jhondoe", "password": "1234" },
      success: function (data) {
        console.log(data)
      },
      error: function (jqXHR, textStatus, errorThrown) { }
    });
  </script> */}