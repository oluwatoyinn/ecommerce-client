import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email:Yup.string()
        .email("Invalid email address")
        .required("required"),
    password:Yup.string()
        .min(5, "Password too short")
        .required("required")
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterSchema = Yup.object().shape({
    name:Yup.string()
        .required("required").min(2).max(15),
    email:Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email address"),
    username:Yup.string()
        .required("required").min(2,"Must be less than at least two character").max(15),
    gender:Yup.string()
        .required("required"), 
    password:Yup.string()
        .min(5, "too short")
        .required("required"),
    contactInfos:Yup.array(Yup.object({
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required("Enter your contact number"),
        address:Yup.string()
            .required("required").min(1,"adress must be at least one"),
    })).min(1).max(10)
})


export const CategorySchema = Yup.object().shape({
    name:Yup.string()
        .required("required").min(2),
    description:Yup.string()
        .required("This is required").min(2)
})

export const ProductModalSchema = Yup.object().shape({
    productName:Yup.string()
        .required("required").min(2).max(15),
    productImageUrl:Yup.string()
        .required("required").min(5),
    productDescription:Yup.string()
        .required("required").min(2),
    // category:Yup.string()
    //     .required("required"),
    productPrice:Yup.number()
        .required("required"), 
    quantity:Yup.number()
        .required("required"),
    // tags:Yup.string()
    //     .required("required"),
    socialMedias:Yup.array(Yup.object({
        name:Yup.string()
            .required("required").min(2).max(15),
        URL:Yup.string()
            .required("required").min(2),
    })).min(1).max(10)  
})