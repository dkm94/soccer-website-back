const errorMessage = {
    "empty": { "error": "Please fill in all the fields." },
    "passwordRegex": { "error" : "The password must contain 1 uppercase letter, a number, a special caracter and should be 6 to 50 characters long." },
    "fail": { "error": "Request has failed." }
}

module.exports = function getError(type) {
    return errorMessage[type]
}