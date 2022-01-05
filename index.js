const express = require('express');
const axios = require('axios');

const cacheMiddleware = require('./middlewares/cacheMiddleware');

const cache = require('./service/cache');

const app = express();

app.get("/", (req, res, next) => {
    res.json({
        message: "Hello World"
    })
})

app.get("/countries", cacheMiddleware, (req, res, next) => {
    axios.get('https://countries.bloggernepal.com/countries/').then(response => {
        // console.log(response)
        res.json({
            ...response.data
        })
    })
})

//some authenticated route
app.get("/myData", async (req, res, next) => {
    // in some case, we have to process data
    // where some are user specific while some are common for all users
    // let's cache the common data

    // for simplicity we will use the same data from the External API call
    let countries = cache.get('countries');
    if (!countries) {
        countries = await axios.get('https://countries.bloggernepal.com/countries/').then(response => {
            return response.data
        });

        cache.put('countries', countries, 1000 * 60);
        // if the data is not in the cache, get it and save it
        // we can set when wil the cached data to be expired
        // it can be choosen based on the data, 
        // if it changes frequently, lower the time value
        // if data dones not changes frequently, we can have some higher vale.
    }

    // get personalized data from database
    // process this data aginst the cached data
    // response

    res.json({
        message: "your data",
        data: countries // just
    })
})


app.listen(5000);
console.log("server started at :5000");