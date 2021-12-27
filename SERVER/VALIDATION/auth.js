import joi from "joi";

export const ValidateSignUp = (userData) =>{
    const Schema = joi.object({
        fullname: joi.string().required().min(3),
        email: joi.string().required().email(),
        password: joi.string().required().min(4),
        address: joi.array().items(joi.object({detail: joi.string(), for: joi.string()})),
        phoneNumber: joi.number()
    });
return Schema.validateAsync(userData);
}

export const ValidateSignIn = (userData) =>{
    const Schema = joi.object({
       
        email: joi.string().required().email(),
        password: joi.string().required().min(4),
        
    });
return Schema.validateAsync(userData);
}