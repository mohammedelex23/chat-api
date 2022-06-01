
const getUniqueErrorMessage = function (err) {
    let output;
    try {
        let fieldName = err.message.split("_1")[0];
        output = fieldName + " already exists";
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}

const getErrorMessage = function (err) {
    let message = "";
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.message || err.errors[errName].message)
                message = err.message || err.errors[errName].message;
        }
    }
    return message
}


module.exports = { getErrorMessage };