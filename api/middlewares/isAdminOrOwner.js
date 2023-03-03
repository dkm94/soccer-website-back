const getError = require("../../utils");

module.exports = async (req, res, next) => {
    try {
        if(!res.locals.isAdmin || res.locals.userId != req.params.id){
            throw getError("unauthorized")
        }
        next();
    } catch {
        res.sendStatus(500);
    }
};