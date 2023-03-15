const getError = require("../../utils");

module.exports = (req, res, next) => {
    if(!res.locals.isAdmin){
        res.status(401).send(getError("unauthorized"));
        return;
    } else {
        next(); 
    }     
};