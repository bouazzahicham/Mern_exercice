export const config = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:7000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

//Port du listen
export const PORT = 7000


// URL MongoDB

export const URL_MONGODB = 'mongodb://admin:password@localhost:27017'

