const errorMessage = {
    "empty": { "message": "Please fill in all the fields" },
    "passwordRegex": { "message" : "The password must contain 1 uppercase letter, a number, a special caracter and should be 6 to 50 characters long" },
    "fail": { "message": "Request has failed" },
    "userNotFound": { 
        "auth": false,
        "message": "User not found, please check your email"},
    "password": {
        "auth": false,
        "message": "Wrong password, please check your credentials"},
    "unauthorized": { "message": "You don't have permission to execute this action" },
    "invalidUser": { "message": "Invalid user" },
    "token": { "message": "Error token"},
    "internalErrorServer": {
        "message": "Something went wrong !"
    },
    "invalidValue": {
        "message": "Data not found",
        "description": "ID not valid"
    },
    "notFound": {
        "message": "Data not found"
    }
}

module.exports = function getError(type) {
    console.log(errorMessage[type]);
    return errorMessage[type]
}

