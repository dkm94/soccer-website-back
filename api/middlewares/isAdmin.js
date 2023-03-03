const getError = require("../../utils");

module.exports = async (req, res, next) => {
    try {
        if(!res.locals.isAdmin){
            throw getError("unauthorized")
        }
        next();
    } catch {
        res.sendStatus(500);
    }
};