const cache = require('../service/cache');

module.exports = (req, res, next) => {
    let key = `${req.method}:${req.originalUrl}`;
    // console.log(key);

    let body = cache.get(key);
    // console.log(body);

    if (body) {
        return res.json(body);
    } else {
        res.jsonFunc = res.json;
        res.json = (body) => {
            cache.put(key, body);
            res.jsonFunc(body);
        }
        next();
    }
}