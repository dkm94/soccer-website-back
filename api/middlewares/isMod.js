const getError = require("../../utils");

module.exports = (req, res, next) => {
    if(!res.locals.isMod){
        res.status(401).send(getError("unauthorized"));
    } else {
        next();
    }
};