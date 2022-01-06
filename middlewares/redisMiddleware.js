const client = require('../service/redis');

module.exports = async (req, res, next) => {
    let key = `${req.method}:${req.originalUrl}`;
    // console.log(key);

    let body = await client.get(key);
    console.log(body);

    if (body) {
        body = JSON.parse(body);
        return res.json(body);
    } else {
        res.jsonFunc = res.json;
        res.json = (body) => {
            client.set(key, JSON.stringify(body));
            res.jsonFunc(body);
        }
        next();
    }
}