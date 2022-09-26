const validateUserData = (userData) => {

    const errors = [];
    const isEmpty = data => data === undefined || data === null || (isString(data) && data.trim() === "") || (typeof data === 'object' && Object.keys(data).length === 0);
    const isString = data => typeof data === "string";
    const isArray = data => Array.isArray(data);
    const isNumber = data => typeof data === 'number';

    const addError = (type, message)=>{
        errors.push({
            type: type,
            message: message
        });
    }
    if (isEmpty(userData)) {

        addError("userData", "userData cannot be empty");
    }

    // email checks
    if(isEmpty(userData.email)){

        addError("email", "email cannot be empty");
    }
    if (!isString(userData.email)) {
        addError("email", "email must be a string");
    }
    // first name checks
    if(isEmpty(userData.firstName)){
        addError("firstName", "firstName cannot be empty");
    }
    if (!isString(userData.firstName)) {
        addError("firstName", "firstname must be a string");
    }
    // last name checks
    if(isEmpty(userData.lastName)){
        addError("lastName", "last name cannot be empty");
    }
    if (!isString(userData.lastName)) {
        addError("lastName", "lastname must be a string");
    }
    // age checks
    if(isEmpty(userData.age)){
        addError("age", 'age must not be empty');
    }
    if(!isNumber(userData.age)){
        addError("age", "age must be a number");
    }
    // favorite food checks

    if (!isArray(userData.favoriteFoods)) {
        addError("favoriteFoods", "favorite foods must be an array");
    }
    if(userData.favoriteFoods.length > 0){
        userData.favoriteFoods.forEach(food => {
            if (!isString(food)) {
                addError("favoriteFoods", "favorite foods must be strings");
            }
        })
    }



    if(errors.length > 0){
        return {
            isValid: false,
            errors: errors
        }
    }
    return {
        isValid: true
    }

}

module.exports = validateUserData;