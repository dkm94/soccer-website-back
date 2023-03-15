const errorMessage = {
    "empty": { "error": "Please fill in all the fields." },
    "passwordRegex": { "error" : "The password must contain 1 uppercase letter, a number, a special caracter and should be 6 to 50 characters long." },
    "fail": { "error": "Request has failed." },
    "userNotFound": { 
        "auth": false,
        "error": "User not found, please check your email."},
    "password": {
        "auth": false,
        "error": "Wrong password, please check your credentials."},
    "unauthorized": { "error": "You don't have permission to execute this action." },
    "invalidUser": { "error": "Invalid user" },
    "token": { "error": "Invalid token."}
}

// const infoMessage = {
//     "authTrue": { "success": "You can now access your account."}
// }
// module.exports = function getInfo(type) {
//     console.log(infoMessage[type]);
//     return infoMessage[type]
// }
module.exports = function getError(type) {
    console.log(errorMessage[type]);
    return errorMessage[type]
}

