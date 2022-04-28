jwt_secret = process.env.JWT_SECRET_KEY;
import jwt from 'jsonwebtoken';

exports.validateToken = function(token) {
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err)
            return false;
        else
            return true;
    });
}

exports.getTokenData = function(token) {
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err)
            return false;
        else
            return decoded;
    });
}