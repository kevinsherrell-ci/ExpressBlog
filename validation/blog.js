const validateBlogData = (blogData) => {

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
    if (isEmpty(blogData)) {

        addError("blogData", "blogData cannot be empty");
    }

    // title checks
    if(isEmpty(blogData.title)){

        addError("title", "title cannot be empty");
    }
    if (!isString(blogData.title)) {
        addError("title", "title must be a string");
    }
    if(blogData.title.length > 40){
        addError("title", "title must be less than 40 characters (including spaces)");
    }
    // text checks
    if(isEmpty(blogData.text)){
        addError("text", "text cannot be empty");
    }
    if (!isString(blogData.text)) {
        addError("text", "text must be a string");
    }
    // author checks
    if(isEmpty(blogData.author)){
        addError("author", "author cannot be empty");
    }
    if (!isString(blogData.author)) {
        addError("author", "author must be a string");
    }
    if(blogData.author.length > 40){
        addError("author", "author must not be greater than 40 characters (including spaces");
    }

    // category food checks

    if (!isArray(blogData.category)) {
        addError("category", "category must be an array");
    }
    if(blogData.category.length > 0){
        blogData.category.forEach(category => {
            if (!isString(category)) {
                addError("category", "category must be strings");
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