const express = require('express');
const axios = require('axios');

const app = express();

app.get("/", (req, res, next) => {
    res.json({
        message: "Hello World"
    })
})

app.get("/countries", (req, res, next) => {
    axios.get('https://countries.bloggernepal.com/countries/').then(response => {
        // console.log(response)
        res.json({
            ...response.data
        })
    })
})


app.listen(5000);
console.log("server started at :5000");